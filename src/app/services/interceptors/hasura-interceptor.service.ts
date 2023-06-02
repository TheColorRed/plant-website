import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jose from 'jose';
import { from, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HasuraInterceptorService implements HttpInterceptor {
  payload = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'anonymous',
      'x-hasura-allowed-roles': ['anonymous', 'user'],
    },
  };

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const secret = new TextEncoder().encode('mK2WLgbke0nfN8NQKTyOfp9B3jxfLzmq');
    const hash = new jose.SignJWT(this.payload).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('2h').sign(secret);

    return from(hash).pipe(
      map(hash => {
        const isPublic = req.headers.get('public') === 'true';
        return req.clone({
          ...(!isPublic && {
            setHeaders: {
              authorization: `Bearer ${hash}`,
            },
          }),
        });
      }),
      switchMap(req => next.handle(req))
    );
  }
}
