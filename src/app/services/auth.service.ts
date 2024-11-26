import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private insertarUserUrl = 'insertar_usuario.php'
  private comprobarUserUrl = 'comprobar_usuario.php'
  private apiUrl = 'http://localhost/';

  constructor(private http: HttpClient) { }

  register(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl + this.insertarUserUrl, JSON.stringify(usuario))
  }

  login(usuario: Usuario): Observable<any>{
    return this.http.post(this.apiUrl + this.comprobarUserUrl, JSON.stringify(usuario))
  }
}
