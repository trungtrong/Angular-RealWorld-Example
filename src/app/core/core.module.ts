import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { httpInterceptorProviders } from './interceptors';

import {
  ApiService,
  UserService,
  AuthGuard,
  JwtService,
  ProfileService,
  ArticlesService,
  CommentsService,
  PaginationService,
  TagsService
} from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],

  providers: [
    ApiService,
    UserService,

    AuthGuard,
    JwtService,
    httpInterceptorProviders,

    AuthGuard,
    ProfileService,

    ArticlesService,
    CommentsService,

    PaginationService,

    TagsService
  ]
})

export class CoreModule {}
