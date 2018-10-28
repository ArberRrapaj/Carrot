import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appConfirmValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ConfirmValidatorDirective, multi: true }]
})
export class ConfirmValidatorDirective {
  @Input() controlNameToCompare: string;

  validate(c: AbstractControl): ValidationErrors | null {
    return confirmValidator(this.controlNameToCompare)(c);
  }

}

export function confirmValidator(controlNameToCompare: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value.length === 0) {
      return null; // don't validate empty value
    }
    const controlToCompare = control.root.get(controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return controlToCompare && controlToCompare.value !== control.value ? { 'confirm': true } : null;
  };
}
