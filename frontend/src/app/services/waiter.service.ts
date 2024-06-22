import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { Waiter } from '../models/waiter';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  constructor(private http: HttpClient) {}

  backendUrl = 'http://127.0.0.1:4000/waiter';



  login(username: String, password:String) : Observable<any> {
    const data = {
      username: username,
      password: password,

    };

    return this.http.post<any>(`${this.backendUrl}/login`, data);
    
  }

  all() {
    return this.http.get<Waiter[]>(`${this.backendUrl}/all`);
  }



}
