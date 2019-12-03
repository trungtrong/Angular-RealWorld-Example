import { Component, OnInit, Input } from '@angular/core';
import { ArticleListConfig, ArticlesService } from '../../../core';
import { Article } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styles: ['.page-link{cursor: pointer}']
})

export class ArticleListComponent implements OnInit {
  // Step 1- Home

  // limit of article that is showed on one Page
  // parent of ArticleList is HomeComp and ProfilePageComp
  // to display list of article

  // query to  Article
  query: ArticleListConfig;

  // for *ngFor in DOM
  results: Article[];

  // create *loading* effect when querying from server
  loading = false;

  //  from profile-article.comp.ts
  @Input()
    set config(config: ArticleListConfig) {
      if (config) {
        this.query = config;
      }
    }

  constructor(private _articleService: ArticlesService) { }

  ngOnInit() {
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    this._articleService.queryListArticles(this.query)
      .subscribe(data => {
        /* if there have response from server*/
        this.loading = false;
        this.results = data.articles;
      });
  }

}

