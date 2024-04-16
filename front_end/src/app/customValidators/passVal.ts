import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchCheckValidator(control: AbstractControl): ValidationErrors | null {
  // Use control.get() to safely access the child controls.
  const newPassword = control.get('newPassword')?.value;
  const newPasswordConfirm = control.get('newPasswordConfirm')?.value;
  return newPassword && newPasswordConfirm && newPassword === newPasswordConfirm ? null : { noMatch: true };
}