import { TestBed, inject } from '@angular/core/testing';

import { GotWikiService } from './got-wiki.service';

describe('GotWikiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GotWikiService]
    });
  });

  it('should be created', inject([GotWikiService], (service: GotWikiService) => {
    expect(service).toBeTruthy();
  }));
});
