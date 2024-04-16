import { BannerComponent } from './banner/banner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { NewlyAddedComponent } from './newly-added/newly-added.component';
import { MostSellingComponent } from './most-selling/most-selling.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MatCardModule,
    MatButtonModule,
    MatIcon
    
  ],
  declarations: [
    HomeComponent,
    NewlyAddedComponent,
    MostSellingComponent,
    ImageSliderComponent,
    BannerComponent
  ]
})
export class HomeModule {
}
