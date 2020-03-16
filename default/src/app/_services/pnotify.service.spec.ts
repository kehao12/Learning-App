/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PnotifyService } from './pnotify.service';

describe('Service: Pnotify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PnotifyService]
    });
  });

  it('should ...', inject([PnotifyService], (service: PnotifyService) => {
    expect(service).toBeTruthy();
  }));
});
