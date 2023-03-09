import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OktaAuth } from '@okta/okta-auth-js';
const oktaAuth = new OktaAuth({
  issuer: 'https://dev-77850755.okta.com/oauth2/default',
  clientId: '0oa87cby96ekUQfqe5d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email']
});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    OktaAuthModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
