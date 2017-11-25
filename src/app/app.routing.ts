import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";
import {SearchComponent} from "./components/search/search.component";
import {SearchPGDetailsComponent} from "./components/search/pg-details/pg-details.component";
import {SearchRoomComponent} from "./components/search/room-details/room-details.component";
import {AboutUsComponent} from "./components/widgets/aboutus/aboutus.component";
import {PrivacyPolicyComponent} from "./components/widgets/privacy_policy/privacy_policy.component";
import {CareersComponent} from "./components/widgets/careers/careers.component";
import {TermsConditionsComponent} from "./components/widgets/terms_conditions/terms_conditions.component";
import {HomeComponent} from "./components/home/home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MailTemplateComponent} from "./components/mailtemplates/mailtemplate.component";
import {EditMailTemplateComponent} from "./components/mailtemplates/edit_template/edit_template.component";
import {EditSMSTemplateComponent} from "./components/smstemplates/edit_template/edit_template.component";
import {SMSTemplateComponent} from "./components/smstemplates/smstemplate.component";
import {AdminGuard} from "./components/auth/_guards/admin.guard";
import {CheckGuard} from "./components/auth/_guards/check.guard";
import {ReportsComponent} from "./components/reports/reports.component";


export const routes:Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'search/:search_data',
    component: SearchComponent
  },
  {
    path: 'search/pg/details/:id',
    component: SearchPGDetailsComponent
  },
  {
    path: 'search/room/details/:pgid/:id',
    component: SearchRoomComponent
  },
  {
    path: 'app',
    component: AppComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'aboutus',
    component: AboutUsComponent
  },
  {
    path: 'careers',
    component: CareersComponent
  },
  {
    path: 'terms_conditions',
    component: TermsConditionsComponent
  },
  {
    path: 'privacy_policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'mail_templates',
    component: MailTemplateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'mail_templates/edit/:id',
    component: EditMailTemplateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'sms_templates',
    component: SMSTemplateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'sms_templates/edit/:id',
    component: EditSMSTemplateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'mongo',
    loadChildren: "./components/mongo/mongo.moudle#MongoModule",
    canActivate: [AdminGuard]
  },
  {
    path: 'changelog',
    loadChildren: "./components/widgets/changelog/changelog.module#ChangelogModule",
    canActivate: [AdminGuard]
  },
  {
    path: 'support',
    loadChildren: 'app/components/widgets/support/support.module#SupportModule'
  },
  {
    path: 'howitworks',
    loadChildren: "./components/widgets/howitworks/howitworks.module#HowitworksModule"
  },
  {
    path: 'config',
    loadChildren: "./components/widgets/config/config.module#ConfigModule",
    canActivate: [AdminGuard]
  },

  {
    path: 'referrals_home',
    loadChildren: "./components/widgets/referearn/referearn.module#ReferearnModule"
  },
  {
    path: 'user',
    loadChildren: "./components/user/user.module#UserModule"
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'reports/:name',
    component: ReportsComponent
  },
  {
    path: 'reports/:name/:_id',
    component: ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
