import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/model_services/user.service';
import { FormValidationService } from 'src/app/services/utility_services/form-validation.service';
import { ImageDimensionValidationService } from 'src/app/services/utility_services/image-dimension-validation.service';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RegexPatterns } from '../regex_patterns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private json_service: JsonService,
    private user_service: UserService,
    private image_dim: ImageDimensionValidationService,
    private fb: FormBuilder,

  ) {}
  user: User = new User();
  addressForm!: FormGroup;
  userUpdateForm!: FormGroup;
  selectedFile: File | null = null;


  update_flags = {
    invalid_picture_dimensions: false,
    email_taken: false,
    username_exists: false,
    general_errors: false,
  };

  ngOnInit(): void {
    const user_data = localStorage.getItem('user');
    if (user_data) {
      this.user = JSON.parse(user_data);
    }
    this.initAddressForm();
    this.initUserUpdateForm();
    this.json_service.get_photo(this.user.profile_photo).subscribe((data) => {
      this.user.profile_photo = URL.createObjectURL(data);
    });
  }


  initAddressForm(): void {
    this.addressForm = this.fb.group({
      street: [
        '',
        [Validators.pattern(RegexPatterns.STREET_NAME)],
      ],
      number: [
        '',
        [Validators.pattern(RegexPatterns.STREET_NUMBER)],
      ],
      city: [''],
    });
  }


  initUserUpdateForm(): void {
    this.userUpdateForm = this.fb.group({
      username: [''],
      email: ['', Validators.email],
      firstname: [''],
      lastname: [''],
      address: this.addressForm,
      phone_number: [
        '',
        [Validators.pattern(RegexPatterns.PHONE_NUMBER)],
      ],
      credit_card_number: [
        '',
        [
          
          Validators.pattern(RegexPatterns.CREDIT_CARD_NUMBER),
        ],
      ]
    });
  }

  get username() {
    return this.userUpdateForm.get('username');
  }

  get email() {
    return this.userUpdateForm.get('email');
  }
  get firstname() {
    return this.userUpdateForm.get('firstname');
  }
  get lastname() {
    return this.userUpdateForm.get('lastname');
  }
  get phone_number() {
    return this.userUpdateForm.get('phone_number');
  }
  get credit_card_number() {
    return this.userUpdateForm.get('credit_card_number');
  }
  get profile_photo() {
    return this.userUpdateForm.get('profile_photo');
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


  validDimensions(image: File): Observable<boolean> {
    return this.image_dim.validateImageDimensions(image);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  onSubmit() {
    if (this.firstname!.value) {
      const data = {
        username: this.user.username,
        firstname: this.firstname!.value
      }
      this.user_service.update_firstname(data);
    }

    if (this.lastname!.value) {
      const data = {
        username: this.user.username,
        lastname: this.lastname!.value
      }
      this.user_service.update_lastname(data);
    }

    if (this.username!.value) {
      this.user_service.update_username(this.username!.value).subscribe({
        error: (error) => {
          // Handle specific errors or show a general message
          if (error.status === 408) {
            this.update_flags.username_exists = true;
            // Conflict error
          } else {
            this.update_flags.general_errors = true; // General error
          }
        },
      });
    }
    if (this.email!.value) {
      this.user_service.update_email(this.email!.value).subscribe({
        error: (error) => {
          // Handle specific errors or show a general message
          if (error.status === 409) {
            this.update_flags.email_taken = true;
            // Conflict error
          } else {
            this.update_flags.general_errors = true; // General error
          }
        },
      });
    }
    if (this.addressForm!.value) {
      const data = {
        username: this.user.username,
        address: this.addressForm!.value
      }
      this.user_service.update_address(data);
    }
    if (this.phone_number!.value) {
      const data = {
        username: this.user.username,
        phone_number: this.phone_number!.value
      }
      this.user_service.update_phone_number(data);
    }
    if (this.credit_card_number!.value) {
      const data = {
        username: this.user.username,
        credit_card_number: this.credit_card_number!.value
      }
      this.user_service.update_credit_card_number(
        data
      );
    }

    this.user_service.find_by_username(this.user.username) .subscribe(
      {
        next: (data) => {
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(data))
          window.location.reload()

        }
      }
    ) 
  }

  update_photo() {
    this.update_flags.invalid_picture_dimensions = false;

    if (this.selectedFile) {
      this.userUpdateForm.patchValue({
        profile_photo: this.selectedFile.name, // Assign file name to plan in form
      });
      const data = {
        username: this.username!.value,
        profile_photo: this.profile_photo!.value
      }
      this.user_service.update_profile_photo(data
      ).subscribe( 
        {
          next: () => {
            this.user_service.find_by_username(this.user.username) .subscribe(
              {
                next: (data) => {
                  localStorage.removeItem('user')
                  localStorage.setItem('user', JSON.stringify(data))
                  window.location.reload()

                }
              }
            ) 
           

          }
        }
      );
    }
  }
}
