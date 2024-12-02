import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit {

 randomNumber: number = 0;

  ngOnInit(): void {
    this.randomNumber = Math.floor(Math.random() * 10)
  }

}
