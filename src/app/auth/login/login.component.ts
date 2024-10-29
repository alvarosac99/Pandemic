import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel, MatHint } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatLabel, MatHint, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(private router: Router) { }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
