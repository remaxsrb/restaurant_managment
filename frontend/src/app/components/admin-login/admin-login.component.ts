import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(private admin_service: AdminService, private router: Router) {}

  signInData = {
    username: '',
    password: '',
  };

  onLogin() {
    this.signInData.password = CryptoJS.MD5(
      this.signInData.password
    ).toString();

    this.admin_service
      .login(this.signInData.username, this.signInData.password)
      .subscribe({
        next: (data) => {
          console.log('Admin logged in successfully:', data);
          this.router.navigate(['admin']);
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
