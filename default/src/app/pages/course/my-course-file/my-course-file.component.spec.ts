/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyCourseFileComponent } from './my-course-file.component';

describe('MyCourseFileComponent', () => {
  let component: MyCourseFileComponent;
  let fixture: ComponentFixture<MyCourseFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCourseFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCourseFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
