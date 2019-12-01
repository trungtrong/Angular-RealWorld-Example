import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Article,
  User,
  UserService,
  ArticlesService,
  Comment,
  CommentsService
 } from 'src/app/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html'
})

export class ArticlePageComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;

  isSubmitting = false;
  isDeleting = false;

  /*
  Problem: if using comments: Comment[]
  => this.comments = undefined => we cannnot push any data into it
  => Must use =>  comments: Comment[] = [];
  */
  comments: Comment[] = [];
  commentControl = new FormControl();

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _articleService: ArticlesService,
    private _router: Router,
    private _commentsService: CommentsService
  ) { }

  ngOnInit() {
    // retrieve the prefetched article
    /*
      data = { article: {author,.....} }
      b/c article: ArticleResolver in article.route
    */
    this._route.data.subscribe(
      (data: {article: Article} ) => {
        console.log('data article= ', data.article);
        this.article = data.article;

        // Load the comments on this article
        this.populateComments();
      }
    );

    this._userService.currentUser$.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );
  }

  deleteArticle() {
    /* When clicking on <Delete> button, button will be disabled*/
    this.isDeleting = true;

    this._articleService.delete(this.article.slug)
      .subscribe(success => {
          /*  go back to root url  */
          this._router.navigateByUrl('/');
        }, error => {
          this.isDeleting = false;
        }
      );

    /*
    - Problem: If without using .subscribe() when calling
      Http Method => it will not happen
    */
  }

  addComment() {
    this.isSubmitting = true;

    const commentBody = this.commentControl.value;
    this._commentsService.add(this.article.slug, commentBody)
      .subscribe(
        comment => {
          // must use unshift() method, b/c in forum, new comment often added on the top
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
        },
        error => {
          this.isSubmitting = false;
        }
      );
  }

  populateComments() {
    this._commentsService.getAll(this.article.slug)
      .subscribe(comments => this.comments = comments);
  }
}


