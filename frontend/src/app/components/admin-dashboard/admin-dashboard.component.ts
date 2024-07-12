import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/utility_services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  constructor(private auth_service: AuthService) {}


  logout() {
    this.auth_service.logout();
  }
}
