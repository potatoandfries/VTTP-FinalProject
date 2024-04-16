import { Component, OnInit } from '@angular/core';
import { Carausel } from '../../configurations/model';
import { config } from '../../configurations/local'; 
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements OnInit {
  carausel: Carausel[] = [];
  currentSlide = 0;

  constructor() {}

  ngOnInit() {
    this.carausel = config.carausel;
  }

  nextSlide() {
    const container = document.querySelector('.cards-container');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' }); // Scroll by the width of one card
    }
  }
  
  previousSlide() {
    const container = document.querySelector('.cards-container');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' }); // Scroll by the width of one card
    }
  }
  

  // nextSlide() {
  //   this.currentSlide = (this.currentSlide + 1) % this.carausel.length;
  // }

  // previousSlide() {
  //   this.currentSlide = (this.currentSlide - 1 + this.carausel.length) % this.carausel.length;
  // }
}
