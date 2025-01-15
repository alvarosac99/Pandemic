import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ImagenPerfilComponent } from './imagen-perfil/imagen-perfil.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(public dialog: MatDialog) { }

  abrirCambioImagen(): void {
    const dialogRef = this.dialog.open(ImagenPerfilComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }
}
