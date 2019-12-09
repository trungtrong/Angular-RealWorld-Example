import { Component, Input, OnInit } from '@angular/core';
import { ArticleListConfig, ArticlesService, PaginationService, Pagination } from '../../../core';
import { Article } from 'src/app/core/models/article.model';
import { ActivatedRoute } from '@angular/router';

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

  // paginated article pages
  articlesCount: number;
  currentPage: number;
  pager: Pagination;
  maxPager = 5;

  //  from profile-article.comp.ts
  @Input() limit: number; // limit = amount of articles in an one pager
  @Input() config: ArticleListConfig;
  @Input() currentUrl: string;

  constructor(
    private _articleService: ArticlesService,
    private _paginationService: PaginationService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.config) {
      this.query = this.config;

      // query parameters
      // http://localhost:4200/profile/trongrui?page=2
      // it is going to page [2]
      // + unary: will convert string to number
      // when reloading the page with ?page=2 or 3 or whatever else
      // we get the { page } query string
      const page = +this._route.snapshot.queryParams['page'];

      // http://localhost:4200/profile/trongrui
      // => page = undefined
      if (!page) {
        this.currentPage = 1;
      } else {
        this.currentPage = page;
      }

      this.runQuery();
      // If using <Observable>, whenever url change query parameter
      // => the following { this._route.queryParams.subscribe} will subscribe the new data
      // this._route.queryParams.subscribe(queryParameters => {
      //   const page = queryParameters['page'];
      // ...
      // this.runQuery(); // will run gradually
      // });
    }
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // create limit and offset filter (i necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = (this.limit * (this.currentPage - 1));
    }

    this._articleService.queryListArticles(this.query)
      .subscribe(data => {
        /* if there have response from server*/
        this.loading = false;
        this.results = data.articles;
        this.articlesCount = data.articlesCount;

        // in the case {page} parameter  is out of range
        const totalPages = Math.ceil(this.articlesCount / this.limit);

        if (this.currentPage > totalPages) {
          this.currentPage = 1;
        }
        this.pager = this._paginationService.getPager(this.articlesCount, this.currentPage, this.limit, this.maxPager);
      });
  }

  // paginated article pages
  getCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.runQuery();
  }
}

