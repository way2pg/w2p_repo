import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PGOwnerService} from "../../../../services/pgowner/pgowner.service";
import {TenantService} from "../../../../services/pgowner/tenant.service";
import {StaffService} from "../../../../services/pgowner/staff.service";
import {FoodService} from "../../../../services/pgowner/food.service";
import {UploadService} from "../../../../services/upload/upload.service";
import {NotificationService} from "../../../../services/pgowner/notification.service";
import {ScheduleService} from "../../../../services/schedule.service";
import {ImagesService} from "../../../../services/images/images.service";
import {AddTenantComponent} from "./add-tenant/add-tenant.component";
import {AuthGuard} from "../../../auth/_guards/auth.guard";
import {SharedModule} from "../../../widgets/shared/shared.module";


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AddTenantComponent
  ],
  providers: [
    AuthGuard,
    PGOwnerService,
    TenantService,
    StaffService,
    FoodService,
    UploadService,
    NotificationService,
    ScheduleService,
    ImagesService
  ]
})
export class TenantModule {
}
