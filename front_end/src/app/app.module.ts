import { NgModule, effect } from "@angular/core";
import { AppComponent } from "./app.component";
import { GPageNotFoundComponent } from "./g-page-not-found/g-page-not-found.component";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderModule } from "./header/header.module";
import { HomeModule } from "./home/home.module";
import { BrowseModule } from "./browse/browse.module";
import { ProductDetailModule } from "./product-detail/product-detail.module";
import { VerificationModule } from "./verification/verification.module";
import { SearchModule } from "./search/search.module";
import { FooterModule } from "./footer/footer.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { reducers } from "./store/app.reducer";
import { ShowcaseEffects } from "./store/showcase/showcase.effects";
import { AppRoutingModule } from "./app-routing.module";
import { CartEffects } from "./store/cart/cart.effects";
import { AuthEffects } from "./store/auth/auth.effects";
import { OrderEffects } from "./store/order/order.effects";
import { BrowseEffects } from "./store/browse/browse.effects";
import { ProductService } from "./services/product.service";
import { AccountService } from "./services/account.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { CartService } from "./services/cart.service";
import { OrderService } from "./services/order.service";
import { EffectsModule } from "@ngrx/effects";
import { AuthModule } from "./auth/auth.module";
import { TokenInterceptor } from "./services/token.interceptor";
import { TokenService } from "./services/token.service";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { NonAuthGuardService } from "./services/non-auth-guard.service";


@NgModule({
  declarations: [
    AppComponent,
    GPageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    HomeModule,
    BrowseModule,
    ProductDetailModule,
    FormsModule,
    VerificationModule,
    SearchModule,
    AuthModule,
    FooterModule,
    HttpClientModule,
    NoopAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      CartEffects,
      OrderEffects,
      AuthEffects,
      ShowcaseEffects,
      BrowseEffects
    ]),
    AppRoutingModule 
  ],
  providers: [ProductService, CartService, OrderService, AuthGuardService, NonAuthGuardService,AccountService,TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}