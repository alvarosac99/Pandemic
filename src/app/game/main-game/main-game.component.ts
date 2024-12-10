import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
})
export class MainGameComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapImage', { static: false }) mapImage!: ElementRef;

  cityElements: any[] = [];

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.http.get<any[]>('game/ciudades.json').subscribe({
      next: (data) => {
        this.renderCities(data);
      },
      error: (err) => {
        console.error('Error al cargar el archivo JSON', err);
      },
    });
  }

  renderCities(cities: any[]): void {
    const mapImageElement = this.mapImage.nativeElement as HTMLImageElement;
    const mapContainerElement = this.mapContainer.nativeElement as HTMLElement;

    mapImageElement.onload = () => this.placeCities(cities, mapImageElement, mapContainerElement);
    this.placeCities(cities, mapImageElement, mapContainerElement);
  }

  placeCities(cities: any[], mapImage: HTMLImageElement, mapContainer: HTMLElement): void {

    cities.forEach((city) => {
      const x = city.coords[0];
      const y = city.coords[1];

      //MARCADOR
      const circle = document.createElement('div');
      circle.className = 'city-marker';
      circle.style.position = 'absolute';
      circle.style.left = `${x -95}px`;
      circle.style.top = `${y -95}px`;
      circle.style.width = '10px';
      circle.style.height = '10px';
      circle.style.backgroundColor = 'red';
      circle.style.borderRadius = '50%';

      //NOMBRE CIUDAD
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

      //se guarda la info por si hay que modificarla (Ej: cambiar color del circulo cuando esté en peligro o tal)
      this.cityElements.push({ name: city.name, circle });
    });
  }
}