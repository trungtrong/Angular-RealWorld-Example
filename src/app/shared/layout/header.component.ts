import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(private _userService: UserService,
              private _router: Router) {}

  ngOnInit() {
    console.log('header');
    this._userService.getCurrentUser().subscribe(
      userData => {
        console.log('user data in header = ', userData);
        this.currentUser = userData;
      }
    );
  }

  logout() {
    this._userService.removeAuth();
    this._router.navigateByUrl('/');
  }
}
