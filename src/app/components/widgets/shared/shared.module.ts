import {NgModule} from '@angular/core';
import {HttpModule}     from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {NotificationService} from "../../../services/pgowner/notification.service";
import {Constants} from "../../../config/apiconstants";
import {DataTableWithoutCSSDirective} from "../../../directives/datatable.directive";
import {DataTableDirective} from "../../../directives/data-table.directive";
import {NotifyService} from "../../../services/notify.service";
import {SecondNavBarComponent} from "../navbar/second-navbar.component";
import { RouterModule } from '@angular/router';
import {GroupKeysPipe, KeysPipe, SafePipe} from "../../../pipe/pgpipe.pipe";
import {CommonService} from "../../../services/common/common.service";
import {SettingsComponent} from "../settings/settings.component";
import {FooterComponent} from "../footer/footer.component";


@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    SecondNavBarComponent,
    DataTableDirective,
    DataTableWithoutCSSDirective,
    SafePipe,
    KeysPipe,
    GroupKeysPipe,
    SettingsComponent,
    FooterComponent
  ],
  exports: [
    HttpModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SecondNavBarComponent,
    DataTableDirective,
    DataTableWithoutCSSDirective,
    SafePipe,
    KeysPipe,
    GroupKeysPipe,
    SettingsComponent,
    FooterComponent
  ]
})
export class SharedModule {

  static forRoot() {
    return {
        ngModule: SharedModule,
        providers: [
          CommonService,
          NotificationService,
          NotifyService,
          Constants
        ]
    }
  }

}
