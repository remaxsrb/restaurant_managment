import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) {}

  backendUrl = 'http://127.0.0.1:4000/restaurant';

  all() {
    return this.http.get<Restaurant[]>(`${this.backendUrl}/all`);
  }

}
