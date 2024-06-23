import { Component } from '@angular/core';
import { FormValidationService } from 'src/app/services/utility_services/form-validation.service';
import { RegexPatterns } from '../regex_patterns';
import { UserService } from 'src/app/services/model_services/user.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  component_data = { username: '', old_password: '', new_password: '' };
  form_error_flags = {
    user_non_existing: false,
    invalid_password_format: false,
    general_errors: false,
  };

  constructor(
    private user_service: UserService,
    private validation_service: FormValidationService,
    private router: Router
  ) {}

  private validate_form(): boolean {
    const is_valid = this.validation_service.validate_change_password_form(
      this.component_data.new_password
    );

    if (!is_valid) this.set_form_flags();

    return is_valid;
  }

  private set_form_flags() {
    this.form_error_flags.invalid_password_format = false;

    const is_valid_password = RegexPatterns.PASSWORD.test(
      this.component_data.new_password
    );

    if (!is_valid_password) return false;

    return true;
  }

  process_form_submission() {
    this.component_data.new_password = CryptoJS.MD5(
      this.component_data.new_password
    ).toString();

    let data = {
      username: this.component_data.username,
      password: this.component_data.new_password,
    };

    this.user_service.change_password(data).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        // Handle specific errors or show a general message
        if (error.status === 404) {
          this.form_error_flags.user_non_existing = true;
          // Not found error
        } else {
          this.form_error_flags.general_errors = true; // General error
        }
      },
    });
  }

  onSubmit() {
    if (!this.validate_form()) return; // Validation failed, stop submission

    this.process_form_submission();
  }
}
