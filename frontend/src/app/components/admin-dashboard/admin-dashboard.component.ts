import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Guest } from 'src/app/models/guest';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantType } from 'src/app/models/restaurant_type';
import { Waiter } from 'src/app/models/waiter';
import { AdminService } from 'src/app/services/admin.service';
import { GuestService } from 'src/app/services/guest.service';
import { RestaurantTypeService } from 'src/app/services/restaurant-type.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { WaiterService } from 'src/app/services/waiter.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private restaurant_service: RestaurantService,
    private waiter_service: WaiterService,
    private guest_service: GuestService,
    private admin_service: AdminService,
    private restaurant_type_service: RestaurantTypeService,

    private router: Router
  ) {}

  selectedOption: String = 'restaurants';
  new_guest_statuses: string[] = [];

  restaurants: Restaurant[] = [];
  restaurant_types: RestaurantType[] = [];

  waiters: Waiter[] = [];
  guests: Guest[] = [];

  newRestaurant = {
    name: '',
    address: '',
    phone_number: '',
    email: '',
    type: '',
    location: '',
    description: '',
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
  };

  selectedFile: File | null = null;

  ngOnInit(): void {
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });

    this.restaurant_type_service.all().subscribe((data) => {
      this.restaurant_types = data;
    });

    this.waiter_service.all().subscribe((data) => {
      this.waiters = data;
    });
    this.guest_service.all().subscribe((data) => {
      this.guests = data;
    });
    this.new_guest_statuses.fill('');
  }

  updateStatus(guest: Guest, index: number): void {
    this.admin_service
      .update_status(guest.username, this.new_guest_statuses[index])
      .subscribe((data) => {
        this.guests = [];

        this.guest_service.all().subscribe((data) => {
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
      alert('Password is not valid');
      return false;
    }

    if (!isValidEmail) {
      alert('Email is not valid');
      return false;
    }

    if (!isValidPhoneNumber) {
      alert('Phone number is not valid');
      return false;
    }

    if (!isPngOrJpg) {
      alert('Picture should be PNG or JPG');
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

        this.waiter_service.all().subscribe((data) => {
          this.waiters = data;
        });
      },
      error: (error) => {
        console.error('Error creating guest:', error);
        // Handle specific errors or show a general message
        if (error.status === 409) {
          alert('Username or email already exists.'); // Conflict error
        } else {
          alert('Failed to create guest. Please try again later.'); // General error
        }
      },
    });
  }

  onSubmitRestaurant() {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const isValidEmail = emailRegex.test(this.newRestaurant.email);

    if (!isValidEmail) {
      alert('Email is not valid');
      return; //not valid email abort submission
    }

    this.admin_service.add_restaurant(this.newRestaurant).subscribe((data) => {
      this.restaurants = [];

      this.restaurant_service.all().subscribe((data) => {
        this.restaurants = data;
      });
    });
  }
}
