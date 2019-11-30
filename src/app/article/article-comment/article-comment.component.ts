import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { UserService, User, Comment } from 'src/app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-comment',
  templateUrl: 'article-comment.component.html'
})

export class ArticleCommentComponent implements OnInit {
  private $subscription: Subscription;
  canModify: boolean;

  @Input() comment: Comment;

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

}
