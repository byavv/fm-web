import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './components/signIn/signin';
import { SignUpComponent } from './components/signUp/signup';
import { AuthenticationBase } from './components/authBase';

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
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export default class RegularSearchModule { }
