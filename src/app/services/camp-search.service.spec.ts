import { TestBed } from '@angular/core/testing';

import { CampSearchService } from './camp-search.service';

describe('CampSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampSearchService = TestBed.get(CampSearchService);
    expect(service).toBeTruthy();
  });
});
