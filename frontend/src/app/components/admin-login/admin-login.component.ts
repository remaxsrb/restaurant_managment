import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { UserService } from 'src/app/services/model_services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/utility_services/auth.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(
    private auth_service: AuthService,
    public jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  private readonly TOKEN_KEY = 'authToken';


  signInData = {
    username: '',
    password: '',
  };

  onLogin() {
    this.signInData.password = CryptoJS.MD5(
      this.signInData.password
    ).toString();

    this.auth_service
      .login(this.signInData.username, this.signInData.password)
      .subscribe({
        next: (data) => {
          localStorage.setItem(this.TOKEN_KEY, data.token);

          if (data.user.role === 'admin') {
            this.router.navigate(['admin']);
          }
        },
        error: (error) => {
          console.error('Error logging in:', error);
          // Handle specific errors or show a general message
          if (error.status === 404) {
            alert('Invalid credentials'); // Conflict error
          } else {
            alert('Error logging in'); // General error
          }
        },
      });
  }
}
