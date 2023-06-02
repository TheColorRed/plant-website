import { Model } from '@hasura-query-builder/core';
import { AttributesType } from '@hasura-query-builder/core/dist/types/src/classes/base-model';
import * as bcrypt from 'bcryptjs';
import { from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

export class Users extends Model {
  override table = 'application_users';
  override fields = {
    id: Number(),
    first: String(),
    last: String(),
    email: String(),
  };
}

export class UserEmailPassword extends Model {
  override table = 'users';
  override fields = {
    email: String(),
    password: String(),
  };
  override connection = 'public';

  override attributes: AttributesType<UserEmailPassword> = {
    password: row => window.atob(row.password.replace('base64:type254:', '')),
  };

  static validate(email: string, password: string) {
    return this.all()
      .where({ email: { _eq: email } })
      .first()
      .pipe(
        filter(user => 'password' in user),
        switchMap(user => from(bcrypt.compare(password, user.password))),
        map(valid => ({ valid, msg: valid ? '' : 'Invalid email or password' }))
      );
  }

  static checkEmail(email: string) {
    return this.all()
      .where({ email: { _eq: email } })
      .exists()
      .pipe(map(exists => ({ exists, msg: exists ? 'Email already in use' : 'Email available' })));
  }
}
