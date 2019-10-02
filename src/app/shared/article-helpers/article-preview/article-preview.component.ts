import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html'
})

export class ArticlePreviewComponent {
  @Input() article: Article;

  constructor() { }

}
