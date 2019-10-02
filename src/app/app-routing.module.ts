import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';


const routes: Routes = [
  // add HomeRouting
  {
    path: '', // = <router-outlet>
    loadChildren: () => import('../app/home/home.module')
        .then(m => m.HomeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
