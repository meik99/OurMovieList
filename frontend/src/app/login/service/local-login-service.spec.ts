import { TestBed } from '@angular/core/testing';

import { LocalLoginService } from './local-login-service';

describe('LocalLoginService', () => {
  let service: LocalLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
