import { Component } from '@angular/core';
import { ImageCropperComponent,ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-imagen-perfil',
  standalone: true,
  imports: [ImageCropperComponent],
  templateUrl: './imagen-perfil.component.html',
  styleUrls: ['./imagen-perfil.component.css']
})
export class ImagenPerfilComponent {
  imageChangedEvent: any = '';
  croppedImage: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    if (event.base64) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.base64);
    } else {
      console.error('No se ha recibido un valor base64 válido.');
    }
  }

  imageLoaded(image: LoadedImage): void {
    console.log('Imagen cargada', image);
  }

  cropperReady(): void {
    console.log('Cropper listo');
  }

  loadImageFailed(): void {
    console.error('Error al cargar la imagen');
  }

  uploadImage(): void{
    
  }
}
