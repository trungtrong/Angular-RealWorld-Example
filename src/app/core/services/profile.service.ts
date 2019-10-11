import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Profile } from '../models';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable()

export class ProfileService {
  constructor(
    private _apiService: ApiService
  ) {}

  getProfile(username: string): Observable<Profile> {
    const nameWithoutBlank = username.split(' ').join('');

    return this._apiService.get('/profiles/' + nameWithoutBlank)
      .pipe(
        map(profile => profile)
      );
  }
}
