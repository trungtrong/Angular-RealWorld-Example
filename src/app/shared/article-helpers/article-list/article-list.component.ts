import { Component, OnInit, Input } from '@angular/core';
import { ArticleListConfig } from 'src/app/core/models/article-list-config.model';
import { Article } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styles: ['.page-link{cursor: pointer}']
})

export class ArticleListComponent {
  // Step 1- Home

  // limit of article that is showed on one Page
  // parent of ArticleList is HomeComp
  @Input() limit: number;
  @Input()
      set config(config: ArticleListConfig) {
        if (config) {
          this.query = config;
          this.currentPage = 1;
          this.runQuery();
        }
      }

  // query to  Article
  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  constructor() { }


  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [
      {
        slug: 'Hi',
        title: 'Angular',
        description: 'Learn Angular',
        body: 'Angular is a Front-end Framework',
        tagList: ['1', '2'],
        createdAt: 'Lala',
        updatedAt: '12/10',
        favorited: true,
        favoritesCount: 2
        // author: Profile;
      }
    ];

    // create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }
  }


}

