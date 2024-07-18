import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/model_services/user.service';
import { ImageDimensionValidationService } from 'src/app/services/utility_services/image-dimension-validation.service';
import { RegexPatterns } from '../regex_patterns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { securityQuestions } from 'src/app/securityQuestions';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private user_service: UserService,
    private image_dim: ImageDimensionValidationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  signUpForm!: FormGroup;
  addressForm!: FormGroup;
  selectedFile: File | null = null;

  securityQuestions = securityQuestions;
  errorMessage: Message[] = [];

  ngOnInit(): void {
    this.initAddressForm();
    this.initSignUpForm();
  }

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

  initSignUpForm(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.PASSWORD)],
      ],
      email: ['', [Validators.required, Validators.email]],
      role: ['guest'],
      security_question: ['', Validators.required],
      security_question_answer: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      address: this.addressForm,
      phone_number: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.PHONE_NUMBER)],
      ],
      credit_card_number: [
        '',
        [
          Validators.required,
          Validators.pattern(RegexPatterns.CREDIT_CARD_NUMBER),
        ],
      ],
      profile_photo: [''],
      status: ['pending'],
      late_for_reservation: [0],
    });
  }

  get username() {
    return this.signUpForm.get('username');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  get security_question() {
    return this.signUpForm.get('security_question');
  }

  get security_question_answer() {
    return this.signUpForm.get('security_question_answer');
  }

  get email() {
    return this.signUpForm.get('email');
  }
  get gender() {
    return this.signUpForm.get('gender');
  }
  get firstname() {
    return this.signUpForm.get('firstname');
  }
  get lastname() {
    return this.signUpForm.get('lastname');
  }
  get phone_number() {
    return this.signUpForm.get('phone_number');
  }
  get credit_card_number() {
    return this.signUpForm.get('credit_card_number');
  }
  get profile_photo() {
    return this.signUpForm.get('profile_photo');
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

  signup_response_flags = {
    email_or_username_taken: false,
    general_errors: false,
  };

  validDimensions(image: File): Observable<boolean> {
    return this.image_dim.validateImageDimensions(image);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.files[0].name;
  }

  onSubmit() {
    if (this.selectedFile) {
      this.signUpForm.patchValue({
        profile_photo: this.selectedFile.name, // Assign file name to plan in form
      });
    } else {
      // Set default profile photo based on gender
      this.signUpForm.patchValue({
        profile_photo:
          this.gender?.value === 'male'
            ? 'default_male.png'
            : 'default_female.png',
      });
    }

    this.user_service.register(this.signUpForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        // Handle specific errors or show a general message
        if (error.status === 409) {
          // Conflict error

          this.signup_response_flags.email_or_username_taken = true;
          this.setErr(error.message);
        } else if (error.status === 500) {
          this.signup_response_flags.general_errors = true; // General error
          this.setErr(error.message);
        } else {
          this.clearErr();
        }

        this.errorMessage = [
          { severity: 'error', summary: 'Error', detail: error.error?.message },
        ];
      },
    });
  }

  private setErr(message: string) {
    this.errorMessage = [
      { severity: 'error', summary: 'Error', detail: message },
    ];
  }
  private clearErr() {
    this.signup_response_flags.email_or_username_taken = false;
    this.signup_response_flags.general_errors = false;
    this.errorMessage = [];
  }
}
