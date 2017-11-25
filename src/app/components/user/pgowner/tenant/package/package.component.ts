import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TenantModel} from "../../../../../models/pgowner/tenant";
import {UserService} from "../../../../../services/user/user.service";
import {CommonService} from "../../../../../services/common/common.service";
var _ = require('lodash');

declare var $:any;
@Component({
  selector: 'pg-owner',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})

export class PackageComponent implements OnInit {

  @Input() tenantModel:TenantModel = new TenantModel({});
  error:any;

  constructor(private router:Router,
              private $common:CommonService,
              private userService:UserService) {

  }

  ngOnInit() {
    debugger;
    let options =
    {
     tenant: this.userService.getUser()._id
    };

    console.log(this.userService.getUser()._id)
    this.$common.service("/api/tenants").find({
      query:options
    }).then(tenant=> {
        this.tenantModel=tenant[0];
      console.log(JSON.stringify(this.tenantModel))
    }).catch(error => {
      this.$common.error(error)
    });
  }


  goBack() {
    window.history.back();
  }


}

