import { Component, Input } from '@angular/core';

import { Article } from '../../../core';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html'
})
export class ArticleMetaComponent {
  @Input() article: Article;
}

/*
- Functionality:
  + Heading for article-page.comp.html
  + Author info of article-list
*/
