import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "PANDEMIC";
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
