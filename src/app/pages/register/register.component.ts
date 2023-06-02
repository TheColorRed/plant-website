import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isEmailTaken = true;
  registration$ = this.registrationService.registration$;
  checkEmail$ = this.registrationService.checkEmail$.pipe(
    tap(({ exists }) => (this.isEmailTaken = exists)),
    tap(() => this.registrationForm.controls.email.updateValueAndValidity()),
    tap(() => this.registrationForm.controls.email.markAsTouched())
  );

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, this.emailTaken()]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  constructor(private readonly registrationService: RegistrationService, private readonly router: Router) {}

  register() {}

  checkEmail() {
    const email = this.registrationForm.value.email?.trim();
    if (typeof email !== 'string' || email.length === 0) return;
    this.registrationService.checkEmail(email);
  }

  emailTaken(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.isEmailTaken ? { emailTaken: { value: control.value } } : null;
    };
  }
}
