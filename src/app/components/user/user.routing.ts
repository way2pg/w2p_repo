import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from "./user.component";
import {AuthGuard} from "../auth/_guards/auth.guard";

import {AddTenantComponent} from "./pgowner/tenant/add-tenant/add-tenant.component";
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
import {RulesComponent} from "./pgowner/rules/rules.component";
import {PgsubscribeComponent} from "./pgowner/requests/pgsubscribe/pgsubscribe.component";
import {EmailComponent} from "../notifications/email/email.component";
import {SMSComponent} from "../notifications/sms/sms.component";
import {ViewFoodComponent} from "./pgowner/food/view-food/view-food.component";
import {AddFoodComponent} from "./pgowner/food/add-food/add-food.component";
import {ViewAdminsComponent} from "./admin/manage-users/view-admins/view-admins.component";
import {ViewOwnersComponent} from "./admin/manage-users/view-owners/view-owners.component";
import {ProfileComponent} from "./profile/profile.component";
import {ViewUserComponent} from "./admin/manage-users/view-users/view-users.component";
import {ViewTenantComponent} from "./admin/manage-users/view-tenants/view-tenants.component";
import {ViewStaffComponent} from "./admin/manage-users/view-staff/view-staff.component";
import {ServiceRequestsComponent} from "./pgowner/requests/service-requests/service-request.component";
import {PackageComponent} from "./pgowner/tenant/package/package.component";
import {FeedbackComponent} from "../widgets/feedback/feedback.component";
import {WalletComponent} from "../widgets/wallet/wallet.component";
import {ReferralsComponent} from "../widgets/referrals/referrals.component";
import {FoodRequestComponent} from "./pgowner/food/food-request/food-request.component";
import {ExpenseComponent} from "./expenses/expenses.component";
import {ESettingsComponent} from "./expenses/settings/settings.component";
import {TenantPaymentComponent} from "../payment/rent/payment.component";
import {StaffPaymentComponent} from "../payment/salary/payment.component";
import {ViewSuperAdminsComponent} from "./admin/manage-users/view-superadmins/view-superadmins.component";
import {AdminGuard} from "../auth/_guards/admin.guard";
import {SuperAdminGuard} from "../auth/_guards/superadmin.guard";
import {CheckGuard} from "../auth/_guards/check.guard";

const AUTH_ROUTES:Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      /*{
       path: 'manage',
       component: ManageUsersComponent,
       children:[
       {
       path: 'admin/:role',
       component: ViewAdminsComponent
       },
       {
       path: 'user/:role',
       component: ViewAdminsComponent
       },
       {
       path: 'users',
       component: ViewOwnersComponent
       }
       ]
       }*/


      {
        path: 'admins',
        component: ViewAdminsComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'superadmins',
        component: ViewSuperAdminsComponent,
        canActivate: [SuperAdminGuard]
      },
      {
        path: 'users',
        component: ViewUserComponent
      },
      {
        path: 'tenant/payment',
        component: TenantPaymentComponent
      },
      {
        path: 'staff/payment',
        component: StaffPaymentComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      },
      {
        path: 'pgowners',
        component: ViewOwnersComponent
      },
      {
        path: 'tenants',
        component: ViewTenantComponent
      },
      {
        path: 'staff',
        component: ViewStaffComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: 'profile/:id/:disabled',
        component: ProfileComponent
      },
      {
        path: 'addtenant',
        component: AddTenantComponent
      },
      {
        path: 'addtenant/:id',
        component: AddTenantComponent
      },
      {
        path: 'addtenant/:id/:view',
        component: AddTenantComponent
      },
      {
        path: 'viewpgs',
        component: ViewPGsComponent
      },
      {
        path: 'addpg',
        component: AddPGComponent
      },
      {
        path: 'addpg/:id',
        component: AddPGComponent
      }
      , {
        path: 'addrooms/:pgId',
        component: AddRoomsComponent
      }, {
        path: 'addrooms/:pgId/:roomId',
        component: AddRoomsComponent
      },
      {
        path: 'addstaff',
        component: AddStaffComponent
      },
      {
        path: 'addstaff/:id',
        component: AddStaffComponent
      },
      {
        path: 'addstaff/:id/:view',
        component: AddStaffComponent
      },
      {
        path: "addgroup",
        component: AddGroupsComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        children: [
          {
            path: 'email',
            component: EmailComponent
          },
          {
            path: 'sms',
            component: SMSComponent
          }
        ]
      }, {
        path: 'alerts',
        component: AlertsComponent
      },
      /*{
        path: 'reports',
        component: ReportsComponent
      },*/
      {
        path: 'package',
        component: PackageComponent
      },
      {
        path: 'food/list',
        component: FoodComponent
      },
      {
        path: 'food/view',
        component: ViewFoodComponent
      },
      {
        path: 'food/view/:id',
        component: ViewFoodComponent
      },
      {
        path: 'food/add',
        component: AddFoodComponent
      },
      {
        path: 'food/add/:id',
        component: AddFoodComponent
      }
      /*{
       path: 'food',
       component: FoodComponent,
       children: [

       ]
       }*/,
      {
        path: 'food/requests',
        component: FoodRequestComponent
      },
      {
        path: 'requests/:type',
        component: RequestsComponent
      },
      {
        path: 'service/requests',
        component: ServiceRequestsComponent
      },
      {
        path: 'pgsubscribe',
        component: PgsubscribeComponent
      },
      {
        path: 'rules',
        component: RulesComponent
      },
     /* {
        path: 'wallet',
        component: WalletComponent
      },*/
      {
        path: 'referrals',
        component: ReferralsComponent
      },
      {
        path: 'expenses',
        component: ExpenseComponent
      },
      {
        path: 'expenses/settings',
        component: ESettingsComponent
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
