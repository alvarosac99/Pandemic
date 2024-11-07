import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RegisterComponent {

  passwordMismatch: boolean = false;

  constructor(private router: Router) { }

  onSubmit(form: NgForm) {

    //this.marcarTodosLosCampos(form);  PROBABLEMENTE NO SIRVA PARA NADA PERO POR PROBAR...

    if (form.valid) {
      const password = form.value['password'];
      const confirmPassword = form.value['confirmPassword'];

      if (password !== confirmPassword) {
        this.passwordMismatch = true;

        form.controls['confirmPassword']?.markAsTouched();   //Marca la casilla de Confirmar contraseña como touched
        console.log('Las contraseñas no coinciden');

        return; // No continuar si las contraseñas no coinciden
      } else {
        this.passwordMismatch = false; // Resetea el error si coinciden

        //A partir de aqui: Todo lo que sucede tras un registro exitoso :)
        console.log('Registro exitoso', form.value);
        form.reset();
        this.router.navigate(['/auth/login'])
      }
    } else {
      console.log('Formulario inválido');
    }



  }

  // Marca todos los controles como touched
  private marcarTodosLosCampos(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
