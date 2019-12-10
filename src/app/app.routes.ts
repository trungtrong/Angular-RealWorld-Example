import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const APP_ROUTES = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },

  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  },

  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilesModule'
  },

  {
    path: 'editor',
    loadChildren: './editor-page/editor.module#EditorModule'
  },
  {
    path: 'article',
    loadChildren: './article/article.module#ArticleModule'
  },

  {
    path: '**',
    component: PageNotFoundComponent
  }
]
