import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampCardComponent } from './camp-card.component';

describe('CampCardComponent', () => {
  let component: CampCardComponent;
  let fixture: ComponentFixture<CampCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
