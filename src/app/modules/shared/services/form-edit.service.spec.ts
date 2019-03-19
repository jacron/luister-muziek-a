import { TestBed } from '@angular/core/testing';

import { FormEditService } from './form-edit.service';

describe('FormEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormEditService = TestBed.get(FormEditService);
    expect(service).toBeTruthy();
  });
});
