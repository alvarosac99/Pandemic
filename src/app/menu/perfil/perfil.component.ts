import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ImagenPerfilComponent } from './imagen-perfil/imagen-perfil.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  userName: String;

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.userName = this.authService.getUserName();
  }

  abrirCambioImagen(): void {
    const dialogRef = this.dialog.open(ImagenPerfilComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }
}
