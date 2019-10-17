import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ArticlePageComponent } from './article-page/article-page.component';

import { RouterModule } from '@angular/router';
import { ARTICLE_ROUTES } from './article.routes';
import { ArticleResolver } from './article-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ARTICLE_ROUTES)
  ],
  declarations: [
    ArticlePageComponent
  ],
  providers: [
    ArticleResolver
  ]
})

export class ArticleModule {}
