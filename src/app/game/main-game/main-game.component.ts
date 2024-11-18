
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
})
export class MainGameComponent {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapImage', { static: false }) mapImage!: ElementRef;

  scale = 1;
  lastX = 0;
  lastY = 0;
  isDragging = false;
  cityElements: any[] = [];


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
