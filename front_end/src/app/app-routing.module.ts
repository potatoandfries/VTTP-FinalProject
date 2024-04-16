import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GPageNotFoundComponent } from './g-page-not-found/g-page-not-found.component';


const routes: Routes = [ 
{ path: 'not-found', component: GPageNotFoundComponent, data: { message: 'Page not found!' } },
{ path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
{ path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
{ path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
{ path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
{ path: '**', redirectTo: '/not-found' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
