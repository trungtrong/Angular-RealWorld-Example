import { Component, OnInit } from '@angular/core';
import { ArticleListConfig } from 'src/app/core/models/article-list-config.model';
import { TagsService } from '../core';

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
  tagsLoaded = false; // when tags is loaded from server
  currentUrl = '';

  constructor(
    private _tagsService: TagsService
  ) { }

  ngOnInit() {
    this.setListTo('all');
    this.currentUrl = '/'; // home

    this._tagsService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      });
  }

  setListTo(type: string = '', filters: object = {}) {
    this.listConfig = {
      type,
      filters
    };
  }
}
