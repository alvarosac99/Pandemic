import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatHint } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormField, MatLabel, MatHint],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

}
