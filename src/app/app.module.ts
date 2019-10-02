import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent, HeaderComponent, SharedModule } from './shared';

import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HomeModule,
    AuthModule,

    CoreModule,

    SharedModule
  ],

  exports: [

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
