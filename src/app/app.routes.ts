import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: MainComponent }, // Ruta para la pagina principal
    { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) }, //Ruta para el perfil
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, //Ruta para el login o register
    { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) }, //Ruta para el menú
    { path: 'game', loadChildren: () => import('./game/game.module').then(m => m.GameModule) }, //Ruta para el juego
    { path: '**', component: NotFoundComponent } // Ruta error 404
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
