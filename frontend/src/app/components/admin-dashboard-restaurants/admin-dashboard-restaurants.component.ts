import { withInterceptorsFromDi } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantType } from 'src/app/models/restaurant_type';
import { AdminService } from 'src/app/services/model_services/admin.service';
import { RestaurantTypeService } from 'src/app/services/model_services/restaurant-type.service';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RestaurantPlanService } from 'src/app/services/utility_services/restaurant-plan.service';

@Component({
  selector: 'app-admin-dashboard-restaurants',
  templateUrl: './admin-dashboard-restaurants.component.html',
  styleUrls: ['./admin-dashboard-restaurants.component.css'],
})
export class AdminDashboardRestaurantsComponent implements OnInit {
  constructor(
    private restaurant_service: RestaurantService,
    private json_service: JsonService,
    private restaurant_plan_service: RestaurantPlanService,
    private admin_service: AdminService,
    private restaurant_type_service: RestaurantTypeService
  ) {}

  ngOnInit(): void {
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });

    this.restaurant_type_service.all().subscribe((data) => {
      this.restaurant_types = data;
    });
  }

  restaurants: Restaurant[] = [];
  restaurant_types: RestaurantType[] = [];

  selected_restaurant: string | null = null;
  selected_restaurant_floor_plan: string = '';

  newRestaurant = {
    name: '',
    address: '',
    phone_number: '',
    email: '',
    type: '',
    location: '',
    open: { hour: 0, minute: 0 },
    close: { hour: 0, minute: 0 },
    description: '',
    floor_plan: '',
  };

  restaurant_form_flags = {
    invalid_email: false,
  };

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  onSubmitRestaurant() {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const isValidEmail = emailRegex.test(this.newRestaurant.email);

    if (!isValidEmail) {
      this.restaurant_form_flags.invalid_email = true;
      return; //not valid email abort submission
    }

    if (this.selectedFile)
      this.newRestaurant.floor_plan = this.selectedFile.name;

    this.admin_service
      .add_restaurant(JSON.stringify(this.newRestaurant))
      .subscribe((data) => {
        this.restaurants = [];

        this.restaurant_service.all().subscribe((data) => {
          this.restaurants = data;
        });
      });
  }

  //Restaurant radios

  isRestaurantChecked(restourant_name: string): boolean {
    return this.selected_restaurant === restourant_name;
  }

  onRestaurantRadioChange(restourant_name: string) {
    this.selected_restaurant = restourant_name;
    this.selected_restaurant_floor_plan = this.restaurants.filter(
      (item) => item.name === restourant_name
    )[0].floor_plan;

    this.json_service.getData(this.selected_restaurant_floor_plan).subscribe({
      next: (data) => {
        this.renderRestaurantPlan(data);
      },
      error: (err) => {
        alert(err.message);
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
