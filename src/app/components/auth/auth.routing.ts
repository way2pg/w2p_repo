import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthComponent} from "./auth.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {AuthGuard} from "./_guards/auth.guard";
import {CheckGuard} from "./_guards/check.guard";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const AUTH_ROUTES:Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [CheckGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'reset',
        component: PasswordResetComponent,
      },
      {
        path: 'reset/:token',
        component: ChangePasswordComponent,
      }

    ]
  }
]

export const routing:ModuleWithProviders = RouterModule.forRoot(AUTH_ROUTES);
