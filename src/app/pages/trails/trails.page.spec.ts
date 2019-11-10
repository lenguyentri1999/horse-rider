import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailsPage } from './trails.page';

describe('TrailsPage', () => {
  let component: TrailsPage;
  let fixture: ComponentFixture<TrailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
