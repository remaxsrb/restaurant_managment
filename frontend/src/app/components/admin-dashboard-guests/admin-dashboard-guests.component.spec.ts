import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardGuestsComponent } from './admin-dashboard-guests.component';

describe('AdminDashboardGuestsComponent', () => {
  let component: AdminDashboardGuestsComponent;
  let fixture: ComponentFixture<AdminDashboardGuestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardGuestsComponent]
    });
    fixture = TestBed.createComponent(AdminDashboardGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
