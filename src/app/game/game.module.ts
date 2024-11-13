// game.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // IMPORTAR HttpClientModule
import { MainGameComponent } from './main-game/main-game.component'; // Importar tu componente
import { CargarJsonService } from './cargar-json.service'; // Importar tu servicio

@NgModule({
  declarations: [
    MainGameComponent, // Declara el componente del juego
  ],
  imports: [
    CommonModule,
    HttpClientModule, // Aquí importa el HttpClientModule para usarlo en este módulo
  ],
  providers: [CargarJsonService],  // Asegúrate de que el servicio esté disponible
})
export class GameModule { }
