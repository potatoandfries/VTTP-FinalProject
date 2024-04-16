import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';
import { FaqRoutes } from './faq.routes';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FaqRoutes),
    MatExpansionModule

  ],
  declarations: [FaqComponent]
})
export class FaqModule {
}
