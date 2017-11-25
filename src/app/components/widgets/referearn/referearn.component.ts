import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ServiceRequest} from "../../../services/service_request/service_request";
import {UserService} from "../../../services/user/user.service";
import {SocketService} from "../../../services/feathersjs/feathers.service";
import {Referrals} from "../../../models/referrals";
import {CommonService} from "../../../services/common/common.service";
var cc = require('coupon-code');
var _ = require('lodash');
declare var $:any;

@Component({
  selector: 'app-referearn',
  templateUrl: './referearn.component.html',
  styleUrls: ['./referearn.component.css']
})

export class ReferearnComponent implements OnInit {

  @Input() referral:Referrals = new Referrals({});
  error:any;
  isDataAvailable:boolean = true;
  private subscription:Subscription;
  @Input() referrals:Referrals[];
  @Input() show:boolean=false;

  constructor(private userService:UserService,
              private $common:CommonService,
              private request_service:ServiceRequest,
              private _socket:SocketService) {
    debugger;

  }

  ngOnInit() {

    var self = this;


  }

  save() {

  }



}

let validationRules = {
  name: {
    identifier: 'name',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter your first name'
      }
    ]
  },
  email: {
    identifier: 'email',
    rules: [
      {
        type: 'email',
        prompt: 'Please enter a valid e-mail'
      }
    ]
  },
  mobile: {
    identifier: 'mobile',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter valid mobile number'
      },
      {
        type: 'regExp[/^[+0-9 -]{10,14}$/]',
        prompt: 'Please enter a mobile number in format +XX-XXXXXXXXXX'
      }
    ]
  }
}

