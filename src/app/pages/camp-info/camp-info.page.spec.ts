import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampInfoPage } from './camp-info.page';

describe('CampInfoPage', () => {
  let component: CampInfoPage;
  let fixture: ComponentFixture<CampInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
