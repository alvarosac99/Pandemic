import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from './menu.module';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { AutoresComponent } from './autores/autores.component';

const routes: Routes = [
  { path: '', component: MenuPrincipalComponent },
  { path: 'autores', component: AutoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
