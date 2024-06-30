import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDashboardFoodOrderComponent } from './guest-dashboard-food-order.component';

describe('GuestDashboardFoodOrderComponent', () => {
  let component: GuestDashboardFoodOrderComponent;
  let fixture: ComponentFixture<GuestDashboardFoodOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestDashboardFoodOrderComponent]
    });
    fixture = TestBed.createComponent(GuestDashboardFoodOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
