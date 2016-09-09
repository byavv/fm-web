import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './components/signIn/signIn';
import { SignUpComponent } from './components/signUp/signup';
import { AuthenticationBase } from './components/authBase';
import { SharedModule } from '../shared';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationBase,
    children: [
      { path: 'signin', component: SignInComponent, pathMatch: 'full' },
      { path: 'signup', component: SignUpComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/' }
    ]
  }
];

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthenticationBase
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export default class RegularSearchModule {
  static routes = routes;
}
