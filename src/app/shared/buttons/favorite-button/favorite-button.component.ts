import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Article,
  ArticlesService,
  UserService,
  User,
  ArticleFavorite
} from '../../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-button',
  templateUrl: '/favorite-button.component.html'
})

export class FavoriteButtonComponent implements OnInit {
  isSubmitting = false; // for lazy loading
  favorited = false;
  isUser = false;

  @Input() article: Article;
  @Output() toggle = new EventEmitter<number>();

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _articleService: ArticlesService
  ) { }

  ngOnInit() {
    this._userService.currentUser$.subscribe(
      (userData: User) => {
        if (!userData) {
          this.isUser = false;
        } else {
          this.isUser = true;

          const lovers = this.article.lovers;
          const userId = userData._id;

          // check if the lover have never liked the article
          const index = lovers.indexOf(userId);
          if (index === -1) {
            this.favorited = false;
          } else {
            // lover have liked the article
            this.favorited = true;
          }
        }
      });
  }

  toggleFavorite() {
    this.isSubmitting = true;

    // Case 1: Not authenticated => Push to login screen
    if (!this.isUser)  {
      this._router.navigateByUrl('/login');
    } else {
      // Favorited the article if it isn't favorited yet
      if (!this.favorited) {
        return this._articleService.favoriteArticle(this.article.slug)
          .subscribe(
            (data: ArticleFavorite) => {
              /*
              - data = {
                lovers,
                favoritesCount
              }
              */
              this.isSubmitting = false;
              this.favorited = true;
              this.toggle.emit(data.favoritesCount);
            },
            err => this.isSubmitting = false
          );
      } else {
        // otherwise, unfavorite the article
        return this._articleService.unfavoriteArticle(this.article.slug)
          .subscribe(
            (data: ArticleFavorite) => {
              this.isSubmitting = false;
              this.favorited = false;
              this.toggle.emit(data.favoritesCount);
            },
            err => this.isSubmitting = false
          );
      }
    }
  }
}
