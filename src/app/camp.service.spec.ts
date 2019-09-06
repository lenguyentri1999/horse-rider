import { TestBed } from '@angular/core/testing';

import { CampService } from './camp.service';

describe('CampService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampService = TestBed.get(CampService);
    expect(service).toBeTruthy();
  });
});
