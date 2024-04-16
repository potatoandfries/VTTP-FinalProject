import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subscription, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { Product } from '../../configurations/model';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit, OnDestroy {

  @ViewChild('relatedCards')
  relatedCards!: ElementRef<HTMLDivElement>;

  paramSubscription!: Subscription;

  relatedProducts!: Array<Product>;
  fetchError: HttpErrorResponse | null = null; 
  productUrl!: string;

  innerLoading = true;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.innerLoading = true;
        const url = params['productUrl'];
        if (url) {
          this.productUrl = url;
          this.productService.getRelatedProducts(this.productUrl)
            .pipe(
              take(1),
              catchError(error => {
                this.fetchError = error;
                this.innerLoading = false;
                return throwError(() => error);
              })
            )
            .subscribe(
              (data: Array<Product>) => {
                this.relatedProducts = data;
                this.innerLoading = false;
              }
            );
        }
      }
    );
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  scrollLeft() {
    if (this.relatedCards && this.relatedCards.nativeElement) {
      this.relatedCards.nativeElement.scrollLeft -= 250;
    }
  }

  scrollRight() {
    if (this.relatedCards && this.relatedCards.nativeElement) {
      this.relatedCards.nativeElement.scrollLeft += 250;
    }
  }
}