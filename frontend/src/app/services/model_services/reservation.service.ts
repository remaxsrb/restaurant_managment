import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  constructor(private http: HttpClient) {}
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  backendUrl = 'https://127.0.0.1:4000/reservations';
  
  makeReservation(user: any){
    return this.http.post<any>(
      `${this.backendUrl}/create`,
      JSON.stringify(user),
      { headers: this.headers }
    );
  }

  
}
