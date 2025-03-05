import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private insertarUserUrl = 'insertar_usuario.php';
  private comprobarUserUrl = 'comprobar_usuario.php';
  private apiUrl = 'http://localhost/';

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  register(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl + this.insertarUserUrl, JSON.stringify(usuario));
  }

  // Método para iniciar sesión
  login(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl + this.comprobarUserUrl, JSON.stringify(usuario));
  }

  // Método para guardar el usuario en el localStorage (tras un login exitoso)
  setSession(usuario: Usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  // Método para verificar si el usuario está autenticado (si está en el localStorage)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuario');
  }

  // Método para obtener el usuario desde el localStorage
  getUser(): Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  // Método para obtener especificamente el nombre de usuario
  getUserName(): String {
    return this.getUser()?.username || 'Invitado';
  }

  // Método para cerrar sesión (eliminar del localStorage)
  logout(): void {
    localStorage.removeItem('usuario');
  }
}
