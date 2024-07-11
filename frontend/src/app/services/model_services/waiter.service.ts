import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { Waiter } from '../../models/waiter';

@Injectable({
  providedIn: 'root',
})
export class WaiterService {
  constructor(private http: HttpClient) {}

  backendUrl = 'https://127.0.0.1:4000/waiter';
}
