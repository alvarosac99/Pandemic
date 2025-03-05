import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { MainGameComponent } from './main-game/main-game.component'; // Asegúrate de importar tu componente

@NgModule({
  declarations: [
    MainGameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
