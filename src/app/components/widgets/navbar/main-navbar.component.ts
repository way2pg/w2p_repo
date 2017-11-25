import {Component, Input, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Router, ActivatedRouteSnapshot} from '@angular/router';
import {User} from "../../../models/profile";
import {UserService} from "../../../services/user/user.service";
import {ServiceRequest} from "../../../services/service_request/service_request";
import {Subscription} from "rxjs/Subscription";
import {CommonService} from "../../../services/common/common.service";
import {environment} from "../../../../environments/environment.prod";
import {SearchService} from "../../../services/search/search.service";


const _ = require('lodash');
declare var $:any;
declare var PNotify:any;

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})

export class MainNavBarComponent implements OnInit,OnDestroy,AfterViewInit {

  user:User = null;
  @Input() IMAGE_URL = environment.IMAGE_URL;
  photo:any = "/assets/images/demo/users/face1.jpg";
  private subscription:Subscription;
  hideClass = "icon-drag-left";
  @Input() search_data:any;
  app;

  @Input() oldPassword;
  @Input() password;
  @Input() password_2;

  account:User = new User({});

  constructor(private router:Router,
              private $user:UserService,
              private $common:CommonService,
              private $search:SearchService) {
    this.app = $common.socket();
    console.log(this.user)
  }

  ngOnInit() {
    let self = this;
    this.user = this.$common.user();

    this.subscription = this.$common.get().subscribe(object => {
      if (!(_.isUndefined(object) && _.isNull(object))) {
        this.user = object.user;
      }
    })

    $('#change_password').on('hidden.bs.modal', function () {
      self.oldPassword = "";
      self.password = "";
      self.password_2 = "";
    })

  }


  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hide() {
    this.hideClass = _.isEqual(this.hideClass, "icon-drag-left") ? "icon-drag-right" : "icon-drag-left";
    $('body').toggleClass('sidebar-detached-hidden');
  }

  checkURL() {
    return !(_.isEqual(this.router.url, "/home") || (_.isEqual(this.router.url, "/auth/login"))) && this.$common.isLoggedIn()
  }

  getImage(photo_url) {
    if (_.includes(photo_url, "assets/images/demo") || _.isNull(photo_url)) {
      return this.photo;
    } else {
      return this.IMAGE_URL + photo_url;
    }
  }

  onLogout() {
    if ($("body").hasClass("sidebar-opposite-visible")) {
      $("body").removeClass("sidebar-opposite-visible")
    }
    this.$common.logout();
    this.$common.router().navigate(['/', 'home']);
  }

  isLoggedIn() {
    return this.$common.isLoggedIn();
  }

  change() {

    debugger;
    if (!this.$common.isLoggedIn()) {
      this.$common.notify().warning('You must be logged in to change your password.')
      return false
    } else if (_.isEmpty(this.password) && _.isEmpty(this.password_2)) {
      this.$common.notify().warning('New Password and Repeat password should not be empty.')
      return false
    }
    else if (!_.isEqual(this.password, this.password_2)) {
      this.$common.notify().warning('New Password and Repeat password should be same.')
      return false
    }

    let oldPassword = this.oldPassword;
    let password = this.password;
    let options = {
      action: 'passwordChange',
      value: {
        user: {
          email: this.$common.user().email
        },
        oldPassword,
        password
      }
    }
    console.log(options)
    this.$common.service("authManagement").create(options).then(response => {
      if (!_.isNull(response)) {
        $("#change_password").click();
        this.$common.notify().success('Your current password has been changed. Next time you log in please use the new password.')
      }
      console.log(response)
    }).catch(error => {
      this.$common.error(error)
    });
  }

  create() {
    this.$user.find({
      query: {
        $or: [{email: this.account.email}, {mobile: this.account.mobile}]
      }
    }).then(user=> {
      debugger;
      if (_.isEmpty(user)) {
        this.$user.create(this.get()).then(response => {
          if (!_.isEmpty(response)) {
            this.$common.notify().success("Acount created successfuly.");
            this.account = new User({});
            $('.dropdown').dropdown('restore defaults');
          }
        });
      } else {
        this.$common.notify().warning("Email or Mobile are already exist.");
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  get() {
    debugger;
    this.account.gender = $(".gender").dropdown("get text");
    this.account.role = $(".role").dropdown("get value");
    if (_.isEqual(this.account.gender, "Male")) {
      this.account.coverImg = "/assets/images/cover_img.jpg";
      this.account.profileImg = "/assets/img/elliot.jpg";
    } else {
      this.account.coverImg = "/assets/images/cover_img.jpg";
      this.account.profileImg = "/assets/img/elyse.png";
    }
    return this.account;
  }

  ngAfterViewInit() {
    let self = this;
    $('.ui.form.account')
      .form({
        fields: validationRules,
        inline: true,
        onSuccess: function (event) {
          debugger;
          self.create();
          return false; // false is required if you do don't want to let it submit
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
      _.includes(this.router.url, "/auth/reset"))) ||
      _.includes(this.router.url, "/home") ||
      _.includes(this.router.url, "/search")) {
      return true;
    } else {
      return false;
    }
  }
}
let validationRules = {
  role: {
    identifier: 'role',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select role'
      }
    ]
  },
  gender: {
    identifier: 'gender',
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
        type: 'regExp[/^[+0-9 -]{10,14}$/]',
        prompt: 'Please enter a mobile number in format +XX-XXXXXXXXXX'
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
