import { TestBed } from '@angular/core/testing';

import { NodemcuApiService } from './nodemcu-api.service';

describe('NodemcuApiService', () => {
  let service: NodemcuApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodemcuApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
