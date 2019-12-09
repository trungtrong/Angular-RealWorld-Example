import { Component, OnInit } from '@angular/core';
import { ArticleListConfig } from 'src/app/core/models/article-list-config.model';
import { UserService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;
  currentUrl = '';

  constructor(
  ) { }

  ngOnInit() {
    this.setListTo('all');
    this.currentUrl = '/'; // home
  }

  setListTo(type: string = '', filters: object = {}) {
    this.listConfig = {
      type,
      filters
    };
  }
}
