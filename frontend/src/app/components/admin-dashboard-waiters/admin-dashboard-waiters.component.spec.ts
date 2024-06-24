import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardWaitersComponent } from './admin-dashboard-waiters.component';

describe('AdminDashboardWaitersComponent', () => {
  let component: AdminDashboardWaitersComponent;
  let fixture: ComponentFixture<AdminDashboardWaitersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardWaitersComponent]
    });
    fixture = TestBed.createComponent(AdminDashboardWaitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
