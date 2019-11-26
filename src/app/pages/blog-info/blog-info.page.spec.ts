import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogInfoPage } from './blog-info.page';

describe('BlogInfoPage', () => {
  let component: BlogInfoPage;
  let fixture: ComponentFixture<BlogInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
