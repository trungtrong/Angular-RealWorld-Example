import { Component, OnInit } from '@angular/core';
import { ArticleListConfig } from 'src/app/core/models/article-list-config.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // 1: for Article
  // listConfig: ArticleListConfig = {
  //   type: 'all',
  //   filters: {}
  // };

  constructor() { }

  ngOnInit() {
  }

}
