import { Component, OnInit } from '@angular/core';
import {
  UserService,
  User,
  Profile
} from 'src/app/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfilePageComponent implements OnInit {
  profile: Profile;
  currentUser: User;
  isUser: boolean;

  // upload image
  /*
  File Interface so that we have this.avatar.name
  */
  avatar: File;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // resolve Data from profile-resolver
    this._route.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;

        // load the current user's data
        this._userService.currentUser$.subscribe(
          (userData: User) => {
            this.currentUser = userData;

            this.isUser = (this.currentUser.username === this.profile.username);
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      this.avatar = event.target.files[0] as File;
    }
  }

  onSubmit() {
    const formData =  new FormData();
    formData.append('avatar', this.avatar, this.avatar.name);

    // upload image to server
    this._userService.uploadAvatar(formData)
      .subscribe(
        data => {
          this.profile = data;
        },
        err => console.log(err)
      );
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


/*
selectImage(event) {
    if (event.target.files.length > 0) {
      // this.avatar = event.target.files[0];
      const files: FileList = event.target.files;
      this.avatar = { file: files.item(0) };
    }
  }

  onSubmit() {
    const contentEl = this.el.nativeElement.querySelector('#upload-form');
    console.log('ccccccc', contentEl);

    const formData =  new FormData();
    formData.append('avatar', this.avatar.file, this.avatar.file.name);

    console.log(formData);
    // upload image to server
    this._userService.uploadAvatar(formData)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }


*/

