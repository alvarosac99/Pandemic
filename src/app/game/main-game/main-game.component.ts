
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CargarJsonService } from '../cargar-json.service'
interface City {
  name: string;
  id: number;
  coords: [number, number];
  neighbors: string[];
}

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
})
export class MainGameComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapImage', { static: false }) mapImage!: ElementRef;

  scale = 1;
  lastX = 0;
  lastY = 0;
  isDragging = false;
  cities: City[] = [];
  cityElements: any[] = [];

  constructor(private cargarJsonService: CargarJsonService) { }

  ngOnInit(): void {

    this.cargarJsonService.getCitiesData().subscribe(
      (data: City[]) => {
        this.cities = data;
        this.createCityElements();
      },
      (error) => {
        console.error('Error al cargar las ciudades:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    if (this.mapContainer && this.mapImage) {
      this.mapContainer.nativeElement.addEventListener('wheel', this.onWheel.bind(this));
      this.mapContainer.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
      this.mapContainer.nativeElement.addEventListener('mousemove', this.onMouseMove.bind(this));
      this.mapContainer.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));
      this.mapContainer.nativeElement.addEventListener('mouseleave', this.onMouseUp.bind(this))
    } else {
      console.error('ERROR: no existen los elementos');
    }
  }

  createCityElements() {
    const container = this.mapContainer.nativeElement;


    this.cities.forEach((city) => {

      const circle = document.createElement('div');
      circle.classList.add('city-circle');
      circle.style.position = 'absolute';
      circle.style.left = `${city.coords[0]}px`;
      circle.style.top = `${city.coords[1]}px`;
      circle.style.transform = `scale(${this.scale})`;


      const label = document.createElement('span');
      label.classList.add('city-label');
      label.innerText = city.name;
      circle.appendChild(label);

      container.appendChild(circle);
      this.cityElements.push({ city, circle });


      city.neighbors.forEach((neighborName: string) => {
        const neighbor = this.cities.find((c) => c.name === neighborName);
        if (neighbor) {
          this.connectCities(city, neighbor);
        }
      });
    });
  }

  connectCities(city1: City, city2: City): void {
    const line: HTMLDivElement = document.createElement('div');
    line.classList.add('connection-line');

    const x1 = city1.coords[0];
    const y1 = city1.coords[1];
    const x2 = city2.coords[0];
    const y2 = city2.coords[1];

    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    line.style.position = 'absolute';
    line.style.width = `${distance}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;


    this.mapContainer.nativeElement.appendChild(line);
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();

    const rect = this.mapContainer.nativeElement.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    let newScale = this.scale - event.deltaY * 0.01;
    newScale = Math.min(Math.max(0.125, newScale), 4);

    const scaleRatio = newScale / this.scale;


    this.cityElements.forEach(({ city, circle }) => {
      circle.style.transform = `scale(${newScale})`;
    });


    this.scale = newScale;
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    event.preventDefault();

    const deltaX = event.clientX - this.lastX;
    const deltaY = event.clientY - this.lastY;


    const mapImage = this.mapImage.nativeElement;
    const currentTransform = mapImage.style.transform;
    const translateRegex = /translate\((-?\d+)px, (-?\d+)px\)/;
    const matches = currentTransform.match(translateRegex);
    let currentTranslateX = 0;
    let currentTranslateY = 0;
    if (matches) {
      currentTranslateX = parseInt(matches[1], 10);
      currentTranslateY = parseInt(matches[2], 10);
    }

    const newTranslateX = currentTranslateX + deltaX;
    const newTranslateY = currentTranslateY + deltaY;

    mapImage.style.transform = `scale(${this.scale}) translate(${newTranslateX}px, ${newTranslateY}px)`;

    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
  }
}
