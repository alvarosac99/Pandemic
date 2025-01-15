import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenesService {

  private apiUrl = 'http://localhost/';
  private uploadImageUrl = 'subirFotoDePerfil.php';

  constructor(private http: HttpClient) { }

  // Método para subir la imagen
  uploadImage(image: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('foto', image, 'fotoPerfil.png'); 

    return this.http.post(this.apiUrl + this.uploadImageUrl, formData);
  }
}
