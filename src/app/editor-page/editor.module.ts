import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EDITOR_ROUTES } from './editor.route';
import { EditorComponent } from './editor-page.component';
import { EditableArticleResolver } from './editable-article-resolver.service';

import { SharedModule } from '../shared';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(EDITOR_ROUTES)
  ],
  declarations: [
    EditorComponent
  ],
  providers: [
    EditableArticleResolver
  ]
})
export class EditorModule {}
