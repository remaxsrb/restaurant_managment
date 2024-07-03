import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../../models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  backendUrl = 'http://127.0.0.1:4000/restaurant';

  all() {
    return this.http.get<Restaurant[]>(`${this.backendUrl}/all`);
  }

  sort_by_name_asc() {
    return this.http.get<Restaurant[]>(`${this.backendUrl}/sort_by_name_asc`);
  }
  sort_by_name_dsc() {
    return this.http.get<Restaurant[]>(`${this.backendUrl}/sort_by_name_desc`);
  }
  sort_by_address_asc() {
    return this.http.get<Restaurant[]>(
      `${this.backendUrl}/sort_by_address_asc`
    );
  }
  sort_by_address_dsc() {
    return this.http.get<Restaurant[]>(
      `${this.backendUrl}/sort_by_address_desc`
    );
  }
  sort_by_type_asc() {
    return this.http.get<Restaurant[]>(`${this.backendUrl}/sort_by_type_asc`);
  }
  sort_by_type_dsc() {
    return this.http.get<Restaurant[]>(`${this.backendUrl}/sort_by_type_desc`);
  }
}
