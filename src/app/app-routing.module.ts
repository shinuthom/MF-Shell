import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { LoginComponent } from './login/login/login.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';

import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  {
    // path: 'users',
    // loadChildren: () =>
    // import('users/Module').then((m) =>
    // m.RemoteEntryModule)

    path: 'users',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${environment.mfUserPortal}/remoteEntry.js`,
        type: 'module',
        exposedModule: './Module',
      }).then((m) => {
        return m.UsersModule;
      }),
  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:4205/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'react1',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:4205/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './react-component-1',
      elementName: 'react-component-1',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'react2',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'react3',
      exposedModule: './react-element3',
      elementName: 'react-element3',
    } as WebComponentWrapperOptions,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
