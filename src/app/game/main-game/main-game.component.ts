import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
})
export class MainGameComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapImage', { static: false }) mapImage!: ElementRef;
  @ViewChild('canvasOverlay', { static: false }) canvasOverlay!: ElementRef;
  @ViewChild('cityInfoDiv', { static: false }) cityInfoDiv!: ElementRef;

  cities: any[] = []; 
  cityElements: any[] = [];
  selectedCity: any = null;

  
  readonly INFECTION_LEVELS = ['a salvo', 'nivel 1', 'nivel 2', 'nivel 3'];

  
  currentRound: number = 1; 
  roundAction: string = '';  
  gameOver = false;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.loadCities();
  }
  
  loadCities(): void {
    this.http.get<any[]>('game/ciudades.json').subscribe({
      next: (data) => {
        this.cities = data.map(city => ({
          ...city,  
          state: 'a salvo',  
          infectionRounds: 0,  
          population: city.poblacion,  
        }));

        for (let i = 0; i < 4; i++) {
          const randomCity = this.cities[Math.floor(Math.random() * this.cities.length)];
          randomCity.state = 'nivel 1';
          randomCity.infectionRounds = 1;  
        }

        this.renderCities();
        this.drawConnections();
      },
      error: (err) => {
        console.error('Error al cargar el archivo JSON', err);
      },
    });
  }

  nextRound(): void {
    if (this.gameOver) return;

    this.roundAction = `Ronda ${this.currentRound}: La infección sigue propagándose.`;

    let newlyInfected = [];

    this.cities.forEach((city) => {
      if (city.state !== 'a salvo') {
        
        city.infectionRounds++;

        const currentLevel = this.INFECTION_LEVELS.indexOf(city.state);
        if (currentLevel < 3 && city.infectionRounds >= 3) { 
          city.state = this.INFECTION_LEVELS[currentLevel + 1];
        }

        this.decreasePopulation(city);

        if (city.state === 'nivel 2' || city.state === 'nivel 3') {
          
          const neighbors = this.cities.filter(neighbor =>
            city.neighbors.includes(neighbor.name) && neighbor.state === 'a salvo'
          );

          if (neighbors.length > 0) {
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            randomNeighbor.state = 'nivel 1';  
            randomNeighbor.infectionRounds = 1; 
            newlyInfected.push(randomNeighbor);
          }
        }
      }
    });

    if (this.cities.every(city => city.state === 'nivel 3')) {
      this.gameOver = true;
      this.roundAction = '¡Perdiste! Todas las ciudades han perdido su población.';
    }

    if (this.cities.every(city => city.population <= 0)) {
      this.gameOver = true;
      this.roundAction = '¡Perdiste! Todas las ciudades han perdido su población.';
    }

    
    this.updateCityMarkers();
    this.drawConnections();

    
    if (!this.gameOver) {
      this.currentRound++;
    }
  }

  
  decreasePopulation(city: any): void {
    let populationDecrease = 0;
    switch (city.state) {
      case 'nivel 1':
        populationDecrease = Math.floor(city.population * 0.05); 
        break;
      case 'nivel 2':
        populationDecrease = Math.floor(city.population * 0.1); 
        break;
      case 'nivel 3':
        populationDecrease = Math.floor(city.population * 0.2); 
        break;
    }

    city.population -= populationDecrease;
    if (city.population < 0) city.population = 0; 
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

  drawConnections(): void {
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
}
