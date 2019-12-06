import { Component, OnInit } from '@angular/core';
import { Profile, ArticleListConfig } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html'
})

export class ProfileFavoritesComponent implements OnInit {
  profile: Profile;
  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.favoritesConfig.filters.favoritedBy = this.profile.username;
      }
    );
  }
}

