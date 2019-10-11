import { SETTINGS_ROUTE } from './settings/settings.route';

export const APP_ROUTES = [
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  },

  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilesModule'
  }
]
