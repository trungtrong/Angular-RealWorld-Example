import { Injectable } from '@angular/core';
import { Article } from '../models';
import { ApiService } from './api.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class ArticlesService {
  constructor(
    private _apiService: ApiService
  ) {}

  get(slug): Observable<Article> {
    return this._apiService.get('/articles' + slug)
      .pipe(map(data => data));
  }

  // update or create an article
  save(article: Article): Observable<Article> {
    // if we're updating an existing article
    if (article.slug) {
      return this._apiService.put(
        '/article' + article.slug, article)
      .pipe(map(data => data));
    } else {
      return this._apiService.post('/articles', article)
          .pipe(map(data => data));
    }
  }
}

