import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/profile";
import {AuthService} from "../../../services/auth/auth.service";
import {CommonService} from "../../../services/common/common.service";
import {SupportModel} from "../../../models/support/support";
import {SupportService} from "../../../services/support/support.service";
import {Router, ActivatedRoute, Params} from '@angular/router';

declare var $:any;
const _ = require('lodash');

@Component({
  selector: 'app',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})

export class SupportComponent implements OnInit {

  @Input() user:User;
  @Input() support:SupportModel = new SupportModel({});
  error:any;


  @Input() faq:any = {};
  @Input() comments:string;

  faqs:any = [];

  constructor(private authService:AuthService,
              private userService:UserService,
              private $common:CommonService,
              private router:Router,
              private $support:SupportService) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    let self = this;
    this.userService.find({
      query: {
        $or: [{role: "admin"}, {role: "superadmin"}]
      }
    }).then(response => {
      _.forEach(response, function (value) {
        if (_.isEqual(value.role, "admin")) {
          self.support.admins.push(value.email)
        } else {
          self.support.superadmins.push(value.email)
        }
      });
    }).catch(error => {
      this.$common.error(error)
    });
  }

  save() {

    this.$support.create(this.support).then(response => {
      if (!_.isEmpty(response)) {
        this.$common.notify().success("Thanks for contacting us. Your message has been sent to Way2PG team.");
        this.support.name = this.support.email = this.support.mobile = this.support.location = this.comments = "";
      }
    }).catch(error => {
      this.$common.error(error)
    });

  }

  saveFaq() {
    if (_.hasIn(this.faq, "_id")) {
      this.$common.service("/api/faqs").patch(this.faq._id, this.faq).then(response => {
        if (!_.isEmpty(response)) {
          debugger;
          this.$common.notify().success("Faq successfully updated!!");
          this.faq = {};
          this.find()
        }
      });
    } else {
      this.$common.service("/api/faqs").create(this.faq).then(response => {
        if (!_.isEmpty(response)) {
          debugger;
          this.$common.notify().success("Faq successfully created!!");
          this.faq = {};
          this.find()
        }
      });
    }

  }

  ngAfterViewInit() {
    var self = this;
    $('.ui.form.faq')
      .form({
        fields: validationRules,
        inline: true,
        on: 'blur',
        onSuccess: function () {
          self.saveFaq();
          return false; // false is required if you do don't want to let it submit
        },

      });

    $('.ui.form.support')
      .form({
        fields: supportRules,
        inline: true,
        onSuccess: function () {
          self.save();
          return false; // false is required if you do don't want to let it submit
        },

      });
    this.find();
  }

  find() {
    this.$common.service("/api/faqs").find({}).then(faqs => {
      $(".datatable-basic").DataTable().destroy()
      this.faqs = faqs;
    }).catch(error => {
      this.$common.error(error)
    });
  }

  delete(id) {
    debugger;
    this.$common.service("/api/faqs").remove(id).then(response => {
      if (!_.isEmpty(response)) {
        debugger;
        this.$common.notify().success("Faq successfully deleted!!");
        this.faq = {};
        this.find()
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  edit(faqdata) {
    this.faq = faqdata;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
let validationRules = {}
let supportRules = {

  name: {
    identifier: 'name',
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
  comments: {
    identifier: 'comments',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter comments'
      }
    ]
  },
  location: {
    identifier: 'location',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter your location'
      }
    ]
  },
}
