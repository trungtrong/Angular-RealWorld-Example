import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class TagsService {
  constructor(private _apiService: ApiService) {}

  getAll(): Observable<Array<string>> {
    // localhost:3000/api/tags
    return this._apiService.get('/tags')
      .pipe(map(data => data.tags));
  }
}
