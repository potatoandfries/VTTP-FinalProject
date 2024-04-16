
import { OrderState } from './../../store/order/order.reducer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as OrderActions from '../../store/order/order.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';
import { take } from 'rxjs/operators';
import { notBlankValidator } from '../../customValidators/blankVal';
import { Personal, User } from '../../configurations/model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  personalForm!: FormGroup;

  innerLoading = true;


  constructor(private store: Store<fromApp.AppState>, private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(OrderActions.setCheckoutStep({step:0}));
    this.personalForm = new FormGroup({
      shipName: new FormControl(null, [Validators.pattern('^[a-zA-Z\\s]+$'), Validators.required, notBlankValidator, Validators.minLength(3), Validators.maxLength(104)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(4), Validators.maxLength(12)]),
    });

    this.store.select('order').pipe(take(1)).subscribe((order: OrderState) => {
      if (order.personal) {
        this.personalForm.patchValue({
          shipName: order.personal.shipName,
          phone: order.personal.phone
        });
        this.innerLoading = false;
      } else {
        this.accountService.getUser().pipe(take(1)).subscribe((data: User) => {
          this.personalForm.patchValue({
            shipName: (data.firstName ? data.firstName : '') + ' ' + (data.lastName ? data.lastName : ''),
            phone: data.phone,
          });
          this.innerLoading = false;
        });
      }

    });


  }


  onSubmitOrderForm() {
    const personalData: 
    Personal = {
      shipName: this.personalForm.value.shipName.trim(),
      phone: this.personalForm.value.phone,
    };
  
    this.store.dispatch(OrderActions.postPersonal({ personal: personalData }));
    this.router.navigate(['/checkout/shipping']);
  }
}
