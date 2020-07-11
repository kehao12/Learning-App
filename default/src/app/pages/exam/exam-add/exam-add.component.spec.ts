/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExamAddComponent } from './exam-add.component';

describe('ExamAddComponent', () => {
  let component: ExamAddComponent;
  let fixture: ComponentFixture<ExamAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
