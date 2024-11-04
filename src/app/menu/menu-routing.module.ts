import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from './menu.module';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';

const routes: Routes = [
  { path: '', component: MenuPrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
