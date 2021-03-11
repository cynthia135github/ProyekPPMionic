import { TestBed } from '@angular/core/testing';

import { GlobalakunService } from './globalakun.service';

describe('GlobalakunService', () => {
  let service: GlobalakunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalakunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
