import { TestBed, async, inject } from '@angular/core/testing';

import { OwnGuard } from './own.guard';

describe('OwnGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnGuard]
    });
  });

  it('should ...', inject([OwnGuard], (guard: OwnGuard) => {
    expect(guard).toBeTruthy();
  }));
});
