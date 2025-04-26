import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonService); // Crea instancia del servicio.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();// Verifica que el servicio existe.
  });
});
