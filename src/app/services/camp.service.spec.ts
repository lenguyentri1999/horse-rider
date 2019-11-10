import { TestBed } from '@angular/core/testing';

import { CampService } from './camp.service';
import { Camp } from 'src/models/camp';

describe('CampService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampService = TestBed.get(CampService);
    expect(service).toBeTruthy();
  });
});

describe('CampService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be null', () => {
    const service: CampService = TestBed.get(CampService);
    const camp = null;
    service.isCamp(camp).subscribe(val => {
      expect(val).toBeFalsy();
    });
  });
});
