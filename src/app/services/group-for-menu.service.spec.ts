import {TestBed} from '@angular/core/testing';

import {GroupForMenuService} from './group-for-menu.service';

describe('GroupForMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupForMenuService = TestBed.get(GroupForMenuService);
    expect(service).toBeTruthy();
  });
});
