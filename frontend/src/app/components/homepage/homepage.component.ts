import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { Waiter } from 'src/app/models/waiter';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private restaurant_service: RestaurantService,  private router: Router) {}

  title = 'Kutak dobre hrane';

  restaurants: Restaurant[] = []
  waiters: Waiter[] = []
  number_of_guests: Number = 0

  ngOnInit(): void {

      
  }
}
