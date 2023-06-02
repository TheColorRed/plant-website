import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserEmailPassword } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly loginSub = new Subject<{ email: string; password: string }>();
  login$ = this.loginSub.pipe(switchMap(({ email, password }) => UserEmailPassword.validate(email, password)));

  private readonly loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  login(email: string, password: string) {
    this.loginSub.next({ email, password });
  }
}
