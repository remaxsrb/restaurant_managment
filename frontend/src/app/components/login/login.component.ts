import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/utility_services/auth.service';
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

  private reset_form_flags() {
    this.login_form_flags.invalid_password = false;
    this.login_form_flags.invalid_password = false;
    this.login_form_flags.invalid_password = false;
  }

  onLogin() {
    this.reset_form_flags(); //Incase someone does not reload after bad submission, reset flags as to not confuse the user

    this.auth_service
      .login(this.signInData.username, this.signInData.password)
      .subscribe({
        next: (data) => {
          localStorage.setItem(this.TOKEN_KEY, data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          if (data.user.role === 'guest') {
            this.router.navigate(['guest']);
          } else if (data.user.role === 'waiter') {
            this.router.navigate(['waiter']);
          } else if (data.user.role === 'admin') {
            this.router.navigate(['admin']);
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
        },
      });
  }
}
