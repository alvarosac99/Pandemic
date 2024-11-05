import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  passwordMismatch: boolean = false;

  constructor(private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const password = form.value['password'];
      const confirmPassword = form.value['confirmPassword'];

      if (password !== confirmPassword) {
        this.passwordMismatch = true;
        return; // No continuar si las contraseñas no coinciden
      } else {
        this.passwordMismatch = false; // Resetea el error si coinciden
      }

      console.log('Registro exitoso', form.value);
      form.reset();
      this.router.navigate(['/auth/login'])
    } else {
      console.log('Formulario inválido');
    }
  }
}
