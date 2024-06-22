
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  backendUrl = 'http://127.0.0.1:4000/admin';

  private handleError(error: HttpErrorResponse): Observable<never> {
    
    let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  login(username: String, password:String) : Observable<any> {
    const data = {
      username: username,
      password: password,

    };

    return this.http.post<any>(`${this.backendUrl}/login`, data).pipe(
      catchError(this.handleError)
    );
  }


  update_status(username: String, new_status: String) {

    const data = {
      username: username,
      new_status: new_status.toLowerCase(),
 
    };

    return this.http.post<any>(`${this.backendUrl}/set_guest_status`, data);

  }

  register_waiter(waiter: any): Observable<any> {
    const data = {
      username: waiter.username,
      password: waiter.password,
      security_question: waiter.security_question,
      security_question_answer: waiter.security_question_answer,
      firstname: waiter.firstname,
      lastname: waiter.lastname,
      gender: waiter.gender,
      address: waiter.address,
      phone_number: waiter.phone_number,
      email: waiter.email,
      profile_photo: waiter.profile_photo,
      restaurant: waiter.restaurant
    };

    return this.http.post<any>(`${this.backendUrl}/register_waiter`, data);
  }

  add_restaurant(restaurant: any): Observable<any> {
    const data = {
      name: restaurant.name,
      address: restaurant.address,
      phone_number: restaurant.phone_number,
      email: restaurant.email,
      type: restaurant.type,
      location: restaurant.location,
      description: restaurant.description,
    };

    return this.http.post<any>(`${this.backendUrl}/add_restaurant`, data).pipe(
      catchError(this.handleError)
    );
  }

}
