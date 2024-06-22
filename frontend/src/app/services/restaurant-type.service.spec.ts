import { TestBed } from '@angular/core/testing';

import { RestaurantTypeService } from './restaurant-type.service';

describe('RestaurantTypeService', () => {
  let service: RestaurantTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
