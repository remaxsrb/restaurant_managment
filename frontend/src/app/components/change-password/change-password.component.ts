import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexPatterns } from '../regex_patterns';
import { UserService } from 'src/app/services/model_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  backend_error_flags = {
    user_non_existing: false,
    general_errors: false,
  };

  changePasswordForm!: FormGroup;

  constructor(
    private user_service: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initchangePasswordForm();
  }

  initchangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.PASSWORD)],
      ],
      newPasswordRepeat: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.PASSWORD)],
      ],
    });
  }

  get username() {
    return this.changePasswordForm.get('username');
  }
  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get newPasswordRepeat() {
    return this.changePasswordForm.get('newPasswordRepeat');
  }

  onSubmit() {
    if (this.newPassword!.value !== this.newPasswordRepeat!.value) {
      return;
    }

    this.changePasswordForm.removeControl('oldPassword');
    this.changePasswordForm.removeControl('newPasswordRepeat');

    this.user_service.change_password(this.changePasswordForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        // Handle specific errors or show a general message
        if (error.status === 404) {
          this.backend_error_flags.user_non_existing = true;
          // Not found error
        } else {
          this.backend_error_flags.general_errors = true; // General error
        }
      },
    });
  }
}
