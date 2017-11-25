import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {ConfigComponent} from "./config.component";
import {ConfigRoutingModule} from "./config.routing";
import {ConfigService} from "../../../services/config/config.service";
import {MailConfigComponent} from "./mail/mail.component";
import {SMSConfigComponent} from "./sms/sms.component";
import {SMSConfigService} from "../../../services/config/sms-config.service";
import {MailConfigService} from "../../../services/config/mail-config.service";


@NgModule({
  imports: [
    SharedModule,
    ConfigRoutingModule,
  ],
  declarations: [
    ConfigComponent,
    MailConfigComponent,
    SMSConfigComponent
  ],
  providers: [
    ConfigService,
    MailConfigService,
    SMSConfigService
  ]
})
export class ConfigModule {
}
