import { AbstractControl, ValidationErrors } from '@angular/forms';

export function checkIfBlankValidator(control: AbstractControl): ValidationErrors | null {
  const isControlValueNullOrWhitespace = (control.value || '').trim() === '';
  return isControlValueNullOrWhitespace ? { 'blank': true } : null;
}

export function notBlankValidator(control: AbstractControl): ValidationErrors | null {
  const isControlValueEmpty = !control.value || (control.value || '').trim() === '';
  return isControlValueEmpty ? { 'blank': true } : null;
}