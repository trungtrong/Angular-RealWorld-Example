import { Component, OnInit } from '@angular/core';
import { Profile, UserService, User } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';

import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html'
})

export class ProfilePageComponent implements OnInit {
  profile;
  currentUser: User;
  isUser: boolean;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {
    // resolve Data from profile-resolver
    const resolvedData: any = this._route.snapshot.data['profile'];

    // if resolvedData = empty
    if (resolvedData === {}) {
      this.isUser = false;
      console.error(resolvedData);
    } else {
      this.profile = resolvedData;
      this.isUser = true;
    }
  }

  ngOnInit() {
  }
}



/* Keep : Save
  console.log('1111', this._route.snapshot);
=> We have
    ActivatedRouteSnapshot {url: Array(1), params: {…}, queryParams: {…}, fragment: null, data: {…}, …}
    component: class ProfilePageComponent
    data:
    profile:
    bio: "Hello I'm Trong"
    username: "trong rui"

*/
