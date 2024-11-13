import { TestBed } from '@angular/core/testing';

import { CargarJsonService } from './cargar-json.service';

describe('CargarJsonService', () => {
  let service: CargarJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
