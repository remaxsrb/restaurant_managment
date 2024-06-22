import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from 'src/app/models/guest';
import { Restaurant } from 'src/app/models/restaurant';
import { Waiter } from 'src/app/models/waiter';
import { AdminService } from 'src/app/services/admin.service';
import { GuestService } from 'src/app/services/guest.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { WaiterService } from 'src/app/services/waiter.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private restaurant_service: RestaurantService,
    private waiter_service: WaiterService,
    private guest_service: GuestService,
    private admin_service: AdminService,
    private router: Router
  ) {}

  selectedOption: String = "restaurants";
  new_guest_statuses: string[] = []


  restaurants: Restaurant[] = [];
  waiters: Waiter[] = [];
  guests: Guest[] = [];

  ngOnInit(): void {
    this.restaurant_service.all().subscribe(
      data => {
        
        this.restaurants = data
      }
    )

    this.waiter_service.all().subscribe(
      data => {
        
        this.waiters = data
      }
    )
    this.guest_service.all().subscribe(
      data => {
        
        this.guests = data
      }
    )
    this.new_guest_statuses.fill("")

  }


  updateStatus(guest: Guest, index:number):void {
    this.admin_service.update_status(guest.username, this.new_guest_statuses[index]).subscribe(
      data => {
        
        this.guests = []

        this.guest_service.all().subscribe(
          data => {
            
            this.guests = data
          }
        )
      }
    )



  }

}
