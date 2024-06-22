import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private floor_plan_url = 'assets/floor_plans'; 

  constructor(private http: HttpClient) { }

  getData(file_name:string): Observable<any> {
    return this.http.get<any>(`${this.floor_plan_url}/${file_name}`);
  }
}
