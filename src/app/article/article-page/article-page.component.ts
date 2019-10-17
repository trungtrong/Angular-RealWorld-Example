import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article, User, UserService } from 'src/app/core';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html'
})

export class ArticlePageComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;

  isSubmitting = false;
  isDeleting = false;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ) { }

  ngOnInit() {
    // retrieve the prefetched article
    /*
      data = { article: {author,.....} }
      b/c article: ArticleResolver in article.route
    */
    this._route.data.subscribe(
      (data: {article: Article} ) => {
        console.log('data article= ', data.article);
        this.article = data.article;
      }
    );

    this._userService.currentUser$.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );
  }

}


