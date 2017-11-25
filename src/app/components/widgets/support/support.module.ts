import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SupportComponent} from "./support.component";
import {NotificationService} from "../../../services/pgowner/notification.service";
import {AuthGuard} from "../../auth/_guards/auth.guard";
import {SecondNavBarComponent} from "../navbar/second-navbar.component";
import {DataTableDirective} from "../../../directives/data-table.directive";
import {DataTableWithoutCSSDirective} from "../../../directives/datatable.directive";
import {SupportRoutingModule} from "./support.routing";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  imports: [
    SharedModule,
    SupportRoutingModule,
  ],
  declarations: [
    SupportComponent,
  ],
  providers: [
    AuthGuard
  ]
})
export class SupportModule {
}
