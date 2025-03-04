import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, NgIf, MatSidenavModule, MatListModule, MatIconModule,],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "PANDEMIC";

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

  showButton: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    //asigna true al boolean de arriba cuando la ruta en la que se encuentra el cliente es una de las incluidas en el array
    this.router.events.subscribe(() => {
      const allowedRoutes = ['/menu/autores', '/menu/version', '/menu/informacion', '/menu/perfil'];
      this.showButton = allowedRoutes.includes(this.router.url);
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateContentClass(event.urlAfterRedirects);
      }
    });

    //NO es ni seguro ni correcto hacer esto aquí

    //if (this.authService.isAuthenticated()) {
    //  this.router.navigate(['auth/menu']);
    //} else {
    //  this.router.navigate(['auth/login']);
    //}
  }

  updateContentClass(url: string) {
    const contentElement = document.querySelector('.content');

    if (contentElement) {
      contentElement.classList.remove('main-content', 'game-content');

      if (url === '/game/inGame') {
        contentElement.classList.add('game-content')
      } else {
        contentElement.classList.add('main-content');
      }
    }
  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   $event.returnValue = true;
  // }
}