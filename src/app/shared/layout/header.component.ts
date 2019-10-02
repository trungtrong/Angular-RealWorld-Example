import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private _userService: UserService,
              private _router: Router) {}

  ngOnInit() {}

  logout() {
    this._userService.removeAuth();
    this._router.navigateByUrl('/');

  }
}
