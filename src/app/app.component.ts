import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, NgIf, MatSidenavModule, MatListModule, MatIconModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "PANDEMIC";

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateContentClass(event.urlAfterRedirects);
      }
    });
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
}
