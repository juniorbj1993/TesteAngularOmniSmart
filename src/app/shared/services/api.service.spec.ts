import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './api.service';

describe('api teste', () => {
  let service: UserService;
  let http: HttpClient;
  beforeEach(() => {
    service = new UserService(http);
  });


  it('testando api', () => {
    let resultado = service.testApi();
    expect(service).toBeDefined();
    expect(resultado).toEqual("passou")
  });
});
