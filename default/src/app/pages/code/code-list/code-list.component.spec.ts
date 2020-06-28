/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CodeListComponent } from './code-list.component';

describe('CodeListComponent', () => {
  let component: CodeListComponent;
  let fixture: ComponentFixture<CodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
