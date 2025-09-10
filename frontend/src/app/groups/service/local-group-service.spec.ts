import { TestBed } from '@angular/core/testing';

import { LocalGroupService } from './local-group-service';

describe('LocalGroupService', () => {
  let service: LocalGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
