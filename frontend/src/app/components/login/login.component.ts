import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private auth_service: AuthService,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {}

  private readonly TOKEN_KEY = 'authToken';

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
    this.auth_service.login(this.signInData.username, this.signInData.password)
      .subscribe({
        next: (data) => {
          localStorage.setItem(this.TOKEN_KEY, data.token);
          if (data.role === 'guest') {
            this.router.navigate(['guest']);
          } else if (data.role === 'waiter') {
            this.router.navigate(['waiter']);
          } else {
            this.login_form_flags.general_errors = true;
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.login_form_flags.invalid_password = true;
          } else if (error.status === 402) {
            this.login_form_flags.user_not_found = true;
          } else {
            this.login_form_flags.general_errors = true;
          }
        }
      });
  }

  onLogout() {
    this.auth_service.logout();
    this.router.navigate(['/']);

  }


}
