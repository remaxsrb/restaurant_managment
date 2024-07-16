import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RestaurantPlanService } from 'src/app/services/utility_services/restaurant-plan.service';


@Component({
  selector: 'app-admin-dashboard-restaurants',
  templateUrl: './admin-dashboard-restaurants.component.html',
  styleUrls: ['./admin-dashboard-restaurants.component.css'],
})
export class AdminDashboardRestaurantsComponent {
  restaurants: Restaurant[] = [];
  
  selected_restaurant_floor_plan: string = '';
  selected_restaurant: string = '';




  constructor(
    private restaurant_service: RestaurantService,
    private restaurant_plan_service: RestaurantPlanService,
    private json_service: JsonService,


  ) {}

  ngOnInit(): void {
  

    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });

    

  }
  

  isRestaurantChecked(restaurant_name: string): boolean {
    return this.selected_restaurant === restaurant_name;
  }

  onRestaurantRadioChange(restaurant_name: string) {
    this.selected_restaurant = restaurant_name;
    this.selected_restaurant_floor_plan =
      this.restaurants.find((item) => item.name === restaurant_name)
        ?.floor_plan || '';

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
    const canvas = document.getElementById(
      'restaurantPlanCanvas'
    ) as HTMLCanvasElement;
    this.restaurant_plan_service.renderRestaurantPlan(restaurant_plan, canvas);
  }
}
