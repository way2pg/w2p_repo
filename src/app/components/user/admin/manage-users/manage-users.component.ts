import { Component, Input,OnInit } from '@angular/core';

@Component ({
  selector : 'pg-owner-tenant',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})

export class ManageUsersComponent{


  goBack() {
    window.history.back();
  }


}

