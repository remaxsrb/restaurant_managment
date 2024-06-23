import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Guest } from 'src/app/models/guest';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantType } from 'src/app/models/restaurant_type';
import { Waiter } from 'src/app/models/waiter';
import { AdminService } from 'src/app/services/model_services/admin.service';
import { RestaurantTypeService } from 'src/app/services/model_services/restaurant-type.service';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import { AuthService } from 'src/app/services/utility_services/auth.service';
import * as CryptoJS from 'crypto-js';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { UserService } from 'src/app/services/model_services/user.service';
import { RestaurantPlanService } from 'src/app/services/utility_services/restaurant-plan.service';
import { ImageDimensionValidationService } from 'src/app/services/utility_services/image-dimension-validation.service';
import { FormValidationService } from 'src/app/services/utility_services/form-validation.service';
import { RegexPatterns } from '../regex_patterns';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private restaurant_service: RestaurantService,
    private user_service: UserService,
    private admin_service: AdminService,
    private restaurant_type_service: RestaurantTypeService,
    private json_service: JsonService,
    private auth_service: AuthService,
    private restaurant_plan_service: RestaurantPlanService,
    private image_dim: ImageDimensionValidationService,
    private form_validation_service: FormValidationService,

    private router: Router
  ) {}

  selectedOption: String = 'restaurants';
  updated_guest_statuses: string[] = [];

  restaurants: Restaurant[] = [];
  restaurant_types: RestaurantType[] = [];

  selected_restaurant: string | null = null;
  selected_restaurant_floor_plan: string = '';

  waiters: Waiter[] = [];
  guests: Guest[] = [];

  waiter_form_flags = {
    invalid_password: false,
    invalid_email: false,
    invalid_phone_number: false,
    invalid_picture_format: false,
    username_taken: false,
    email_taken: false,
    invalid_picture_dimensions: false,
    general_errors: false,
  };

  restaurant_form_flags = {
    invalid_email: false,
  };

  newRestaurant = {
    name: '',
    address: '',
    phone_number: '',
    email: '',
    type: '',
    location: '',
    description: '',
    floor_plan: '',
  };

  new_waiter = {
    username: '',
    password: '',
    security_question: '',
    security_question_answer: '',
    firstname: '',
    lastname: '',
    gender: '',
    address: '',
    phone_number: '',
    email: '',
    profile_photo: '',
    restaurant: '',
    role: 'waiter',
  };

  selectedFile: File | null = null;

  ngOnInit(): void {
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });

    this.restaurant_type_service.all().subscribe((data) => {
      this.restaurant_types = data;
    });

    this.user_service.find_by_role('waiter').subscribe((data) => {
      this.waiters = data;
    });
    this.user_service.find_by_role('guest').subscribe((data) => {
      this.guests = data;
    });
    this.updated_guest_statuses.fill('');
  }

  onNavRadioChange() {
    this.selected_restaurant = '';
  }

  updateStatus(guest: Guest, index: number): void {
    this.admin_service
      .update_status(guest.username, this.updated_guest_statuses[index])
      .subscribe((data) => {
        this.guests = [];

        this.user_service.find_by_role('guest').subscribe((data) => {
          this.guests = data;
        });
      });
  }

  //waiter addition

  validDimensions(image: File): Observable<boolean> {
    return this.image_dim.validateImageDimensions(image);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  onSubmitWaiter() {
    if (!this.validate_waiter_form()) {
      return; // Validation failed, stop submission
    }

    this.process_form_submission();
  }

  private validate_waiter_form(): boolean {
    const isValid = this.form_validation_service.validate_user_form(
      this.new_waiter,
      this.selectedFile
    );

    if (!isValid) {
      // Set form flags based on validation results
      this.set_form_flags();
    }

    return isValid;
  }

  private set_form_flags() {
    // Reset flags
    this.waiter_form_flags.invalid_password = false;
    this.waiter_form_flags.invalid_email = false;
    this.waiter_form_flags.invalid_phone_number = false;
    this.waiter_form_flags.invalid_picture_format = false;
   
    this.waiter_form_flags.invalid_picture_dimensions = false;

    // Set flags based on validation errors
    const isValidPassword = RegexPatterns.PASSWORD.test(this.new_waiter.password);
    const isValidEmail = RegexPatterns.EMAIL.test(this.new_waiter.email);
    const isValidPhoneNumber = RegexPatterns.PHONE_NUMBER.test(this.new_waiter.phone_number);
   
    const isPngOrJpg = this.selectedFile ? RegexPatterns.FILE_FORMAT.test(this.selectedFile.name) : true;

    if (!isValidPassword) {
      this.waiter_form_flags.invalid_password = true;
    }

    if (!isValidEmail) {
      this.waiter_form_flags.invalid_email = true;
    }

    if (!isValidPhoneNumber) {
      this.waiter_form_flags.invalid_phone_number = true;
    }

    if (!isPngOrJpg) {
      this.waiter_form_flags.invalid_picture_format = true;
    }
  }

  private process_form_submission() {
    this.new_waiter.password = CryptoJS.MD5(this.new_waiter.password).toString();
    this.new_waiter.security_question_answer = CryptoJS.MD5(
      this.new_waiter.security_question_answer
    ).toString();

    if (this.selectedFile) {
      this.new_waiter.profile_photo = this.selectedFile.name;
    } else {
      // Set default profile photo based on gender
      this.new_waiter.profile_photo =
        this.new_waiter.gender === 'male'
          ? 'default_male.png'
          : 'default_female.png';
    }

    this.admin_service.register_waiter(this.new_waiter).subscribe({
      next: (data) => {
        this.waiters = [];

        this.user_service.find_by_role('waiter').subscribe((data) => {
          this.waiters = data;
        });
      },
      error: (error) => {
        console.error('Error creating waiter:', error);
        // Handle specific errors or show a general message
        if (error.status === 408) {
          this.waiter_form_flags.username_taken = true;
          // Conflict error
        } else if (error.status === 409) {
          this.waiter_form_flags.email_taken = true;
        } else {
          this.waiter_form_flags.general_errors = true;
          // General error
        }
      },
    });
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

    this.admin_service.add_restaurant(this.newRestaurant).subscribe((data) => {
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

  logout() {
    this.auth_service.logout();
  }
}
