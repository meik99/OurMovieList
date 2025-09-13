import { TestBed } from '@angular/core/testing';

import { ApiGroupService } from './api-group-service';

describe('ApiGroupService', () => {
  let service: ApiGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
