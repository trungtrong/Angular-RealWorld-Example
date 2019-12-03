import { ProfilePageComponent } from './profile-component/profile.component';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';

export const PROFILES_ROUTE = [
  {
    path: ':username',
    component: ProfilePageComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      { path: '',
        component: ProfileArticlesComponent
      }
    ]
  }
]
