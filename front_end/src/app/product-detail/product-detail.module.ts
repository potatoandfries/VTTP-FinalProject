
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { ProductDetailRoutes } from './product-detail.routes';
import { RelatedComponent } from './related/related.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductDetailRoutes),
    ReactiveFormsModule,
    
  ],
  declarations: [ProductDetailComponent, RelatedComponent],
  providers: []
})
export class ProductDetailModule {
}
