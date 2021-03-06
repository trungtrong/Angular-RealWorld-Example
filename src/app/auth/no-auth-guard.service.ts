import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../core';
import { Observable } from 'rxjs';

import { take, map } from 'rxjs/operators';

@Injectable()

export class NoAuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._userService.isAuthenticated$.pipe(
      /*
        take the first info of isAuthenticate stream
        => = false (default)
      */
      take(1),
      map(isAuth => !isAuth)
    );
  }
}

/*
- for User who are not a member
*/
