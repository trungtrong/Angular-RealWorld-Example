import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  OnDestroy
} from '@angular/core';

import { UserService, User, Comment } from 'src/app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-comment',
  templateUrl: 'article-comment.component.html'
})

export class ArticleCommentComponent implements OnInit, OnDestroy {
  private $subscription: Subscription;
  canModify: boolean;

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    // load the current user's data
    this.$subscription = this._userService.currentUser$.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
      }
    );
  }

  /*
  - If the comment is deleted => we unsubscribe the user info
  */
  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

  deleteClicked() {
    console.log('delete');
    this.deleteComment.emit(true);
  }

}
