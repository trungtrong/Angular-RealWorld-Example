import { EditorComponent } from './editor-page.component';
import { EditableArticleResolver } from './editable-article-resolver.service';

export const EDITOR_ROUTES = [
  {
    path: '',
    component: EditorComponent
  },
  {
    path: ':slug',
    component: EditorComponent,
    resolve: {
      article: EditableArticleResolver
    }
  }
];
