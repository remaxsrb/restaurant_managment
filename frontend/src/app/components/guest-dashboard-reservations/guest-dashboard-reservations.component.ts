import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-dashboard-reservations',
  templateUrl: './guest-dashboard-reservations.component.html',
  styleUrls: ['./guest-dashboard-reservations.component.css']
})
export class GuestDashboardReservationsComponent implements OnInit {

  stateOptions: any[] = [ { label: "Form", value: 0 },
    { label: "Graphic", value: 1 }
  ]

  ngOnInit(): void {
      
  }
}
