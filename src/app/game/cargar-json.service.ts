import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarJsonService {

  constructor(private http: HttpClient) { }
  getCitiesData(): Observable<any> {
    return this.http.get<any>('game/ciudades.json');
  }
}
