import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService } from '../core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html'
})

export class EditorComponent implements OnInit {
  article: Article = {} as Article;
  articleForm: FormGroup;
  tagField = new FormControl();

  isSubmitting = false;

  constructor(
    private articlesService: ArticlesService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: ''
    });

    // Initialized tagList as empty array
    this.article.tagList = [];
  }

  ngOnInit() {
    // If there's an article pre-fetched , load it
    this._route.data.subscribe(
      (data: Article ) => {
        if (data) {
          this.article = data;

          // fill all of them
          this.articleForm.patchValue(data);
        }
      }
    );
  }

  updateArticle(values: object) {
    Object.assign(this.article, values);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateArticle(this.articleForm.value);

    // post the changes
    this.articlesService.save(this.article)
      .subscribe(
        article => this._router.navigateByUrl('/article/' + article.slug),
        error => {
          this.isSubmitting = false;
        }
      );
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;

    // only add tag if it does not exist yet
    if (this.article.tagList.indexOf(tag) < 0 ) {
      this.article.tagList.push(tag);
    }

    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

}


