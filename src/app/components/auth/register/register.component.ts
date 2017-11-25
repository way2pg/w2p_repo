import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {CommonService} from "../../../services/common/common.service";
import {User} from "../../../models/profile";
import {UserService} from "../../../services/user/user.service";
import {CountryService} from "../../../services/common/countries.service";
declare var $:any;
const _ = require('lodash');
declare var PNotify:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,AfterViewInit {
  error:any;
  user:User = new User({});

  constructor(private $common:CommonService,
              private $countries:CountryService,
              private $users:UserService) {
  }


  ngOnInit():void {

    $('.dropdown').dropdown();

    this.$countries.find({
      query: {
        name: "India"
      }
    }).then(response => {
      this.user.country = response[0];
    })
  }


  register(event:any) {
    debugger;
    this.$users.find({
      query: {
        $or: [{email: this.user.email}, {mobile: this.user.mobile}]
      }
    }).then(user=> {
      debugger;
      if (_.isEmpty(user)) {
        this.$users.create(this.get()).then(response => {
          if (!_.isEmpty(response)) {
            this.success("Acount created successfuly.");
            this.$common.router().navigate(['/auth/login'])
          }
        });
      } else {
        this.warning("Email or Mobile are already exist.");
      }
    });
  }

  get() {
    debugger;
    this.user.gender = $(".register_gender").dropdown("get value");
    this.user.role = $(".register_role").dropdown("get value");
    this.user.displayName = this.user.firstName;
    console.log(this.user.role)
    if (_.isEqual(this.user.gender, "Male")) {
      this.user.coverImg = "/assets/images/cover_img.jpg";
      this.user.profileImg = "/assets/img/elliot.jpg";
    } else {
      this.user.coverImg = "/assets/images/cover_img.jpg";
      this.user.profileImg = "/assets/img/elyse.png";
    }
    console.log(this.user)
    return this.user;
  }

  ngAfterViewInit() {
    let self = this;

    $('.ui.form')
      .form({
        on: 'blur',
        fields: validationRules,
        inline: true,
        onSuccess: function (event) {
          self.register(event);
          return false; // false is required if you do don't want to let it submit
        },

      });
  }

  success(message) {
    new PNotify({
      title: 'Success!!',
      text: message,
      addclass: 'alert bg-success alert-styled-left',
    });
  }

  warning(message) {
    new PNotify({
      title: 'Warning!!',
      text: message,
      addclass: 'alert bg-danger alert-styled-left'
    });
  }

}

let validationRules = {
  gender: {
    identifier: 'register_gender',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select gender'
      }
    ]
  },
  name: {
    identifier: 'username',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter your name'
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
        type: 'regExp[/^[0-9]{10}$/]',
        prompt: 'Please enter a 10 digits mobile number in format XXXXXXXXXX'
      }
    ]
  },
  password: {
    identifier: 'password',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter valid password'
      }
    ]
  }
}
