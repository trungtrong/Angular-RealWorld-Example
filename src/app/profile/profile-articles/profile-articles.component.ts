import { Component, OnInit } from '@angular/core';
import { Profile, ArticleListConfig } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html'
})

export class ProfileArticlesComponent implements OnInit {
  profile: Profile;
  /*
    - property of filters is used to query list of article
      following { /api/articles?author=trongrui&favorited=trungrui09&limit=10&offset=0 }

    - if type = all =>  /api/articles?author=trongrui&favorited=trungrui09&limit=10&offset=0
      + list article on user's profile

    - if type = feed => /api/articles/feed/author=trongrui&favorited=trungrui09&limit=10&offset=0
  */

  // for @input in article-list.comp
  articlesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    /*
    - using data from { resolve guard } of route parent {profile.comp}
    */
    this._route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.articlesConfig = {
          type: 'all',
          filters: {}
        };

        // Only method I found to refresh article load on swap
        this.articlesConfig.filters.author = this.profile.username;
      }
    );

  }

}
