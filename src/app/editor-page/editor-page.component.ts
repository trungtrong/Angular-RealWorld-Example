import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService } from '../core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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

  currentSlug: string;
  currentPath = this._route.snapshot.routeConfig.path;
  formTitle: string;
  submitTitle: string;

  constructor(
    private _articlesService: ArticlesService,
    private fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
    /*
      - retrieve the :parameter route
    */
    this._route.paramMap.subscribe(
      parameterMap => {
        this.currentSlug = parameterMap.get('slug');
        console.log('slug', this.currentSlug);
        this.renderArticle(this.currentSlug);
      }
    );
  }

  renderArticle(slug: string) {
    /*
      slug = null => create article
      slug != null => update article
    */
    if (slug == null || this.currentPath === 'editor') {
      this.formTitle = 'Create Article';

      // Initialized tagList as empty array
      this.article.tagList = [];
      this.submitTitle = 'Create';
    } else {
      /*
        retrieve data from server
      */
      this._route.data.subscribe(
        (data: { editInfo: Article }) => {
          this.article = data.editInfo;
          console.log('article now', this.article);
          /*
            - fill up the update form
          */
          this.articleForm.patchValue(this.article);

          this.formTitle = 'Edit Article';
          this.submitTitle = 'Update';
        }
      );
    }
  }

  updateArticle(values: object) {
    Object.assign(this.article, values);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateArticle(this.articleForm.value);

    if (this.currentSlug == null || this.currentPath === 'editor') {
      // post the changes
      this._articlesService.create(this.article)
      .subscribe(
        article => {
          this._router.navigateByUrl('/article/' + article.slug);
        },
        error => {
          this.isSubmitting = false;
        }
      );
    } else {
      /*
        update
      */
      this._articlesService.update(this.currentSlug, this.article)
        .subscribe(
          () => {
            this._router.navigate(['/article/' + this.currentSlug]);
          },
          (error) => console.log(error)
        );
    }
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;

    // only add tag if it does not exist yet
    if (this.article.tagList.indexOf(tag) === -1 ) {
      this.article.tagList.push(tag);
    }

    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

}


