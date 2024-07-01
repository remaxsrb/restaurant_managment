import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  backendUrl = 'http://127.0.0.1:4000/user';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  register(user: any): Observable<any> {
    // Send POST request with headers
    return this.http.post<any>(
      `${this.backendUrl}/register`,
      JSON.stringify(user),
      { headers: this.headers }
    );
  }

  login(username: String, password: String): Observable<any> {
    const data = {
      username: username,
      password: password,
    };

    return this.http.post<any>(`${this.backendUrl}/login`, data, {
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

  update_firstname(firstname: string) {
    return this.http.post<any>(
      `${this.backendUrl}/update_firstname/`,
      firstname
    );
  }
  update_lastname(lastname: string) {
    return this.http.post<any>(
      `${this.backendUrl}/update_lastname/`,
      lastname
    );
  }
  update_username(username: string) {
    return this.http.post<any>(
      `${this.backendUrl}/update_username/`,
      username
    );
  }
  update_email(email: string) {
    return this.http.post<any>(
      `${this.backendUrl}/update_email/`,
      email
    );
  }
  update_address(address: string) {
    return this.http.post<any>(
      `${this.backendUrl}/update_address/`,
      address
    );
  }
  update_phone_number(phone_number: string) {
    return this.http.post<any>(
      `${this.backendUrl}/update_phone_number/`,
      phone_number
    );
  }
  update_credit_card_number(credit_card_number: string) {
    return this.http.post<any>(
      `${this.backendUrl}/update_credit_card_number/`,
      credit_card_number
    );
  }
  update_profile_photo(username: string, profile_photo: string) {

    const data = {
        username: username,
        profile_photo: profile_photo
    }

    return this.http.post<any>(

      `${this.backendUrl}/update_profile_photo/`,
      JSON.stringify(data),
      {
        headers: this.headers,
      })
  }


  count_role() {
    return this.http.get<Number>(`${this.backendUrl}/count_role`);
  }

}
