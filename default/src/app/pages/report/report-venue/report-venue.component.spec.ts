/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportVenueComponent } from './report-venue.component';

describe('ReportVenueComponent', () => {
  let component: ReportVenueComponent;
  let fixture: ComponentFixture<ReportVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
