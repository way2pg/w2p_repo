import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user.routing';
import {UserComponent} from "./user.component";
import {AuthGuard} from "../auth/_guards/auth.guard";
import {NgPipesModule} from 'ngx-pipes';

import {ViewPGsComponent} from "./pgowner/pgdetails/viewpgs/viewpgs.component";
import {AddPGComponent} from "./pgowner/pgdetails/addpg/addpg.component";
import {AddRoomsComponent} from "./pgowner/pgdetails/addrooms/addrooms.component";
import {AddStaffComponent} from "./pgowner/staff-management/add-staff/add-staff.component";
import {AddGroupsComponent} from "../groups/groups.component";
import {NotificationsComponent} from "../notifications/notifications.component";
import {AlertsComponent} from "../Alerts/alerts.component";
import {ReportsComponent} from "./pgowner/reports/reports.component";
import {FoodComponent} from "./pgowner/food/food.component";
import {RequestsComponent} from "./pgowner/requests/requests.component";
import {PGOwnerService} from "../../services/pgowner/pgowner.service";
import {RulesComponent} from "./pgowner/rules/rules.component";
import {PgsubscribeComponent} from "./pgowner/requests/pgsubscribe/pgsubscribe.component";
import {TenantService} from "../../services/pgowner/tenant.service";
import {StaffService} from "../../services/pgowner/staff.service";
import {FoodService} from "../../services/pgowner/food.service";
import {NotificationService} from "../../services/pgowner/notification.service";
import {EmailComponent} from "../notifications/email/email.component";
import {SMSComponent} from "../notifications/sms/sms.component";
import {ViewFoodComponent} from "./pgowner/food/view-food/view-food.component";
import {AddFoodComponent} from "./pgowner/food/add-food/add-food.component";
import {ManageUsersComponent} from "./admin/manage-users/manage-users.component";
import {ViewAdminsComponent} from "./admin/manage-users/view-admins/view-admins.component";
import {ViewOwnersComponent} from "./admin/manage-users/view-owners/view-owners.component";
import {MagnificPopupDirective} from "../../directives/magnific-popup.directive";
import {UploadService} from "../../services/upload/upload.service";
import {ProfileComponent} from "./profile/profile.component";
import {ViewTenantComponent} from "./admin/manage-users/view-tenants/view-tenants.component";
import {ViewStaffComponent} from "./admin/manage-users/view-staff/view-staff.component";
import {ViewUserComponent} from "./admin/manage-users/view-users/view-users.component";
import {FoodRequestComponent} from "./pgowner/food/food-request/food-request.component";
import {ScheduleService} from "../../services/schedule.service";
import {ServiceRequestsComponent} from "./pgowner/requests/service-requests/service-request.component";
import {PackageComponent} from "./pgowner/tenant/package/package.component";
import {ImagesService} from "../../services/images/images.service";
import {FeedbackComponent} from "../widgets/feedback/feedback.component";
import {RatingsDirective} from "../../directives/ratings.directive";
import {WalletComponent} from "../widgets/wallet/wallet.component";
import {SharedModule} from "../widgets/shared/shared.module";
import {ReferralsComponent} from "../widgets/referrals/referrals.component";
import {GroupService} from "../../services/groups/group.service";
import {ConfigService} from "../../services/config/config.service";
import {FoodRequestService} from "../../services/request/food-request.service";
import {ExpenseGroupService} from "../../services/expenses/expense-group.service";
import {ExpenseItemService} from "../../services/expenses/expense-item.service";
import {ExpenseComponent} from "./expenses/expenses.component";
import {ExpenseService} from "../../services/expenses/expense.service";
import {ESettingsComponent} from "./expenses/settings/settings.component";
import {TenantPaymentComponent} from "../payment/rent/payment.component";
import {StaffPaymentComponent} from "../payment/salary/payment.component";
import {ViewSuperAdminsComponent} from "./admin/manage-users/view-superadmins/view-superadmins.component";
import {FoodReportService} from "../../services/reports/food-report.service";
import {TenantModule} from "./pgowner/tenant/tenant.module";
import {AdminGuard} from "../auth/_guards/admin.guard";
import {SuperAdminGuard} from "../auth/_guards/superadmin.guard";
import {SettingsComponent} from "../widgets/settings/settings.component";


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    TenantModule,
    NgPipesModule
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    ViewPGsComponent,
    AddPGComponent,
    AddRoomsComponent,
    AddStaffComponent,
    AddGroupsComponent,
    NotificationsComponent,
    AlertsComponent,
    ReportsComponent,
    FoodComponent,
    RequestsComponent,
    RulesComponent,
    PgsubscribeComponent,
    MagnificPopupDirective,
    RatingsDirective,
    EmailComponent,
    SMSComponent,
    ViewFoodComponent,
    AddFoodComponent,
    ManageUsersComponent,
    ViewAdminsComponent,
    ViewOwnersComponent,
    ViewTenantComponent,
    ViewStaffComponent,
    ViewUserComponent,
    FoodRequestComponent,
    ServiceRequestsComponent,
    PackageComponent,
    TenantPaymentComponent,
    StaffPaymentComponent,
    FeedbackComponent,
    WalletComponent,
    ReferralsComponent,
    ExpenseComponent,
    ESettingsComponent,
    ViewSuperAdminsComponent,

  ],
  providers: [
    AuthGuard,
    AdminGuard,
    SuperAdminGuard,
    PGOwnerService,
    TenantService,
    StaffService,
    FoodService,
    UploadService,
    NotificationService,
    ScheduleService,
    ImagesService,
    GroupService,
    ConfigService,
    FoodRequestService,
    ExpenseGroupService,
    ExpenseItemService,
    ExpenseService,
    FoodReportService,
  ],
  exports: [
    ExpenseComponent,
    ViewTenantComponent,
    ViewStaffComponent,
    ViewAdminsComponent,
    ViewOwnersComponent,
    ViewSuperAdminsComponent,
    ViewUserComponent,
    FoodRequestComponent,

  ],
})
export class UserModule {
}
