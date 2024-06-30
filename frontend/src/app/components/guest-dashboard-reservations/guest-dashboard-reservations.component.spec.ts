import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDashboardReservationsComponent } from './guest-dashboard-reservations.component';

describe('GuestDashboardReservationsComponent', () => {
  let component: GuestDashboardReservationsComponent;
  let fixture: ComponentFixture<GuestDashboardReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestDashboardReservationsComponent]
    });
    fixture = TestBed.createComponent(GuestDashboardReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
