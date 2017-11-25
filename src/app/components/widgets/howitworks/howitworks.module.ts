import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HowitworksComponent} from "./howitworks.component";
import {AuthGuard} from "../../auth/_guards/auth.guard";
import {NotificationService} from "../../../services/pgowner/notification.service";
import {HowitworksRoutingModule} from "./howitworks.routing";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HowitworksRoutingModule,
    SharedModule
  ],
  declarations: [
    HowitworksComponent,
  ],
  providers: [
    AuthGuard
  ]
})
export class HowitworksModule {
}
