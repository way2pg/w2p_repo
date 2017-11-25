import {NgModule} from '@angular/core';
import {FormsModule}    from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthComponent} from "./auth.component";
import {routing} from './auth.routing';
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {SharedModule} from "../widgets/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    PasswordResetComponent
  ],
  providers: [
    AuthService, UserService
  ]
})
export class AuthModule {
}
