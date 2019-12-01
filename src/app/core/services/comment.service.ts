import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '../models';

@Injectable()

export class CommentsService {
  constructor(
    private _apiService: ApiService
  ) {}

  /*
  @ payload is a comment of reader or author
  */
  add(slug, payload): Observable<Comment> {
    return this._apiService.post(
      `/articles/${slug}/comments`,
      {body: payload}
    ).pipe(map(data => data));
  }

  getAll(slug): Observable<Comment[]> {
    return this._apiService.get(
      `/articles/${slug}/comments`
    ).pipe(map(data => data));
  }

  delete(commentId, articleSlug) {
    return this._apiService.delete(
      `/articles/${articleSlug}/comments/${commentId}`);
  }
}
