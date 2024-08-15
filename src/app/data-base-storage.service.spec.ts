import { TestBed } from '@angular/core/testing';

import { DataBaseStorageService } from './data-base-storage.service';

describe('DataBaseStorageService', () => {
  let service: DataBaseStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBaseStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
