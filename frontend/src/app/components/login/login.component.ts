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

  constructor(private guest_service: GuestService, private waiter_service: WaiterService, private router: Router) {}

  signInData = {
    username: '',
    password: '',
    type: '',
  };

  onLogin() {
    this.signInData.password = CryptoJS.MD5(this.signInData.password).toString()
    if (this.signInData.type === 'guest') {
      this.guest_service.login(this.signInData.username, this.signInData.password).subscribe({
        next: (data) => {
          console.log('Guest logged in successfully:', data);
        this.router.navigate(['guest']);
        },
        error: (error) => {
          console.error('Error logging in:', error);
        // Handle specific errors or show a general message
        if (error.status === 404) {
          alert('Invalid credentials'); // Conflict error
        } else {
          alert('Error logging in'); // General error
        }
        }
      });
    } else {
      this.waiter_service.login(this.signInData.username, this.signInData.password).subscribe({
        next: (data) => {
          console.log('Waiter logged in successfully:', data);
        this.router.navigate(['waiter']);
        },
        error: (error) => {
          console.error('Error logging in:', error);
        // Handle specific errors or show a general message
        if (error.status === 404) {
          alert('Invalid credentials'); // Conflict error
        } else {
          alert('Error logging in'); // General error
        }
        }
      });
    }
  }
}
