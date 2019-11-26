import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCampPage } from './admin-add-camp.page';

describe('AdminAddCampPage', () => {
  let component: AdminAddCampPage;
  let fixture: ComponentFixture<AdminAddCampPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddCampPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCampPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
