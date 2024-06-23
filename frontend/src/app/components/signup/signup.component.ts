import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private user_service: UserService, private router: Router) {}

  new_guest = {
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
  };

  guest_form_flags = {
    invalid_password: false,
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

  onSubmit() {
    if (!this.validateForm()) {
      return; // Validation failed, stop submission
    }

    this.processFormSubmission();
  }

  validateForm(): boolean {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[\W_]).{6,10}$/;
    const isValidPassword = passwordRegex.test(this.new_guest.password);

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const isValidEmail = emailRegex.test(this.new_guest.email);

    const phoneRegex = /^06\d{8}$/;
    const isValidPhoneNumber = phoneRegex.test(this.new_guest.phone_number);

    const creditCardRegex = /^\d{16}$/;
    const isValidCreditCardNumber = creditCardRegex.test(
      this.new_guest.credit_card_number
    );

    const fileRegex = /\.(png|jpg)$/i;
    const isPngOrJpg = this.selectedFile
      ? fileRegex.test(this.selectedFile.name)
      : true;

    if (!isValidPassword) {
      this.guest_form_flags.invalid_password = true;
      return false;
    }

    if (!isValidEmail) {
      this.guest_form_flags.invalid_email = true;
      return false;
    }

    if (!isValidPhoneNumber) {
      this.guest_form_flags.invalid_phone_number = true;
      return false;
    }

    if (!isValidCreditCardNumber) {
      this.guest_form_flags.invalid_picture_credit_card_format = true;
      return false;
    }

    if (!isPngOrJpg) {
      this.guest_form_flags.invalid_picture_format = true;
      return false;
    }

    return true;
  }

  processFormSubmission() {
    this.new_guest.password = CryptoJS.MD5(this.new_guest.password).toString();
    this.new_guest.security_question_answer = CryptoJS.MD5(
      this.new_guest.security_question_answer
    ).toString();

    if (this.selectedFile) {
      this.new_guest.profile_photo = this.selectedFile.name;
    } else {
      // Set default profile photo based on gender
      this.new_guest.profile_photo =
        this.new_guest.gender === 'male'
          ? 'default_male.png'
          : 'default_female.png';
    }

    this.user_service.register(this.new_guest).subscribe({
      next: (data) => {
        console.log('Guest registered successfully:', data);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error creating guest:', error);
        // Handle specific errors or show a general message
        if (error.status === 408) {
          this.guest_form_flags.username_exists = true;
          // Conflict error
        } 
        else if (error.status === 409) {
          this.guest_form_flags.email_taken = true;

        } else {
          this.guest_form_flags.general_errors = true; // General error
        }
      },
    });
  }
}
