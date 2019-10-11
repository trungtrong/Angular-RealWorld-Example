import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Profile, ProfileService } from '../core';

import { Observable, of } from 'rxjs';
import { take, mergeMap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProfileResolver implements Resolve<Profile | never>  {
  constructor(
    private _profileService: ProfileService,
    private _router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>  {

    // https://angular.io/guide/router#resolve-guard
    return this._profileService.getProfile(route.params['username'])
    .pipe(
      catchError((err) => this._router.navigateByUrl('/'))
    );
  }
}


/*
************************
  NOTE: Why { this._profileService.getProfile() } that is an Observable
    don't subscribe and it also receive data
    => b/c { an Observable Service } is being consumed by a { Resolver }
      + The { Resolver } will subscribe to the Observable { automatically }

.pipe(
        take(1),
        mergeMap(profile => {
          console.log('profile = ', profile);

          if (profile) {
            return of(profile);
          } else {
            this._router.navigate(['/']);
          }
        })
      );
*/
