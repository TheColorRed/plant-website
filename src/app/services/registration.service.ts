import { Injectable } from '@angular/core';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { UserEmailPassword } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private readonly checkEmailSub = new Subject<string>();
  private readonly registrationSub = new Subject<{
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }>();
  registration$ = this.registrationSub.asObservable();
  checkEmail$ = this.checkEmailSub.pipe(
    debounceTime(250),
    switchMap(email => UserEmailPassword.checkEmail(email))
  );

  constructor() {}

  checkEmail(email: string) {
    this.checkEmailSub.next(email);
  }
}
