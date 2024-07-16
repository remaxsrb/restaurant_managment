import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Waiter } from 'src/app/models/waiter';
import { AdminService } from 'src/app/services/model_services/admin.service';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import { UserService } from 'src/app/services/model_services/user.service';
import { ImageDimensionValidationService } from 'src/app/services/utility_services/image-dimension-validation.service';
import { RegexPatterns } from '../regex_patterns';
import { Restaurant } from 'src/app/models/restaurant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
    private fb: FormBuilder

  ) {}

  waiters: Waiter[] = [];
  restaurants: Restaurant[] = [];

  waiter_form_flags = {
   
    username_taken: false,
    email_taken: false,
    invalid_picture_dimensions: false,
    general_errors: false,
  };





  waiterForm!: FormGroup;
  addressForm!: FormGroup;

  selectedFile: File | null = null;


  initAddressForm(): void {
    this.addressForm = this.fb.group({
      street: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.STREET_NAME)],
      ],
      number: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.STREET_NUMBER)],
      ],
      city: ['', Validators.required],
    });
  }

  initWaiterForm(): void {
    this.waiterForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.PASSWORD)],
      ],
      email: ['', [Validators.required, Validators.email]],
      role: ['waiter'],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      address: this.addressForm,
      phone_number: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.PHONE_NUMBER)],
      ],
      profile_photo: [''],
      restaurant: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.user_service.find_by_role('waiter').subscribe((data) => {
      this.waiters = data;
    });
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });
  }

  get username() {
    return this.waiterForm.get('username');
  }

  get password() {
    return this.waiterForm.get('password');
  }

  get email() {
    return this.waiterForm.get('email');
  }

  get firstname() {
    return this.waiterForm.get('firstname');
  }

  get lastname() {
    return this.waiterForm.get('lastname');
  }

  get gender() {
    return this.waiterForm.get('gender');
  }

  get address() {
    return this.waiterForm.get('address');
  }

  get street() {
    return this.addressForm.get('street');
  }

  get number() {
    return this.addressForm.get('number');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get phone_number() {
    return this.waiterForm.get('phone_number');
  }

  get profile_photo() {
    return this.waiterForm.get('profile_photo');
  }

  get restaurant() {
    return this.waiterForm.get('restaurant');
  }

  validDimensions(image: File): Observable<boolean> {
    return this.image_dim.validateImageDimensions(image);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.files[0].name;
  }

  onSubmit() {
    

    if (this.selectedFile) {
      this.waiterForm.patchValue({
        profile_photo: this.selectedFile.name, // Assign file name to plan in form
      });
    } else {
      // Set default profile photo based on gender
      this.waiterForm.patchValue({
        profile_photo:
          this.gender?.value === 'male'
            ? 'default_male.png'
            : 'default_female.png',
      });
    }

    
    this.admin_service.register_waiter(this.waiterForm.value).subscribe({
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
