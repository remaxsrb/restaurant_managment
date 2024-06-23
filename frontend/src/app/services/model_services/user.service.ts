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
}
