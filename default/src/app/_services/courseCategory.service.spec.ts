/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourseCategoryService } from './courseCategory.service';

describe('Service: CourseCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseCategoryService]
    });
  });

  it('should ...', inject([CourseCategoryService], (service: CourseCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
