import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

}
