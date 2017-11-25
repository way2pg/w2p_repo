import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule}       from './app.routing';

import {AppHeaderComponent} from "./components/widgets/app-header/app-header.component";
import {MainNavBarComponent} from "./components/widgets/navbar/main-navbar.component";
import {UserService} from "./services/user/user.service";
import {AuthenticationService} from "./services/authentication/authentication.service";
import {AuthModule} from "./components/auth/auth.module";
import {AuthGuard} from "./components/auth/_guards/auth.guard";

import {FooterComponent} from "./components/widgets/footer/footer.component";
import {CheckGuard} from "./components/auth/_guards/check.guard";
import {ServiceRequest} from "./services/service_request/service_request";
import {RestService, SocketService} from "./services/feathersjs/feathers.service";
import {SearchComponent} from "./components/search/search.component";
import {SearchPGDetailsComponent} from "./components/search/pg-details/pg-details.component";
import {SearchRoomComponent} from "./components/search/room-details/room-details.component";
import {SearchService} from "./services/search/search.service";
import {OwlDirective} from "./directives/owl.directive";
import {SharedModule} from "./components/widgets/shared/shared.module";
import {NgSpinKitModule} from "ng-spin-kit/dist/spinners";
import {AboutUsComponent} from "./components/widgets/aboutus/aboutus.component";
import {PrivacyPolicyComponent} from "./components/widgets/privacy_policy/privacy_policy.component";
import {CareersComponent} from "./components/widgets/careers/careers.component";
import {TermsConditionsComponent} from "./components/widgets/terms_conditions/terms_conditions.component";
import {HomeComponent} from "./components/home/home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PGOwnerService} from "./services/pgowner/pgowner.service";
import {TenantService} from "./services/pgowner/tenant.service";
import {ConfigService} from "./services/config/config.service";
import {MailTemplateComponent} from "./components/mailtemplates/mailtemplate.component";
import {MailTemplateService} from "./services/mail/mail_template.service";
import {EditMailTemplateComponent} from "./components/mailtemplates/edit_template/edit_template.component";
import {SMSTemplateComponent} from "./components/smstemplates/smstemplate.component";
import {EditSMSTemplateComponent} from "./components/smstemplates/edit_template/edit_template.component";
import {SMSTemplateService} from "./services/sms/smstemplate.service";
import {PGReportService} from "./services/reports/pgreport.service";
import {FoodReportService} from "./services/reports/food-report.service";
import {ExpenseService} from "./services/expenses/expense.service";
import {SupportService} from "./services/support/support.service";
import {AboutUsService} from "./services/common/aboutus.service";
import {CareersService} from "./services/common/careers.service";
import {PrivacyService} from "./services/common/privacy.service";
import {TermsService} from "./services/common/terms.service";
import {AdminGuard} from "./components/auth/_guards/admin.guard";
import {SuperAdminGuard} from "./components/auth/_guards/superadmin.guard";
import {CommentService} from "./services/common/comments";
import {CountryService} from "./services/common/countries.service";
import {StateService} from "./services/common/states.service";
import {CitiService} from "./services/common/cities.service";
import {ReportsComponent} from "./components/reports/reports.component";
import {UserModule} from "./components/user/user.module";
import {AgendaService} from "./services/common/agenda.service";
import {EventService} from "./services/common/events.service";
import {SettingsComponent} from "./components/widgets/settings/settings.component";

@NgModule({
  imports: [
    BrowserModule,
    UserModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    NgSpinKitModule,
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent,
    MainNavBarComponent,
    SearchComponent,
    SearchPGDetailsComponent,
    SearchRoomComponent,
    HomeComponent,
    OwlDirective,
    AboutUsComponent,
    PrivacyPolicyComponent,
    CareersComponent,
    TermsConditionsComponent,
    DashboardComponent,
    MailTemplateComponent,
    EditMailTemplateComponent,
    SMSTemplateComponent,
    EditSMSTemplateComponent,
    ReportsComponent
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    SuperAdminGuard,
    CheckGuard,
    RestService,
    SocketService,
    AuthenticationService,
    UserService,
    MailTemplateService,
    ServiceRequest,
    SearchService,
    TenantService,
    PGOwnerService,
    ConfigService,
    SMSTemplateService,
    PGReportService,
    FoodReportService,
    SupportService,
    ExpenseService,
    AboutUsService,
    CareersService,
    PrivacyService,
    TermsService,
    CommentService,
    CountryService,
    StateService,
    AgendaService,
    CitiService,
    EventService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
