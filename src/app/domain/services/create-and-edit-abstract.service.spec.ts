import { TestBed } from '@angular/core/testing';

import { CreateAndEditAbstractService } from './create-and-edit-abstract.service';

describe('CreateAndEditAbstractService', () => {
  let service: CreateAndEditAbstractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAndEditAbstractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
