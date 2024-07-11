import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantType } from '../../models/restaurant_type';
import { environment } from 'enivroment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantTypeService {

  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;
  
  private backendUrl = `${this.apiUrl}/restaurant_type`;


  //headers = new HttpHeaders().set('Content-Type', 'application/json');



  all() {
    return this.http.get<RestaurantType[]>(`${this.backendUrl}/all`);

  }
}
