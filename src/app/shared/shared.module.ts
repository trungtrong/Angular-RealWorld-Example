import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ListErrorsComponent } from './list-errors/list-errors.component';

import {
  ArticleMetaComponent,
  ArticleListComponent,
  ArticlePreviewComponent
} from './article-helpers';

import {
  ShowAuthedDirective
} from './directives';

import {
  StringWithoutSpacePipe
} from './pipes';

import {
  FavoriteButtonComponent
} from './buttons';

import { PaginationComponent } from './pagination/pagination.component';

const DIRECTIVES = [
  ShowAuthedDirective
];

const PIPES = [
  StringWithoutSpacePipe
];

const ARTICLES_HELPER = [
  ArticleMetaComponent,
  ArticleListComponent,
  ArticlePreviewComponent
];

const BUTTONS = [
  FavoriteButtonComponent
];

@NgModule({
  imports: [
    // https://stackoverflow.com/questions/45724051/template-parse-errors-cant-bind-to-directive-since-it-isnt-a-known-property-o
    // add CommonModule b/c it is the SharedModule
    CommonModule,

    // Step 2: login and register
    FormsModule,
    ReactiveFormsModule,
    // step 3: authenticating
    HttpClientModule,
    RouterModule

  ],
  declarations: [
    // Step 3
    ListErrorsComponent,

    // // step 4
    ...DIRECTIVES,
    ...PIPES,

    ...ARTICLES_HELPER,
    ...BUTTONS,

    PaginationComponent
  ],
  exports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    RouterModule,

    ListErrorsComponent,

    ...DIRECTIVES,
    ...PIPES,

    ...ARTICLES_HELPER,
    ...BUTTONS,

    PaginationComponent
  ]
})

export class SharedModule {}
