import { NgModule } from '@angular/core';

// import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule, AuthGuard } from '../shared';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { SETTINGS_ROUTE } from './settings.route';


@NgModule({
  declarations: [SettingsComponent],

  imports: [
    SharedModule,
    // SettingsRoutingModule,
    RouterModule.forChild(SETTINGS_ROUTE),
  ]
})
export class SettingsModule { }
