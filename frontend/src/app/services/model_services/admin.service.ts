import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private backendUrl = 'http://127.0.0.1:4000/admin';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  update_status(username: string, newStatus: string): Observable<any> {
    const data = {
      username: username,
      new_status: newStatus.toLowerCase(),
    };

    return this.http.post<any>(`${this.backendUrl}/set_guest_status`, data, { headers: this.headers });
  }

  register_waiter(waiter: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/register_waiter`, JSON.stringify(waiter), { headers: this.headers });
  }

  add_restaurant(restaurant: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/add_restaurant`, restaurant, { headers: this.headers });
  }
}
