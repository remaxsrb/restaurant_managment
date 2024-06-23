import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantType } from '../models/restaurant_type';

@Injectable({
  providedIn: 'root'
})
export class RestaurantTypeService {

  constructor(private http: HttpClient) {}

  backendUrl = 'http://127.0.0.1:4000/restaurant_type';

  //headers = new HttpHeaders().set('Content-Type', 'application/json');



  all() {
    return this.http.get<RestaurantType[]>(`${this.backendUrl}/all`);

  }
}
