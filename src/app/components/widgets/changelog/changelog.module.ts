import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChangelogComponent} from "./changelog.component";
import {NotificationService} from "../../../services/pgowner/notification.service";
import {AuthGuard} from "../../auth/_guards/auth.guard";
import {ChangelogRoutingModule} from "./changelog.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ChangelogRoutingModule
  ],
  declarations: [
    ChangelogComponent
  ],
  providers: [
    AuthGuard,
    NotificationService
  ]
})
export class ChangelogModule {
}
