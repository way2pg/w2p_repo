import {NgModule} from '@angular/core';
import {AuthGuard} from "../../auth/_guards/auth.guard";
import {SharedModule} from "../shared/shared.module";
import {ReferearnComponent} from "./referearn.component";
import {ReferearnRoutingModule} from "./referearn.routing";


@NgModule({
  imports: [
    SharedModule,
    ReferearnRoutingModule,
  ],
  declarations: [
    ReferearnComponent,
  ],
  providers: [
    AuthGuard
  ]
})
export class ReferearnModule {
}
