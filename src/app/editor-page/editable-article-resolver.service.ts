import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Article, ArticlesService, UserService } from '../core';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()

export class EditableArticleResolver implements Resolve<Article> {
  constructor(
    private _articleService: ArticlesService,
    private _router: Router,
    private _userService: UserService
  ) { }

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> {
    return this._articleService.get(_route.params['slug'])
      .pipe(
        map(article => {
          return article;
        }),
        catchError(err => this._router.navigateByUrl('/'))
      );
  }
}

