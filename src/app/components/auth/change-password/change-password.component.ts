import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {CommonService} from "../../../services/common/common.service";
var _ = require('underscore');
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit,AfterViewInit {
  error:any;
  token:string = "";
  @Input() password:string = "";
  @Input() cpassword:string = "";

  ngOnInit():void {
    this.activatedRoute.params.forEach((params:Params) => {
      debugger;
      if (!_.isEmpty(params)) {
        this.token = params['token'];
        this.authService.isTokenExpires({token: this.token}).then(response => {
          if (response.isTokenExpired) {
          //  this.$common.error(response.message, response.title);
            this.router.navigate(['/auth/login']);
          }
        }).catch(error => {
       //   this.toastr.error(error.json().message, error.json().title);
          this.error = error
        });
      }
    });

    $('.dropdown').dropdown();
  }

  constructor(private router:Router,
              private authService:AuthService,
              private $common:CommonService,
              private activatedRoute:ActivatedRoute) {
  }

  change() {
    if ($('.ui.form.change').form('is valid')) {
      debugger;
      this.authService.updatePassword({token: this.token, password: this.password}).then(response => {
        debugger;
       // this.$common.success(response.message, response.title);
        this.router.navigate(['/auth/login']);
      }).catch(error => {
      //  this.toastr.error(error.json().message, error.json().title);
        this.error = error
      });
    }
  }

  ngAfterViewInit() {
    $('.ui.form')
      .form({
        fields: validationChangeRules,
        inline: true,
        on: 'blur'
      });
  }
}


let validationChangeRules = {
  password: {
    identifier: 'password',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter a password'
      }
    ]
  },
  cpassword: {
    identifier: 'cpassword',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter a password'
      },
      {
        type: 'minLength[6]',
        prompt: 'Your password must be at least {ruleValue} characters'
      },
      {
        type: 'match[password]',
        prompt: 'Password and Confirm Password should be same.'
      }
    ]
  }
}
