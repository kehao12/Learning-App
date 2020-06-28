/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomValidateService } from './custom-validate.service';

describe('Service: CustomValidate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomValidateService]
    });
  });

  it('should ...', inject([CustomValidateService], (service: CustomValidateService) => {
    expect(service).toBeTruthy();
  }));
});
