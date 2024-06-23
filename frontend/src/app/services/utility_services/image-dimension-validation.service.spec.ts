import { TestBed } from '@angular/core/testing';

import { ImageDimensionValidationService } from './image-dimension-validation.service';

describe('ImageDimensionValidationService', () => {
  let service: ImageDimensionValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDimensionValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
