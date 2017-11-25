import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReferearnComponent} from "./referearn.component";

export const routes: Routes  = [
  {
    path: '',
    component: ReferearnComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferearnRoutingModule {
}
