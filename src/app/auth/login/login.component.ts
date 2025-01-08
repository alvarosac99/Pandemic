import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel, MatHint } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatLabel, MatButtonModule, FormsModule, MatCheckbox],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class LoginComponent {

  constructor(private router: Router, private auth: AuthService) { }


  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.router.navigate(['/menu']);
    }
  }

  onSubmit(form: NgForm) {

    //this.marcarTodosLosCampos(form);  PROBABLEMENTE NO SIRVA PARA NADA PERO POR PROBAR...

    if (form.valid) {
      //A partir de aqui: Todo lo que sucede tras un registro exitoso :)
      const usuario: Usuario = {
        username: form.value['username'],
        password: form.value['password'],
        email: null
      }

      const rememberMe = form.value['recordar']; //

      this.auth.login(usuario).subscribe(
        response => {
          if (response) {
            console.log('Inicio de sesión exitoso');

            if (rememberMe) {
              localStorage.setItem('usuario', JSON.stringify(usuario));
            }

            form.reset();
            this.router.navigate(['/menu']);
          } else {
            console.error('Error en el login');
          }
        },
        error => {
          console.error('Error en el login', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}