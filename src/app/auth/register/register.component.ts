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
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2'

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
  authService: any;


  constructor(private router: Router, private auth: AuthService) { }

  onSubmit(form: NgForm) {
    console.log(this.passwordMismatch);

    //this.marcarTodosLosCampos(form);  PROBABLEMENTE NO SIRVA PARA NADA PERO POR PROBAR...

    if (form.valid) {
      const password = form.value['password'];
      const confirmPassword = form.value['confirmPassword'];

      console.log(password);
      console.log(confirmPassword);

      if (password !== confirmPassword) {
        this.passwordMismatch = true;

        form.controls['confirmPassword']?.markAsTouched();   //Marca la casilla de Confirmar contraseña como touched
        console.log('Las contraseñas no coinciden');

        return; // No continuar si las contraseñas no coinciden
      } else {
        //console.log("muymal");

        this.passwordMismatch = false; // Resetea el error si coinciden

        //A partir de aqui: Todo lo que sucede tras un registro exitoso :)
        const usuario: Usuario = {
          username: form.value['username'],
          password: form.value['password'],
          email: form.value['email']
        }

        this.auth.register(usuario).subscribe(
          response => {
            if (response.status = 'succes') {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              console.log('Registro exitoso', response);
              form.reset();
              this.router.navigate(['/auth/login']);
            } else {
              console.error('Error en el registro');
            }
          },
          error => {
            console.error('Error en el registro', error);
          }
        );

        Swal.fire({
          backdrop: "true",
          position: "center",
          icon: "success",
          title: "Usuario registrado correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Registro exitoso');
        form.reset();
        this.router.navigate(['/auth/login']);
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