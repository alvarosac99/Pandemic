import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGameComponent } from './main-game/main-game.component';

const routes: Routes = [
  { path: 'inGame', component: MainGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
