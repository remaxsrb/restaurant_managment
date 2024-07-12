import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }


  formatTimeTo24HourString(time: any) {
    // Extract hour and minute
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
}
