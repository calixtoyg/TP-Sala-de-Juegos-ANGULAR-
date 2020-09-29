import { TestBed } from '@angular/core/testing';

import { RoutingToLoginService } from './routing-to-login.service';

describe('RoutingToLoginService', () => {
  let service: RoutingToLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutingToLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
