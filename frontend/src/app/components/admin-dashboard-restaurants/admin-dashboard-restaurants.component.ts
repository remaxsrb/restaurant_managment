import { Component, OnInit } from '@angular/core';
import { NewRestaurant } from 'src/app/models/interfaces/new_restaurant';
import { Table } from 'src/app/models/interfaces/table';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantType } from 'src/app/models/restaurant_type';
import { AdminService } from 'src/app/services/model_services/admin.service';
import { RestaurantTypeService } from 'src/app/services/model_services/restaurant-type.service';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RestaurantPlanService } from 'src/app/services/utility_services/restaurant-plan.service';
import { TimeService } from 'src/app/services/utility_services/time.service';

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
    private restaurant_type_service: RestaurantTypeService,
    private time_service: TimeService
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

  newRestaurant: NewRestaurant = {
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
    rating: 0,
    tables: [],
    menu: [],
  };

  restaurant_form_flags = {
    invalid_email: false,
  };

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  onSubmitRestaurant(restaurant_form: any) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const isValidEmail = emailRegex.test(this.newRestaurant.email);

    if (!isValidEmail) {
      this.restaurant_form_flags.invalid_email = true;
      return; //not valid email abort submission
    }

    this.newRestaurant.open = this.time_service.formatTimeTo24HourString(
      this.newRestaurant.open
    );
    this.newRestaurant.close = this.time_service.formatTimeTo24HourString(
      this.newRestaurant.close
    );

    if (this.selectedFile) {
      this.newRestaurant.floor_plan = this.selectedFile.name;

      this.json_service.get_flor_plan(this.newRestaurant.floor_plan).subscribe({
        next: (data) => {
          data.circles.forEach((circle: any) => {
            const capacity: Number = Number(circle.label);
            const id: String = circle.id;
            const status: String = 'available';

            const table: Table = {
              id: id,
              capacity: capacity,
              status: status,
            };
            this.newRestaurant.tables.push(table);
          });

          this.admin_service
            .add_restaurant(JSON.stringify(this.newRestaurant))
            .subscribe((data) => {
              this.restaurants = [];

              this.restaurant_service.all().subscribe((data) => {
                this.restaurants = data;
                restaurant_form.reset();
              });
            });
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
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

    this.json_service
      .get_flor_plan(this.selected_restaurant_floor_plan)
      .subscribe({
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
