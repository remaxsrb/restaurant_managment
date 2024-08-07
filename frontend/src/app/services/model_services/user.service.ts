import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enivroment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  backendUrl = `${this.apiUrl}/user`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  register(user: any): Observable<any> {
    return this.http.post<any>(
      `${this.backendUrl}/register`,
      JSON.stringify(user),
      { headers: this.headers }
    );
  }

  login(signInData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/login`, signInData, {
      headers: this.headers,
    });
  }

  find_by_username(username: string) {
    return this.http.get<any>(
      `${this.backendUrl}/read_by_username/${username}`
    );
  }

  find_by_email(email: string) {
    return this.http.get<any>(`${this.backendUrl}/read_by_email/${email}`);
  }

  find_by_role(role: string) {
    return this.http.get<any[]>(`${this.backendUrl}/read_by_role/${role}`);
  }

  change_password(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/update_password/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }

  check_question(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/check_question/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }

  update_firstname(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/update_firstname/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }
  update_lastname(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/update_lastname/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }
  update_username(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/update_username/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }
  update_email(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/update_email/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }
  update_address(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/update_address/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }
  update_phone_number(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/update_phone_number/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }
  update_credit_card_number(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/update_credit_card_number/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }
  update_profile_photo(data: any) {
    return this.http.post<any>(
      `${this.backendUrl}/update_profile_photo/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }

  count_guests(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.backendUrl}/count/guest`);
  }
}
