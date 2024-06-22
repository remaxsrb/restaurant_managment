import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http: HttpClient) {}

  backendUrl = 'http://127.0.0.1:4000/guest';

  private handleError(error: HttpErrorResponse): Observable<never> {
    
    let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  register(guest: any): Observable<any> {
    const data = {
      username: guest.username,
      password: guest.password,
      security_question: guest.security_question,
      security_question_answer: guest.security_question_answer,
      firstname: guest.firstname,
      lastname: guest.lastname,
      gender: guest.gender,
      address: guest.address,
      phone_number: guest.phone_number,
      email: guest.email,
      credit_card_number: guest.credit_card_number,
      profile_photo: guest.profile_photo
    };

    return this.http.post<any>(`${this.backendUrl}/register`, data).pipe(
      catchError(this.handleError)
    );
  }

  find_by_username(username: string) {

    return this.http.get<Guest>(`${this.backendUrl}/readbyusername/${username}`);
  }

  find_by_email(email:string) {
    return this.http.get<Guest>(`${this.backendUrl}/readbyemail/${email}`);
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

  all() {
    return this.http.get<Guest[]>(`${this.backendUrl}/all`);
  }




}
