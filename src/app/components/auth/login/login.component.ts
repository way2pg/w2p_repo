import {Component, Input, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {CommonService} from "../../../services/common/common.service";
import {UserService} from "../../../services/user/user.service";

declare var $:any;
var _ = require('lodash');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {
  model:any = {};
  error:any;
  returnUrl:string = null;

 

  constructor(private activatedRoute:ActivatedRoute,
              private authService:AuthService,
              private router:Router,
              private $common:CommonService,
              private $user:UserService) {

  }

  ngOnInit() {

    this.returnUrl = this.activatedRoute.snapshot.params['returnUrl'];

  }

  ngAfterViewInit() {
    let self = this;
    $('.ui.checkbox').checkbox();
    $('.ui.form')
      .form({
        fields: validationRules,
        inline: true,
        onSuccess: function () {
          self.login();
          return false; // false is required if you do don't want to let it submit
        },
      });
  }

  login() {
    debugger;
    console.log(this.$common)
    let self = this;
    this.$common.socket().authenticate({
      strategy: 'local',
      email: this.model.email,
      password: this.model.password
    }).then(response => {
      return this.$common.socket().passport.verifyJWT(response.accessToken);
    })
      .then(payload => {
        return this.$common.socket().service('/api/users').get(payload.userId);
      })
      .then(user => {
        debugger;
        if (!user.deleted) {
          this.$common.notify().success("Welcome to PGHub!!");
          this.$common.send(user);
          this.$common.socket().settings.storage['user'] = JSON.stringify(user);
          this.router.navigate([this.returnUrl || "/dashboard"], {relativeTo: this.activatedRoute});
        } else {
          this.$common.notify().warning("Your account was deactivated, Please contact admin to activate account.")
          this.$common.socket().logout();
        }
      })
      .catch(function (error) {
        self.$common.notify().warning("Error authenticating - Invalid login credentials");
      });
  }


}
let validationRules = {
  email: {
    identifier: 'email',
    rules: [
      {
        type: 'email',
        prompt: 'Please enter a valid e-mail'
      }
    ]
  },
  password: {
    identifier: 'password',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter a password'
      }
    ]
  },

}
