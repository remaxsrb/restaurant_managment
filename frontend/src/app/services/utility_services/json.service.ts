import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private floor_plan_url = 'assets/restaurant_plans'; 
  private photo_url = 'assets/photos'; 

   

  constructor(private http: HttpClient) { }

  get_restaurant_plan(file_name:string): Observable<any> {
    return this.http.get<any>(`${this.floor_plan_url}/${file_name}`);
  }
  get_photo(file_name:string): Observable<Blob> {
    return this.http.get(`${this.photo_url}/${file_name}`, { responseType: 'blob' });
  }
}
