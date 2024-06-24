import { Component } from '@angular/core';
import { Guest } from 'src/app/models/guest';
import { AdminService } from 'src/app/services/model_services/admin.service';
import { UserService } from 'src/app/services/model_services/user.service';


@Component({
  selector: 'app-admin-dashboard-guests',
  templateUrl: './admin-dashboard-guests.component.html',
  styleUrls: ['./admin-dashboard-guests.component.css']
})
export class AdminDashboardGuestsComponent {

  constructor(

    private user_service: UserService,
    private admin_service: AdminService,

  ) {}

  guests: Guest[] = [];
  updated_guest_statuses: string[] = [];


  ngOnInit(): void {
   
    this.user_service.find_by_role('guest').subscribe((data) => {
      this.guests = data;
    });
    this.updated_guest_statuses.fill('');
  }

  updateStatus(guest: Guest, index: number): void {
    this.admin_service
      .update_status(guest.username, this.updated_guest_statuses[index])
      .subscribe((data) => {
        this.guests = [];

        this.user_service.find_by_role('guest').subscribe((data) => {
          this.guests = data;
        });
      });
  }

}
