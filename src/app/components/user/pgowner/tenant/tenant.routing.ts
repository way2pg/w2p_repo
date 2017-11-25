import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddTenantComponent} from "./add-tenant/add-tenant.component";

const AUTH_ROUTES:Routes = [
  {
    path: '',
    component: AddTenantComponent
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
  }
]

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule]
})

export class TenantRoutingModule {
}
