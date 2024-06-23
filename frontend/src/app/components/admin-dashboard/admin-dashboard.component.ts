import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Guest } from 'src/app/models/guest';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantType } from 'src/app/models/restaurant_type';
import { Waiter } from 'src/app/models/waiter';
import { AdminService } from 'src/app/services/admin.service';
import { RestaurantTypeService } from 'src/app/services/restaurant-type.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { AuthService } from 'src/app/services/auth.service';
import * as CryptoJS from 'crypto-js';
import { JsonService } from 'src/app/services/json.service';
import { UserService } from 'src/app/services/user.service';

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

    private router: Router
  ) {}

  selectedOption: String = 'restaurants';
  new_guest_statuses: string[] = [];

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

  newWaiter = {
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
    role: "waiter"

  };

  selectedFile: File | null = null;

  ngOnInit(): void {
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });

    this.restaurant_type_service.all().subscribe((data) => {
      this.restaurant_types = data;
    });

    this.user_service.find_by_role("waiter").subscribe((data) => {
      this.waiters = data;
    });
    this.user_service.find_by_role("guest").subscribe((data) => {
      this.guests = data;
    });
    this.new_guest_statuses.fill('');


  }

  onNavRadioChange() {
    this.selected_restaurant = ''
  }

  updateStatus(guest: Guest, index: number): void {
    this.admin_service
      .update_status(guest.username, this.new_guest_statuses[index])
      .subscribe((data) => {
        this.guests = [];

        this.user_service.find_by_role("guest").subscribe((data) => {
          this.guests = data;
        });
      });
  }

  //waiter addition

  validDimensions(image: File): Observable<boolean> {
    return new Observable((observer) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const minWidth = 100;
          const minHeight = 100;
          const maxWidth = 300;
          const maxHeight = 300;

          const validDimensions =
            img.width >= minWidth &&
            img.width <= maxWidth &&
            img.height >= minHeight &&
            img.height <= maxHeight;

          if (!validDimensions) {
            this.selectedFile = null;
          }
          observer.next(validDimensions);
          observer.complete();
        };
        img.onerror = () => {
          observer.error(false);
        };
        img.src = e.target.result;
      };
      reader.onerror = () => {
        observer.error(false);
      };
      reader.readAsDataURL(image);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  onSubmitWaiter() {
    if (!this.validateForm()) {
      return; // Validation failed, stop submission
    }

    this.processFormSubmission();
  }

  validateForm(): boolean {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[\W_]).{6,10}$/;
    const isValidPassword = passwordRegex.test(this.newWaiter.password);

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const isValidEmail = emailRegex.test(this.newWaiter.email);

    const phoneRegex = /^06\d{8}$/;
    const isValidPhoneNumber = phoneRegex.test(this.newWaiter.phone_number);

    const fileRegex = /\.(png|jpg)$/i;
    const isPngOrJpg = this.selectedFile
      ? fileRegex.test(this.selectedFile.name)
      : true;

    if (!isValidPassword) {
      this.waiter_form_flags.invalid_password = true;
      return false;
    }

    if (!isValidEmail) {
      this.waiter_form_flags.invalid_email = true;
      return false;
    }

    if (!isValidPhoneNumber) {
      this.waiter_form_flags.invalid_phone_number = true;
      return false;
    }

    if (!isPngOrJpg) {
      this.waiter_form_flags.invalid_picture_format = true;

      return false;
    }

    return true;
  }

  processFormSubmission() {
    this.newWaiter.password = CryptoJS.MD5(this.newWaiter.password).toString();
    this.newWaiter.security_question_answer = CryptoJS.MD5(
      this.newWaiter.security_question_answer
    ).toString();

    if (this.selectedFile) {
      this.newWaiter.profile_photo = this.selectedFile.name;
    } else {
      // Set default profile photo based on gender
      this.newWaiter.profile_photo =
        this.newWaiter.gender === 'male'
          ? 'default_male.png'
          : 'default_female.png';
    }

    this.admin_service.register_waiter(this.newWaiter).subscribe({
      next: (data) => {
        this.waiters = [];

        this.user_service.find_by_role("waiter").subscribe((data) => {
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
        this.renderFloorPlan(data);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  renderFloorPlan(floorPlan: any): void {
    const canvas = document.getElementById(
      'floorPlanCanvas'
    ) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Render rectangles
        floorPlan.rectangles.forEach((rect: any) => {
          const centerX = rect.x + rect.width / 2;
          const centerY = rect.y + rect.height / 2;
          const text = rect.label;
          const textWidth = ctx.measureText(text).width;

          ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

          // Rechtangle label is positioned in such manner that its x cooridate starts left of x coordinate of center by half of its width
          ctx.fillText(text, centerX - textWidth / 2, centerY);
        });
        // Render circles
        floorPlan.circles.forEach((circle: any) => {
          const text = circle.label;
          const textWidth = ctx.measureText(text).width;

          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
          ctx.stroke();
          // Circle label is positioned in such manner that its x cooridate starts left of x coordinate of center by half of its width

          ctx.fillText(text, circle.x - textWidth / 2, circle.y);
        });
      }
    }
  }

  logout() {
    this.auth_service.logout();
  }
}
