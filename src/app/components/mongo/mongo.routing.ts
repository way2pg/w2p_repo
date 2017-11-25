import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MongoComponent} from "./mongo.component";



export const routes: Routes  = [
  {
    path: '',
    component: MongoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MongoRoutingModule {
}
