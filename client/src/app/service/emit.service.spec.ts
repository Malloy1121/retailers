import { TestBed, inject } from '@angular/core/testing';

import { EmitService } from './emit.service';

describe('EmitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmitService]
    });
  });

  it('should ...', inject([EmitService], (service: EmitService) => {
    expect(service).toBeTruthy();
  }));
});
