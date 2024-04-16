import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccountService } from '../../services/account.service'; 
import { checkIfBlankValidator } from '../../customValidators/blankVal';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm!: FormGroup;
  innerLoading: boolean = true;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
  }

  private initForm(): void {
    this.addressForm = new FormGroup({
      address: new FormControl(null, [Validators.pattern('[0-9a-zA-Z #,-]+'), checkIfBlankValidator, Validators.minLength(3), Validators.maxLength(240)]),
      city: new FormControl(null, [Validators.pattern('^[a-zA-Z\\s]+$'), checkIfBlankValidator, Validators.minLength(3), Validators.maxLength(100)]),
      state: new FormControl(null, [Validators.pattern('^[a-zA-Z\\s]+$'), checkIfBlankValidator, Validators.minLength(3), Validators.maxLength(40)]),
      zip: new FormControl(null, [Validators.pattern('^[0-9]*$'), checkIfBlankValidator, Validators.minLength(5), Validators.maxLength(6)]),
      country: new FormControl(null, [Validators.pattern('^[a-zA-Z\\s]+$'), checkIfBlankValidator, Validators.minLength(3), Validators.maxLength(40)])
    });
  }

  private loadUserData(): void {
    this.accountService.getUser()
      .pipe(
        take(1),
        catchError(error => {
          console.error('Failed to load user data', error);
          this.innerLoading = false;
          return of(null); // Continue operation even if there's an error.
        })
      )
      .subscribe(data => {
        if (data) {
          this.addressForm.patchValue({
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
            country: data.country
          });
        }
        this.innerLoading = false;
      });
  }

  onSubmitAddressForm(): void {
    if (this.addressForm.invalid) {
      alert('Please correct the errors in the form.');
      return;
    }

    this.innerLoading = true;
    const formValue = this.addressForm.value;

  
    const user = {
      address: this.addressForm.value?.address?.trim()?.length ? this.addressForm.value.address.trim() : null,
      city: this.addressForm.value?.city?.trim()?.length ? this.addressForm.value.city.trim() : null,
      state: this.addressForm.value?.state?.trim()?.length ? this.addressForm.value.state.trim() : null,
      zip: this.addressForm.value?.zip?.trim()?.length ? this.addressForm.value.zip.trim() : null,
      country: this.addressForm.value?.country?.trim()?.length ? this.addressForm.value.country.trim() : null
    };

    
    this.accountService.updateUserAddress(user)
      .pipe(
        take(1),
        catchError(error => {
          alert('An error occurred while updating your address. Please try again.');
          console.error('Update address error:', error);
          this.innerLoading = false;
          return of(null); // Prevents the application from breaking on error.
        })
      )
      .subscribe(response => {
        if (response) {
          alert('Success! Your address has been updated.');
        }
        this.innerLoading = false;
      });
  }
}
