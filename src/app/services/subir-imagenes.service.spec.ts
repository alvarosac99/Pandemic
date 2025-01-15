import { TestBed } from '@angular/core/testing';

import { SubirImagenesService } from './subir-imagenes.service';

describe('SubirImagenesService', () => {
  let service: SubirImagenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirImagenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
