import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html'
})

export class SettingsComponent implements OnInit {
  user: User = { } as User;
  settingsForm: FormGroup;
  isSubmitting = false;

  constructor(private _router: Router,
              private _userService: UserService,
              private fb: FormBuilder) {

    // create form group using the form builder
    this.settingsForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      bio: ''
  });
  }

  ngOnInit() {
    // make a fresh copy of the current user's object
    // to place in editable form fields
    // make a GET Request
    // this._userService.getUser();
    let userInfo;
    this._userService.getCurrentUser()
        .subscribe(user => {
          userInfo = user;

          Object.assign(this.user, userInfo);

          console.log(this.user);
          // fill the form
          this.settingsForm.patchValue(this.user);
        });
  }

  updateForm() {
    this.isSubmitting = true;

    // update the model
    const dataIsUpdated = this.settingsForm.value;

    this._userService
        .updateUser(dataIsUpdated)
        .subscribe(
          updatedUser => this._router.navigate(['/settings']),
          err => {
            console.log(err);
            this.isSubmitting = false;
          }
        );
  }

}

