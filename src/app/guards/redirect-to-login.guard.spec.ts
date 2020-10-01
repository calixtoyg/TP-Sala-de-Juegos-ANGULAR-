import {TestBed} from '@angular/core/testing';

import {RedirectToLoginGuard} from './redirect-to-login.guard';

describe('RedirectToLoginGuard', () => {
  let guard: RedirectToLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectToLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
