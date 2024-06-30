import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDashboardRestaurantsComponent } from './guest-dashboard-restaurants.component';

describe('GuestDashboardRestaurantsComponent', () => {
  let component: GuestDashboardRestaurantsComponent;
  let fixture: ComponentFixture<GuestDashboardRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestDashboardRestaurantsComponent]
    });
    fixture = TestBed.createComponent(GuestDashboardRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
