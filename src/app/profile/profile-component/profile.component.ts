import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService, User } from 'src/app/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfilePageComponent implements OnInit {
  profile;
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
        (res) => console.log(res),
        (err) => console.log(err)
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

