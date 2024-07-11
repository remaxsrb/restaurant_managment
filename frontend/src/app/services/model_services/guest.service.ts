import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from '../../models/guest';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(private http: HttpClient) {}

  backendUrl = 'https://127.0.0.1:4000/guest';
}
