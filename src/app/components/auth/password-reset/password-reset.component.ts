import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {CommonService} from "../../../services/common/common.service";
var _ = require('underscore');
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit,AfterViewInit {
  error:any;
  email:string = "";

  ngOnInit():void {

  }

  constructor(private router:Router,
              private authService:AuthService,
              private $common:CommonService,
              private activatedRoute:ActivatedRoute) {
  }

  reset() {
    debugger;
    if(!this.email) {
      this.$common.notify().warning('Please provide your email so we can send you a reset password email.')
      return false
    }
    let email = this.email;
    let options = {
      action: 'sendResetPwd',
      value: {email}
    }
    this.$common.service("authManagement").create(options).then(response => {
      if(!_.isNull(response)){
        this.$common.notify().success('Please check your email. A link to reset your password has been sent.')
      }
    }).catch(error => {
      this.$common.notify().warning('Error sending reset password email')
    })

  }

  isLoggedIn() {
    return this.$common.isLoggedIn();
  }
  ngAfterViewInit() {
    let self = this;
    $('.ui.form')
      .form({
        fields: validationResetRules,
        inline: true,
        onSuccess: function () {
          self.reset();
          return false;
        },
      });
  }

  showLeftMenu() {
    if ((!this.isLoggedIn() && (
      _.includes(this.router.url, "/home") ||
      _.includes(this.router.url, "/auth/login") ||
      _.includes(this.router.url, "/auth/register") ||
      _.includes(this.router.url, "/howitworks") ||
      _.includes(this.router.url, "/support") ||
      _.includes(this.router.url, "/referrals_home") ||
      _.includes(this.router.url, "/auth/reset"))) || _.includes(this.router.url, "/home")) {
      return true;
    } else {
      return false;
    }
  }
}

let validationResetRules = {
  email: {
    identifier: 'email',
    rules: [
      {
        type: 'email',
        prompt: 'Please enter a valid e-mail'
      }
    ]
  }
}

