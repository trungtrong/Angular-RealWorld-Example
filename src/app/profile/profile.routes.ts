import { ProfilePageComponent } from './profile-component/profile.component';
import { ProfileResolver } from './profile-resolver.service';

export const PROFILES_ROUTE = [
  {
    path: ':username',
    component: ProfilePageComponent,
    resolve: {
      profile: ProfileResolver
    }
  }
]
