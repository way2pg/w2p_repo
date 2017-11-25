import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MongoComponent} from "./mongo.component";
import {AuthGuard} from "../auth/_guards/auth.guard";
import {NotificationService} from "../../services/pgowner/notification.service";
import {MongoRoutingModule} from "./mongo.routing";
import {SharedModule} from "../widgets/shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MongoRoutingModule
  ],
  declarations: [
    MongoComponent
  ],
  providers: [
    AuthGuard,
    NotificationService
  ]
})
export class MongoModule {
}
