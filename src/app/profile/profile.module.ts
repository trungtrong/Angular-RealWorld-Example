import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-component/profile.component';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';

import { PROFILES_ROUTE } from './profile.routes';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(PROFILES_ROUTE)
  ],
  exports: [],
  providers: [],
})

export class ProfilesModule {}
