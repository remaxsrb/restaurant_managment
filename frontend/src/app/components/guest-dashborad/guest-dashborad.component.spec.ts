import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDashboradComponent } from './guest-dashborad.component';

describe('GuestDashboradComponent', () => {
  let component: GuestDashboradComponent;
  let fixture: ComponentFixture<GuestDashboradComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestDashboradComponent]
    });
    fixture = TestBed.createComponent(GuestDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
