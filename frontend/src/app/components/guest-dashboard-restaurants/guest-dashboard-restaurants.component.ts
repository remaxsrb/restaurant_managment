import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { Waiter } from 'src/app/models/waiter';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import { UserService } from 'src/app/services/model_services/user.service';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RestaurantPlanService } from 'src/app/services/utility_services/restaurant-plan.service';
import { TimeService } from 'src/app/services/utility_services/time.service';

@Component({
  selector: 'app-guest-dashboard-restaurants',
  templateUrl: './guest-dashboard-restaurants.component.html',
  styleUrls: ['./guest-dashboard-restaurants.component.css']
})
export class GuestDashboardRestaurantsComponent implements OnInit {
  constructor(
    private restaurant_service: RestaurantService,
    private user_service: UserService,

    private json_service: JsonService,
    private restaurant_plan_service: RestaurantPlanService,
    private time_service: TimeService
  ) {}

  ngOnInit(): void {
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });

    this.user_service.find_by_role("waiter").subscribe((data) => {
      this.waiters = data;
    });
  }
  restaurants: Restaurant[] = [];
  waiters: Waiter[] = [];

  selected_restaurant: string | null = null;


  isRestaurantChecked(restourant_name: string): boolean {
    return this.selected_restaurant === restourant_name;
  }
  onRestaurantRadioChange(restourant_name: string) {
    this.selected_restaurant = restourant_name;
  }



}
