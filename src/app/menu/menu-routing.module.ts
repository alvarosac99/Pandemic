import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { AutoresComponent } from './autores/autores.component';
import { VersionComponent } from './version/version.component';
import { InfoComponent } from './info/info.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', component: MenuPrincipalComponent },
  { path: 'autores', component: AutoresComponent },
  { path: 'version', component: VersionComponent },
  { path: 'informacion', component: InfoComponent },
  { path: 'perfil', component: PerfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
