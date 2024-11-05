import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

  constructor(private router: Router) { }

  goToVersion() {
    this.router.navigate(['menu/version'])//TABIEN
  }
  goToAutores() {
    this.router.navigate(['menu/autores'])//TABIEN
  }
  goToRanking() {
    this.router.navigate(['menu/ranking'])
  }
  goToInformacion() {
    this.router.navigate(['menu/informacion'])//TABIEN
  }
  goToCargar() {
    this.router.navigate(['menu/cargar'])
  }
  goToNueva() {
    this.router.navigate(['menu/nueva'])
  }

}
