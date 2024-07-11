import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { Waiter } from 'src/app/models/waiter';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import * as CryptoJS from 'crypto-js';
import { UserService } from 'src/app/services/model_services/user.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private restaurant_service: RestaurantService, private user_service: UserService, private router: Router) {}

  restaurants: Restaurant[] = []
  waiters: Waiter[] = []
  number_of_guests: Number = 0

  ngOnInit(): void {
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });

    this.user_service.find_by_role('waiter').subscribe((data) => {
      this.waiters = data;
    });

    this.user_service.count_guests().subscribe((data) => {
      this.number_of_guests = data;
    });
      
  }

  
}
