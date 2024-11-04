import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    { path: '', component: MainComponent }, // Ruta para la pagina principal
    { path: 'login', component: LoginComponent }, //Ruta para el login
    { path: 'register', component: RegisterComponent }, //Ruta para el register
    { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)},
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
    //{ path: '**', component: NotFoundComponent } // Ruta 404
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
