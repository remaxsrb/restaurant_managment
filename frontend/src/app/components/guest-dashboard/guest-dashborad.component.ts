import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/utility_services/auth.service';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css']
})
export class GuestDashBoardComponent {

  constructor(private auth_service: AuthService) {}

  selected_option: String = 'profile';

  onNavRadioChange() {
    this.selected_option = '';
  }

  logout() {
    localStorage.removeItem('user')
    this.auth_service.logout();
  }

}
