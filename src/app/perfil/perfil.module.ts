import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from '../menu/perfil/perfil.component';
import { ImageCropperComponent } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    ImageCropperComponent
  ],
  exports: [
    PerfilComponent,
  ]
})
export class PerfilModule { }
