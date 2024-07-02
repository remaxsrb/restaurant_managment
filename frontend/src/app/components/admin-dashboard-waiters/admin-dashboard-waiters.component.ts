import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Waiter } from 'src/app/models/waiter';
import { AdminService } from 'src/app/services/model_services/admin.service';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import { UserService } from 'src/app/services/model_services/user.service';
import { FormValidationService } from 'src/app/services/utility_services/form-validation.service';
import { ImageDimensionValidationService } from 'src/app/services/utility_services/image-dimension-validation.service';
import { RegexPatterns } from '../regex_patterns';
import { Restaurant } from 'src/app/models/restaurant';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-admin-dashboard-waiters',
  templateUrl: './admin-dashboard-waiters.component.html',
  styleUrls: ['./admin-dashboard-waiters.component.css'],
})
export class AdminDashboardWaitersComponent implements OnInit {
  constructor(
    private restaurant_service: RestaurantService,
    private user_service: UserService,
    private admin_service: AdminService,
    private image_dim: ImageDimensionValidationService,
    private form_validation_service: FormValidationService
  ) {}

  waiters: Waiter[] = [];
  restaurants: Restaurant[] = [];

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
    this.user_service.find_by_role('waiter').subscribe((data) => {
      this.waiters = data;
    });
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });
  }

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
    // Set flags based on validation errors
    const isValidPassword = RegexPatterns.PASSWORD.test(
      this.new_waiter.password
    );
    const isValidEmail = RegexPatterns.EMAIL.test(this.new_waiter.email);
    const isValidPhoneNumber = RegexPatterns.PHONE_NUMBER.test(
      this.new_waiter.phone_number
    );

    const isPngOrJpg = this.selectedFile
      ? RegexPatterns.FILE_FORMAT.test(this.selectedFile.name)
      : true;

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

    this.new_waiter.password = CryptoJS.MD5(
      this.new_waiter.password
    ).toString();
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
}
