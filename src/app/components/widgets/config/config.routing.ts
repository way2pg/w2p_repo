import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigComponent} from "./config.component";
import {MailConfigComponent} from "./mail/mail.component";
import {SMSConfigComponent} from "./sms/sms.component";



export const routes: Routes  = [
  {
    path: '',
    component: ConfigComponent
  },
  {
    path: 'mail',
    component: MailConfigComponent
  },
  {
    path: 'sms',
    component: SMSConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule {
}
