import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardRestaurantsComponent } from './admin-dashboard-restaurants.component';

describe('AdminDashboardRestaurantsComponent', () => {
  let component: AdminDashboardRestaurantsComponent;
  let fixture: ComponentFixture<AdminDashboardRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardRestaurantsComponent]
    });
    fixture = TestBed.createComponent(AdminDashboardRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
