import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }


  formatTimeTo24HourString(time: any) {
    // Extract hour and minute
    const hour = time.hour.toString().padStart(2, '0');
    const minute = time.minute.toString().padStart(2, '0');
    
    // Return the formatted string
    return `${hour}:${minute}`;
}
}
