import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
})
export class MainGameComponent implements AfterViewInit {
  //Se añade los componentes del html para ir modificandolos con el transcurso del juego
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapImage', { static: false }) mapImage!: ElementRef;
  @ViewChild('canvasOverlay', { static: false }) canvasOverlay!: ElementRef;
  @ViewChild('cityInfoDiv', { static: false }) cityInfoDiv!: ElementRef;

  cities: any[] = [];
  cityElements: any[] = [];
  selectedCity: any = null;

  //Constantes para nombrar las infecciones, el num es para mapearlo con su correspondiente vacuna
  readonly INFECTIONS = [
    { name: 'Virus A', color: 'blue', num: 0 },
    { name: 'Virus B', color: 'green', num: 1 },
    { name: 'Virus C', color: 'yellow', num: 2 },
    { name: 'Virus D', color: 'red', num: 3 }
  ];

  currentRound: number = 1;
  roundAction: string = '';
  gameOver = false;
  actionsRemaining: number = 4;
  config = {
    ciudadesPochasInicio: 4,
    infectedCitiesPerRound: 2,
  };

  vacunas: any[] = [];

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.loadCities();
    this.loadvacunas();
  }

  infeccionAleatoria(): any {
    return this.INFECTIONS[Math.floor(Math.random() * this.INFECTIONS.length)];
  }

  loadCities(): void {
    this.http.get<any[]>('game/ciudades.json').subscribe({ //Recorre el json
      next: (data) => {
        this.cities = data.map(city => ({
          ...city,
          state: 'a salvo',
          outbreaks: 0,
          population: city.poblacion,
          infectionType: null, //asigna valores extra para el funcionamiento del juego
        }));

        for (let i = 0; i < this.config.ciudadesPochasInicio; i++) { //por cada ciudad de inicio le aplica una infeccion aleatoria
          const randomCity = this.cities[Math.floor(Math.random() * this.cities.length)];
          if (!randomCity.infectionType) {
            randomCity.state = 'nivel 1';
            randomCity.infectionType = this.infeccionAleatoria();
          }
        }

        this.renderCities();
        this.conexiones();
      },
      error: (err) => {
        console.error('Error al cargar el archivo JSON', err);
      },
    });
  }

  loadvacunas(): void { //se cargan las vacunas a la memoria como un array
    this.vacunas = [
      { name: 'Vacuna Virus A', color: 'blue', progreso: 0, cantidad: 0, type: 'A' },
      { name: 'Vacuna Virus B', color: 'green', progreso: 0, cantidad: 0, type: 'B' },
      { name: 'Vacuna Virus C', color: 'yellow', progreso: 0, cantidad: 0, type: 'C' },
      { name: 'Vacuna Virus D', color: 'red', progreso: 0, cantidad: 0, type: 'D' },
    ];
  }


  nextRound(): void { // Pasamos ronda
    if (this.gameOver) return; // si hemos perdido no hace nada

    this.actionsRemaining = 4;

    this.roundAction = `Ronda ${this.currentRound}: La infección sigue propagándose.`;

    const maxInfectionsPerRound = 1;

    this.cities.forEach((city) => { //por cada ciudad comienza a aumentar el nivel de infeccion
      if (city.state !== 'a salvo') {

        if (city.state === 'nivel 1') {
          city.state = 'nivel 2';
        } else if (city.state === 'nivel 2') {
          city.state = 'nivel 3';
        }

        //por cada ciudad que ya esté infectada comienza a propagar
        if (city.state === 'nivel 1' || city.state === 'nivel 2' || city.state === 'nivel 3') {
          let infectedThisRound = 0;

          city.neighbors.forEach((neighbor: any) => { //Por cada vecino de esa ciudad
            if (infectedThisRound < maxInfectionsPerRound) {
              const neighborCity = this.cities.find(c => c.name === neighbor); //recorre el array y coge uno para infectarla
              if (neighborCity && neighborCity.state === 'a salvo') {

                if (Math.random() < 0.5) {
                  const newInfection = this.infeccionAleatoria();

                  neighborCity.state = 'nivel 1';
                  neighborCity.infectionType = newInfection;
                  neighborCity.outbreaks += 1;
                  infectedThisRound++;
                }
              }
            }
          });
        }
      }
    });


    if (this.cities.every(city => city.state === 'nivel 3' || city.state === 'vacunada')) {
      this.gameOver = true;
      this.roundAction = '¡Perdiste! Todas las demás ciudades han sido infectadas';
      this.perdiste(this.roundAction)
    }

    if (this.cities.every(city => city.state === 'nivel 3')) {
      this.gameOver = true;
      this.roundAction = '¡Perdiste! Todas las ciudades han sido infectadas.';
      this.perdiste(this.roundAction)
    }


    if (this.cities.every(city => city.population <= 0)) {
      this.gameOver = true;
      this.roundAction = '¡Perdiste! Todas las ciudades han perdido su población.';
      this.perdiste(this.roundAction)
    }

    if (!this.gameOver) {
      this.currentRound++;
    }

    this.updateCityMarkers();
    this.conexiones();
  }

  perdiste(mensaje: String){
    Swal.fire({
          backdrop: "true",
          position: "center",
          icon: "error",
          title: mensaje,
          showConfirmButton: false,
          timer: 100000000
        });
  }

  updateCityMarkers(): void {
    this.cities.forEach(city => {
      const cityElement = this.cityElements.find(e => e.name === city.name);
      if (cityElement) {
        const marker = cityElement.element as HTMLElement;
        marker.style.backgroundColor = this.getCityColor(city);
      }
    });
  }

  getCityColor(city: any): string {
    switch (city.state) {
      case 'a salvo':
        return 'green';
      case 'nivel 1':
        return 'yellow';
      case 'nivel 2':
        return 'orange';
      case 'nivel 3':
        return 'red';
      case 'vacunada':
        return 'blue';
      default:
        return 'gray';
    }
  }

  renderCities(): void {
    const mapContainerElement = this.mapContainer.nativeElement as HTMLElement;
    this.placeCities(mapContainerElement);
  }

  placeCities(mapContainer: HTMLElement): void {
    this.cities.forEach((city) => {
      const x = city.coords[0];
      const y = city.coords[1];

      const circle = document.createElement('div');
      circle.className = 'city-marker';
      circle.style.position = 'absolute';
      circle.style.left = `${x - 95}px`;
      circle.style.top = `${y - 95}px`;
      circle.style.width = '10px';
      circle.style.height = '10px';
      circle.style.backgroundColor = this.getCityColor(city);
      circle.style.borderRadius = '50%';
      circle.style.cursor = 'pointer';
      circle.addEventListener('click', () => {
        this.selectedCity = city;
      });

      const label = document.createElement('span');
      label.className = 'city-label';
      label.innerText = city.name;
      label.style.position = 'absolute';
      label.style.top = '-20px';
      label.style.left = '5px';
      label.style.color = 'white';
      label.style.fontSize = '12px';
      label.style.textShadow = '1px 1px 2px black';

      circle.appendChild(label);
      mapContainer.appendChild(circle);

      this.cityElements.push({ name: city.name, element: circle });
    });
  }

  conexiones(): void {
    const canvas = this.canvasOverlay.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = this.mapImage.nativeElement.width;
      canvas.height = this.mapImage.nativeElement.height;

      this.cities.forEach((city) => {
        const cityCoords = city.coords;
        const cityX = cityCoords[0] - 95;
        const cityY = cityCoords[1] - 95;

        city.neighbors.forEach((neighborName: string) => {
          const neighbor = this.cities.find(c => c.name === neighborName);
          if (neighbor) {
            const neighborCoords = neighbor.coords;
            const neighborX = neighborCoords[0] - 95;
            const neighborY = neighborCoords[1] - 95;
            ctx.beginPath();
            ctx.moveTo(cityX, cityY);
            ctx.lineTo(neighborX, neighborY);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 0.2;
            ctx.stroke();
          }
        });
      });
    }
  }


  cureCity(city: any, vacuna: any): void {
    if (vacuna.cantidad > 0 && city.state !== 'a salvo' && city.infectionType) {
      const virusName = city.infectionType.name;
      const vacunaName = vacuna.name.replace('Vacuna ', '');

      if (virusName === vacunaName) {
        city.state = 'vacunada';
        city.infectionType = null;
        vacuna.cantidad--;


        this.roundAction = `${city.name} ha sido vacunada con éxito. Vacunas restantes de ${vacuna.name}: ${vacuna.cantidad}`;
      } else {
        this.roundAction = `Error: ${vacuna.name} no es efectiva contra ${virusName}.`;
      }
    } else {
      this.roundAction = `${city.name} no puede ser vacunada o no hay vacunas disponibles.`;
    }


    this.updateCityMarkers();
  }



  investigarVacuna(vacuna: any): void {
    if (this.actionsRemaining <= 0 || vacuna.progreso === 100) {
      return;
    }

    vacuna.progreso += 25;
    if (vacuna.progreso > 100) {
      vacuna.progreso = 100;
    }

    this.actionsRemaining--;
    this.roundAction = `Investigando ${vacuna.name}... Progreso: ${vacuna.progreso}%`;


    if (vacuna.progreso === 100) {
      this.roundAction = `${vacuna.name} está lista para ser fabricada.`;
    }
  }

  createvacuna(vacuna: any): void {
    if (this.actionsRemaining <= 0) return;


    if (vacuna.progreso === 100) {
      vacuna.cantidad = (vacuna.cantidad || 0) + 1;
      this.actionsRemaining--;
      this.roundAction = `Creando ${vacuna.name}... Ahora tienes ${vacuna.cantidad} disponibles.`;
    } else {
      this.roundAction = `${vacuna.name} no está lista para fabricación.`;
    }
  }
}