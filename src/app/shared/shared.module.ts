import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticlePreviewComponent } from './article-helpers';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ShowAuthedDirective } from './directives/show-authed.directive';

@NgModule({
  imports: [
    CommonModule,

    // Step 2: login and register
    FormsModule,
    ReactiveFormsModule,
    // step 3: authenticating
    HttpClientModule,
    RouterModule

  ],
  declarations: [
    ArticlePreviewComponent,
    ArticleListComponent,

    // Step 3
    ListErrorsComponent,

    // step 4
    ShowAuthedDirective

  ],
  exports: [
    CommonModule,

    ArticlePreviewComponent,
    // for Home.comp can use
    ArticleListComponent,

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    RouterModule,

    ListErrorsComponent,

    ShowAuthedDirective

  ]
})

export class SharedModule {}
