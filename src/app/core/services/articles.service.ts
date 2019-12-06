import { Injectable } from '@angular/core';
import { Article, ArticleListConfig } from '../models';
import { ApiService } from './api.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpParams } from '@angular/common/http';

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

  queryListArticles(config: ArticleListConfig): Observable<{articles: Article[]}> {
    // convert any filters over to Angular's URLSearchParameter
    /*
    - property of filters is used to query list of article
      following { /api/articles?favorited=trongrui09&limit=10&offset=0 }
    */
    const params = {};

    Object.keys(config.filters)
      .forEach(key => {
        params[key] = config.filters[key];
      });

    // shadow object
    // const params = Object.assign({}, config.filters);

    return this._apiService.get(
      '/articles' + ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  favoriteArticle(slug): Observable<Article> {
    return this._apiService.post('/articles/' + slug + '/favorite');
  }

  unfavoriteArticle(slug): Observable<Article> {
    return this._apiService.delete('/articles/' + slug + '/favorite');
  }
}

/*
- Must Do: must call subscribe() method when calling any method in service.ts
*/


