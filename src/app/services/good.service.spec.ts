import { TestBed } from '@angular/core/testing';

import { GoodService } from './good.service';

describe('GoodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoodService = TestBed.get(GoodService);
    expect(service).toBeTruthy();
  });
});
