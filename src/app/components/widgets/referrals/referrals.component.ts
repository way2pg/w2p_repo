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
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})

export class ReferralsComponent implements OnInit,OnDestroy {

  @Input() referral:Referrals = new Referrals({});
  error:any;
  isDataAvailable:boolean = true;
  @Input() referrals:Referrals[];
  @Input() show:boolean=false;

  constructor(private userService:UserService,
              private $common:CommonService,
              private request_service:ServiceRequest) {
    debugger;

  }

  ngOnInit() {

    var self = this;

   this.$common.service("/api/referrals").find().then(referrals => {
      debugger;
      if (!_.isEmpty(referrals)) {
        $(".datatable-basic").DataTable().destroy()
        self.isDataAvailable = false;
        self.referrals = referrals;
      } else {
        self.isDataAvailable = true;
      }
    })

    $('.ui.form')
      .form({
        fields: validationRules,
        inline: true,
        onSuccess: function () {
          debugger;
          self.save();
          return false; // false is required if you do don't want to let it submit
        },

      });

  }

  save() {
    this.referral.referral_code = cc.generate({parts: 3});
    this.referral.status = "Not Joined";
    this.referral.updatedBy = this.referral.createdBy = this.userService.getUser();
    this.$common.service("/api/referrals").create(this.referral);
    this.referral = new Referrals({});
  }


  public ngOnDestroy() {

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

