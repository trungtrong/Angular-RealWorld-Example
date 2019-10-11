import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | any {

    /*
      take the First emitted value of response User's data from server
      in the case log-in is valid
    */
   return this._userService.isAuthenticated$.pipe(take(1));
  }
}
/*
  Note: auth-guard is executed before getUser.subscribe()
  => therefore, it doesn't have data

  =========> Have never Solution for this (10/10/2019)

*/



/*
  http://ngninja.com/posts/angular2-authguard

  https://codeburst.io/using-angular-route-guard-for-securing-routes-eabf5b86b4d1

                    The Auth Guard works as a GUARD

  - The auth guard ensures that only authenticated users access specific
  routes in the application

  - The auth guard implements an Interface called { CanActive }
    with the help of which it returns either True or False


  +   True :
    =>   If the user is logged in. In localStorage has current user's
      details along with a valid JWT token

  +   False:
    => If the user is logged out. It will redirect the user to the
        login page


*/
