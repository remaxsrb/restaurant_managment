import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-providers';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
import { Circle } from 'src/app/models/interfaces/circle';
import { FloorPlan } from 'src/app/models/interfaces/FloorPlan';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/models/user';
import {
  OSMSrbija,
  tileLayerOSMSrbija,
} from 'src/app/OSMSerbia/leaflet_OSMSerbia_layer';
import { ReservationService } from 'src/app/services/model_services/reservation.service';
import { GeocodingService } from 'src/app/services/utility_services/geocoding.service';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RestaurantPlanService } from 'src/app/services/utility_services/restaurant-plan.service';
import { TimeService } from 'src/app/services/utility_services/time.service';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  @ViewChild('restaurantPlanCanvas') canvasRef!: ElementRef;
  private hoveredCircleIndex: number | null = null;
  private clickedCircleIndex: number | null = null;

  private floorPlan: FloorPlan = { circles: [], rechtangles: [] };
  private map!: L.Map;
  
  reservationForm!: FormGroup;

  restaurant: Restaurant = new Restaurant();
  guest: User = new User();

  constructor(
    private geocodingService: GeocodingService,
    private restaurantPlanService: RestaurantPlanService,
    private json_service: JsonService,
    private fb: FormBuilder,
    private timeService: TimeService,
    private reservationService: ReservationService

  ) {}

  ngOnInit(): void {
    const restaurant_data = localStorage.getItem('restaurant');
    if (restaurant_data) {
      this.restaurant = JSON.parse(restaurant_data);
      this.restaurant.open = this.timeService.formatTimeTo24HourString(new Date(this.restaurant.open))
      this.restaurant.close = this.timeService.formatTimeTo24HourString(new Date(this.restaurant.close))

    }
    
    const guest_data = localStorage.getItem('user');
    if (guest_data)
      this.guest = JSON.parse(guest_data);
    
    this.initReservationForm();
  }
  
  initReservationForm() {
    this.reservationForm = this.fb.group({
      restaurant: [this.restaurant._id], //restaurant object id from localstorage
      guest: [this.guest._id], //guest object id from localstorage
      table: [-1],
      status: ['pending'], //default pending
      datetime: [void 0, Validators.required], //date picker
      // time: [void 0, Validators.required], //time picker
      showed_up: [false], //default false until shows up
      
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    if (this.restaurant.address) {
      const fullAddress = `${this.restaurant.address.street} ${this.restaurant.address.number}, ${this.restaurant.address.city}`;
      this.geocodeRestaurantAddress(fullAddress);
    }

    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      this.json_service.get_restaurant_plan(this.restaurant.plan).subscribe({
        next: (data) => {
          this.floorPlan.circles = data.circles;
          this.floorPlan.rechtangles = data.rechtangles; // Corrected property name
          this.renderRestaurantPlan(canvas); // Pass canvas here
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });

      canvas.addEventListener('mousemove', this.onCanvasMouseMove.bind(this));
      canvas.addEventListener('mouseleave', this.onCanvasMouseLeave.bind(this));
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([44.788744, 20.459097], 75); // Example coordinates (Humska 1)
    tileLayerOSMSrbija().addTo(this.map);
  }

  private geocodeRestaurantAddress(address: string): void {
    this.geocodingService.geocode(address).subscribe(
      (data) => {
        if (data && data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lon = parseFloat(result.lon);
          this.map.setView([lat, lon], 75);
          L.marker([lat, lon]).addTo(this.map);
        } else {
          console.error('No geocoding results found for address:', address);
        }
      },
      (error) => {
        console.error('Error geocoding address:', error);
      }
    );
  }

  private renderRestaurantPlan(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d');

    if (context) {
      this.restaurantPlanService.renderRestaurantPlan(
        this.floorPlan,
        this.restaurant,
        canvas,
        this.hoveredCircleIndex,
        this.clickedCircleIndex
      );
    } else {
      console.error('Failed to get 2D context from canvas element.');
    }
  }

  onCanvasMouseMove(event: MouseEvent): void {
    console.log('Mouse move event detected');

    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext('2d')!;
    const { offsetX: mouseX, offsetY: mouseY } = event;
    const newHoveredCircleIndex =
      this.restaurantPlanService.getHoveredCircleIndex(
        this.floorPlan.circles,
        mouseX,
        mouseY
      );

    // Ignore hover if a hovered circle is already clicked
    if (this.clickedCircleIndex === newHoveredCircleIndex)
      return;

    if (newHoveredCircleIndex !== this.hoveredCircleIndex) {
      if (this.hoveredCircleIndex !== null && this.hoveredCircleIndex !== -1)
        this.handleMouseLeaveCircle(canvas, this.hoveredCircleIndex);

      this.hoveredCircleIndex = newHoveredCircleIndex;

      if (this.hoveredCircleIndex !== null && this.hoveredCircleIndex !== -1)
        this.handleMouseEnterCircle(canvas, this.hoveredCircleIndex);
    }
  }

  private handleMouseLeaveCircle(
    canvas: HTMLCanvasElement,
    circleIndex: number
  ): void {
    console.log('Mouse left circle index: ' + circleIndex);

    const context = canvas.getContext('2d')!;
    const circle = this.floorPlan.circles[circleIndex];

    // Clear the hover effect of the left circle
    context.clearRect(
      circle.x - circle.radius,
      circle.y - circle.radius,
      circle.radius * 2,
      circle.radius * 2
    );

    // Redraw the clicked circle if it was previously hovered
    if (this.clickedCircleIndex === circleIndex) {
      this.restaurantPlanService.renderCircle(context, circle, false, true); // Keep clicked circle green
    } else {
      this.restaurantPlanService.renderCircle(context, circle); // Redraw in default state
    }
  }

  private handleMouseEnterCircle(
    canvas: HTMLCanvasElement,
    circleIndex: number
  ): void {
    console.log('Mouse entered circle index: ' + circleIndex);

    const context = canvas.getContext('2d')!;
    const circle = this.floorPlan.circles[circleIndex];

    // Draw the hover effect on the new circle
    this.restaurantPlanService.renderCircle(context, circle, true);
  }
  onCanvasMouseLeave(): void {
    console.log('Mouse left the canvas ');
  }

  onMouseClick(event: MouseEvent): void {
    console.log('Mouse click detected');

    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;
  
    const oldClickedIndex = this.clickedCircleIndex;
    this.clickedCircleIndex = this.hoveredCircleIndex;
  
    if (oldClickedIndex === this.clickedCircleIndex) {
      this.clickedCircleIndex = null;
    }
  
    this.renderRestaurantPlan(canvas); // Clear and redraw the canvas
  
    if (this.clickedCircleIndex !== null && this.clickedCircleIndex !== -1) {
      const circle = this.floorPlan.circles[this.clickedCircleIndex];
      console.log('Clicked circle: ' + this.clickedCircleIndex);
      this.restaurantPlanService.renderCircle(context, circle, false, true); // Draw the clicked circle in green
    }
  }
  
  onSubmit() {
    if (this.clickedCircleIndex === null || this.clickedCircleIndex===-1)
      return;
    console.log("Table ID: " + this.clickedCircleIndex)
    this.reservationForm.patchValue({
      table: this.clickedCircleIndex,
    });
    
    this.reservationService.makeReservation(this.reservationForm.value)
    
  }
  
}
