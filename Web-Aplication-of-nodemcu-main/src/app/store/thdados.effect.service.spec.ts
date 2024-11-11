import { TestBed } from '@angular/core/testing';

import { ThdadosEffectService } from './thdados.effect.service';

describe('ThdadosEffectService', () => {
  let service: ThdadosEffectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThdadosEffectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
