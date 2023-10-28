import { TestBed } from '@angular/core/testing';

import { VideogamesService } from './videogames.service';

describe('VideogamesService', () => {
  let service: VideogamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideogamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
