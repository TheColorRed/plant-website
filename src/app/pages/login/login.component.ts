import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login$ = this.loginService.login$.pipe(tap(({ valid }) => valid && this.router.navigate(['/'])));
  loggedIn$ = this.loginService.loggedIn$;

  loginGroup = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private readonly loginService: LoginService, private readonly router: Router) {}

  login() {
    this.loginService.login(this.loginGroup.value.email!, this.loginGroup.value.password!);
  }
}
