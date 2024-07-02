import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/model_services/user.service';
import { FormValidationService } from 'src/app/services/utility_services/form-validation.service';
import { ImageDimensionValidationService } from 'src/app/services/utility_services/image-dimension-validation.service';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RegexPatterns } from '../regex_patterns';

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
    private form_validation_service: FormValidationService,
    private router: Router
  ) {}
  user: User = new User();

  user_updates = {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    address: '',
    phone_number: '',
    credit_card_number: '',
    profile_photo: '',
  };

  update_flags = {
    invalid_email: false,
    invalid_phone_number: false,
    invalid_picture_format: false,
    invalid_credit_card_format: false,
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

    this.json_service.get_photo(this.user.profile_photo).subscribe((data) => {
      this.user.profile_photo = URL.createObjectURL(data);
    });
  }

  selectedFile: File | null = null;

  validDimensions(image: File): Observable<boolean> {
    return this.image_dim.validateImageDimensions(image);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  onSubmit() {
    this.reset_form_flags(); //Incase someone does not reload after bad submission, reset flags as to not confuse the user

    if (!this.validate_form()) {
      return; // Validation failed, stop submission
    }

    this.processFormSubmission();
  }

  validate_form(): boolean {
    var isValid = this.form_validation_service.validate_email(
      this.user_updates.email
    );
    isValid = this.form_validation_service.validate_phone_number(
      this.user_updates.phone_number
    );
    isValid = this.form_validation_service.validate_credit_card_number(
      this.user_updates.credit_card_number
    );

    if (!isValid) this.set_form_flags();

    return isValid;
  }

  private reset_form_flags() {
    // Reset flags
    this.update_flags.invalid_email = false;
    this.update_flags.invalid_phone_number = false;
    this.update_flags.invalid_picture_format = false;

  }

  private set_form_flags() {
    // Set flags based on validation errors
    const is_valid_email = RegexPatterns.EMAIL.test(this.user_updates.email);
    const is_valid_phone_number = RegexPatterns.PHONE_NUMBER.test(
      this.user_updates.phone_number
    );
    const is_valid_credit_card_number = RegexPatterns.CREDIT_CARD_NUMBER.test(
      this.user_updates.credit_card_number
    );
    const is_valid_png_or_jpg = this.selectedFile
      ? RegexPatterns.FILE_FORMAT.test(this.selectedFile.name)
      : true;

    if (!is_valid_email) {
      this.update_flags.invalid_email = true;
    }

    if (!is_valid_phone_number) {
      this.update_flags.invalid_phone_number = true;
    }

    if (!is_valid_credit_card_number) {
      this.update_flags.invalid_credit_card_format = true;
    }

    if (!is_valid_png_or_jpg) {
      this.update_flags.invalid_picture_format = true;
    }
  }

  processFormSubmission() {

    if (this.user_updates.firstname) {
      const data = {
        username: this.user.username,
        firstname: this.user_updates.firstname
      }
      this.user_service.update_firstname(data);
    }

    if (this.user_updates.lastname) {
      const data = {
        username: this.user.username,
        lastname: this.user_updates.lastname
      }
      this.user_service.update_lastname(data);
    }

    if (this.user_updates.username) {
      this.user_service.update_username(this.user_updates.username).subscribe({
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
    if (this.user_updates.email) {
      this.user_service.update_email(this.user_updates.email).subscribe({
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
    if (this.user_updates.address) {
      const data = {
        username: this.user.username,
        address: this.user_updates.address
      }
      this.user_service.update_address(data);
    }
    if (this.user_updates.phone_number) {
      const data = {
        username: this.user.username,
        phone_number: this.user_updates.phone_number
      }
      this.user_service.update_phone_number(data);
    }
    if (this.user_updates.credit_card_number) {
      const data = {
        username: this.user.username,
        credit_card_number: this.user_updates.credit_card_number
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
    this.update_flags.invalid_picture_format = false;
    this.update_flags.invalid_picture_dimensions = false;

    const is_valid_png_or_jpg = this.selectedFile
    ? RegexPatterns.FILE_FORMAT.test(this.selectedFile.name)
    : true;

    if (!is_valid_png_or_jpg) {
      this.update_flags.invalid_picture_format = true;
      return;
    }

    if (this.selectedFile) {
      this.user_updates.profile_photo = this.selectedFile.name;
      const data = {
        username: this.user_updates.username,
        profile_photo: this.user_updates.profile_photo
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
