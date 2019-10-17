import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Article, ArticlesService } from '../core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()

export class ArticleResolver implements Resolve<Article> {
  constructor(
    private _articlesService: ArticlesService,
    private _router: Router
  ) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> {
    return this._articlesService.get(_route.params['slug'])
      .pipe(catchError(err => this._router.navigateByUrl('/')));
  }
}
