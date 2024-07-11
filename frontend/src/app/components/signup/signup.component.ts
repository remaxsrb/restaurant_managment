import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/model_services/user.service';
import { ImageDimensionValidationService } from 'src/app/services/utility_services/image-dimension-validation.service';
import { FormValidationService } from 'src/app/services/utility_services/form-validation.service';
import { RegexPatterns } from '../regex_patterns';
import { NewGuset } from 'src/app/models/interfaces/new_guest';
import { Address } from 'src/app/models/interfaces/address';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private user_service: UserService,
    private image_dim: ImageDimensionValidationService,
    private form_validation_service: FormValidationService,
    private router: Router
  ) {}

  new_guest_address: Address = {street: '', street_number: 0, city: ''};

  new_guest: NewGuset = {
    username: '',
    password: '',
    email: '',
    role: 'guest',
    security_question: '',
    security_question_answer: '',
    firstname: '',
    lastname: '',
    gender: '',
    address: '',
    phone_number: '',
    credit_card_number: '',
    profile_photo: '',
    status: 'pending',
    late_for_reservation: 0
  };

  guest_form_flags = {
    invalid_password: false,
    invalid_address: false,
    invalid_email: false,
    invalid_phone_number: false,
    invalid_picture_format: false,
    invalid_picture_credit_card_format: false,
    invalid_picture_dimensions: false,
    email_taken: false,
    username_exists: false,
    general_errors: false,
  };

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
    const isValid = this.form_validation_service.validate_user_form(
      this.new_guest,
      this.new_guest_address,
      this.selectedFile
    );

    if (!isValid) this.set_form_flags();

    return isValid;
  }

  private reset_form_flags() {
    // Reset flags
    this.guest_form_flags.invalid_password = false;
    this.guest_form_flags.invalid_address = false;
    this.guest_form_flags.invalid_email = false;
    this.guest_form_flags.invalid_phone_number = false;
    this.guest_form_flags.invalid_picture_format = false;
    this.guest_form_flags.invalid_picture_credit_card_format = false;
    this.guest_form_flags.invalid_picture_dimensions = false;
  }

  private set_form_flags() {
    // Set flags based on validation errors
    const is_valid_password = RegexPatterns.PASSWORD.test(
      this.new_guest.password
    );

    const is_valid_address= RegexPatterns.ADDRESS.test(
      this.new_guest_address.street
    );

    const is_valid_email = RegexPatterns.EMAIL.test(this.new_guest.email);
    
    const is_valid_phone_number = RegexPatterns.PHONE_NUMBER.test(
      this.new_guest.phone_number
    );
    const is_valid_credit_card_number = RegexPatterns.CREDIT_CARD_NUMBER.test(
      this.new_guest.credit_card_number
    );
    const is_valid_png_or_jpg = this.selectedFile
      ? RegexPatterns.FILE_FORMAT.test(this.selectedFile.name)
      : true;

    if (!is_valid_password) {
      this.guest_form_flags.invalid_password = true;
    }

    if (!is_valid_address) {
      this.guest_form_flags.invalid_address = true;
    }

    if (!is_valid_email) {
      this.guest_form_flags.invalid_email = true;
    }

    if (!is_valid_phone_number) {
      this.guest_form_flags.invalid_phone_number = true;
    }

    if (!is_valid_credit_card_number) {
      this.guest_form_flags.invalid_picture_credit_card_format = true;
    }

    if (!is_valid_png_or_jpg) {
      this.guest_form_flags.invalid_picture_format = true;
    }
  }

  processFormSubmission() {
    if (this.selectedFile) {
      this.new_guest.profile_photo = this.selectedFile.name;
    } else {
      // Set default profile photo based on gender
      this.new_guest.profile_photo =
        this.new_guest.gender === 'male'
          ? 'default_male.png'
          : 'default_female.png';
    }

    // this part is a bit messy but since I have bound string streetname streetnumber
    //  to street property of address on form I have to split hem into two parts

    const street_data = this.new_guest_address.street.split(' ', 2)

    this.new_guest_address.street = street_data[0];
    this.new_guest_address.street_number = parseInt(street_data[1]);

    this.new_guest.address = this.new_guest_address;

    console.log(this.new_guest)

    this.user_service.register(this.new_guest).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        // Handle specific errors or show a general message
        if (error.status === 408) {
          this.guest_form_flags.username_exists = true;
          // Conflict error
        } else if (error.status === 409) {
          this.guest_form_flags.email_taken = true;
        } else {
          this.guest_form_flags.general_errors = true; // General error
        }
      },
    });
  }
}
