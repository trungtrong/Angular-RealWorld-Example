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
    return this._apiService.get('/articles/' + slug)
    .pipe(map(data => data));
  }

  // update or create an article
  create(article: Article): Observable<Article> {
      return this._apiService.post('/articles', article)
          .pipe(map(
              data => data)
          );
  }

  update(slug: string, article: Article): Observable<Article> {
    return this._apiService.put('/articles/' + slug, article)
          .pipe(map(data => data));
  }

  delete(slug: string) {
    return this._apiService.delete('/articles/' + slug);
  }


}


