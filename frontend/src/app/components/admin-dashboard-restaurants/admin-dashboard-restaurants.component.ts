import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RestaurantPlanService } from 'src/app/services/utility_services/restaurant-plan.service';
import { TimeService } from 'src/app/services/utility_services/time.service';

@Component({
  selector: 'app-admin-dashboard-restaurants',
  templateUrl: './admin-dashboard-restaurants.component.html',
  styleUrls: ['./admin-dashboard-restaurants.component.css'],
})
export class AdminDashboardRestaurantsComponent {
  @ViewChild('restaurantPlanCanvas') canvasRef!: ElementRef;

  restaurants: Restaurant[] = [];

  selected_restaurant_floor_plan: string = '';
  selected_restaurant: Restaurant = new Restaurant();

  constructor(
    private restaurant_service: RestaurantService,
    private restaurant_plan_service: RestaurantPlanService,
    private json_service: JsonService,
    private timeService: TimeService,
  ) {}

  ngOnInit(): void {
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
      
      for (let  restaurant of this.restaurants) {
        restaurant.open = this.timeService.formatTimeTo24HourString(new Date(restaurant.open));
        restaurant.close = this.timeService.formatTimeTo24HourString(new Date(restaurant.close));

      }
      
    });
  }

  isRestaurantChecked(restaurant: Restaurant): boolean {
    return this.selected_restaurant === restaurant;
  }

  onRestaurantRadioChange(restaurant: Restaurant) {
    this.selected_restaurant = restaurant;
    this.selected_restaurant_floor_plan =
      this.restaurants.find((item) => item.name === restaurant.name)?.plan ||
      '';

    this.json_service
      .get_restaurant_plan(this.selected_restaurant_floor_plan)
      .subscribe({
        next: (data) => {
          this.renderRestaurantPlan(data);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
  }

  renderRestaurantPlan(restaurant_plan: any): void {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    this.restaurant_plan_service.renderRestaurantPlan(
      restaurant_plan,
      this.selected_restaurant,
      canvas, null, null    );
  }
}
