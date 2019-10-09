import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [SettingsComponent],

  imports: [
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
