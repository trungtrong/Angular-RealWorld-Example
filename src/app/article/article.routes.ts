import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleResolver } from './article-resolver.service';

export const ARTICLE_ROUTES = [
  {
    path: ':slug',
    component: ArticlePageComponent,
    resolve: {
      article: ArticleResolver
    }
  }
];
