import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from 'src/app/services/guest.service';
import { WaiterService } from 'src/app/services/waiter.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private guest_service: GuestService,
    private waiter_service: WaiterService,
    private router: Router
  ) {}

  signInData = {
    username: '',
    password: '',
    type: '',
  };

  login_form_flags = {
    invalid_password: false,
    user_not_found: false,
    general_errors: false,
  };

  onLogin() {
    this.signInData.password = CryptoJS.MD5(
      this.signInData.password
    ).toString();

    // Attempt to log in as a guest first
    this.guest_service
      .login(this.signInData.username, this.signInData.password)
      .subscribe({
        next: (data) => {
          this.router.navigate(['guest']);
        },
        error: (error) => {
         
          if (error.status === 402) {
            // If guest login fails with 402, attempt to log in as a waiter
            this.waiter_service
              .login(this.signInData.username, this.signInData.password)
              .subscribe({
                next: (data) => {
                  this.router.navigate(['waiter']);
                },
                error: (error) => {

                  if (error.status === 402) {
                    this.login_form_flags.user_not_found = true;
                  } else if (error.status === 401) {
                    this.login_form_flags.invalid_password = true;
                  } else {
                    this.login_form_flags.general_errors = true;
                  }
                },
              });
          } else if (error.status === 401) {
            this.login_form_flags.invalid_password = true;
          } else {
            this.login_form_flags.general_errors = true;
          }
        },
      });
  }
}
