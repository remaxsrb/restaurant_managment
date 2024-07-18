import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { GeocodingService } from 'src/app/services/utility_services/geocoding.service';
import * as L from 'leaflet';
import 'leaflet-providers';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import {
  OSMSrbija,
  tileLayerOSMSrbija,
} from 'src/app/OSMSerbia/leaflet_OSMSerbia_layer';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RestaurantPlanService } from 'src/app/services/utility_services/restaurant-plan.service';
import { Circle } from 'src/app/models/interfaces/circle';
import { FloorPlan } from 'src/app/models/interfaces/FloorPlan';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  @ViewChild('restaurantPlanCanvas') canvasRef!: ElementRef;
  private hoveredCircleIndex: number | null = null;
  private floorPlan: FloorPlan = { circles: [], rechtangles: [] };
  private map!: L.Map;

  restaurant: Restaurant = new Restaurant();

  constructor(
    private geocodingService: GeocodingService,
    private restaurantPlanService: RestaurantPlanService,
    private json_service: JsonService
  ) {}

  ngOnInit(): void {
    const restaurant_data = localStorage.getItem('restaurant');
    if (restaurant_data) {
      this.restaurant = JSON.parse(restaurant_data);
    }
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
        canvas
      );
    } else {
      console.error('Failed to get 2D context from canvas element.');
    }
  }

  onCanvasMouseMove(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;

    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    const newHoveredCircleIndex =
      this.restaurantPlanService.getHoveredCircleIndex(
        this.floorPlan.circles,
        mouseX,
        mouseY
      );

    if (newHoveredCircleIndex !== this.hoveredCircleIndex) {
      if (this.hoveredCircleIndex !== -1 && this.hoveredCircleIndex !== null) {
        // Clear the previous hovered circle
        const circle = this.floorPlan.circles[this.hoveredCircleIndex];
        context.clearRect(
          circle.x - circle.radius,
          circle.y - circle.radius,
          circle.radius * 2,
          circle.radius * 2
        );
        this.restaurantPlanService.renderCircle(context, circle);
      }

      this.hoveredCircleIndex = newHoveredCircleIndex;

      if (this.hoveredCircleIndex !== -1) {
        // Draw the new hovered circle
        const circle = this.floorPlan.circles[this.hoveredCircleIndex];
        this.restaurantPlanService.renderCircle(context, circle, true);
      }
    }
  }

  onCanvasMouseLeave(): void {
    this.hoveredCircleIndex = null;
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d')!;
    this.renderRestaurantPlan(context);
  }
}
