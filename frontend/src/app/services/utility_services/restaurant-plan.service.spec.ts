import { TestBed } from '@angular/core/testing';

import { RestaurantPlanService } from './restaurant-plan.service';

describe('RestaurantPlanService', () => {
  let service: RestaurantPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
