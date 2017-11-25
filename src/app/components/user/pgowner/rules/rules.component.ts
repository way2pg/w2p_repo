import {Component, Input, OnInit} from '@angular/core';
import {RulesModel} from "../../../../models/rules";
import {ServiceRequest} from "../../../../services/service_request/service_request";
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../../../services/user/user.service";
import {SocketService, RestService} from "../../../../services/feathersjs/feathers.service";
import {User} from "../../../../models/profile";
import {CommonService} from "../../../../services/common/common.service";
var _ = require('lodash');

declare var $:any;
@Component({
  selector: 'pg-owner',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})

export class RulesComponent implements OnInit {
  @Input() user:User;
  @Input() rule:RulesModel = new RulesModel({});
  rules:RulesModel[] = [];
  error:any;
  isDataAvailable:boolean = true;
  private subscription:Subscription;

  constructor(private serviceRequest:ServiceRequest,
              private userService:UserService,
              private $common:CommonService) {

  }

  ngOnInit() {
    var self = this;
    this.get_rules();

    this.$common.service("/api/rules").on("created", rules => {
      debugger;
      if (!_.isEmpty(rules)) {
        $(".datatable-basic").DataTable().destroy()
        self.rules.push(rules);
        this.isDataAvailable = false;
        self.rule = new RulesModel({});
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  private get_rules() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.$common.service("/api/rules").find({
      query: {
        createdBy: user._id
      }
    })
      .subscribe(rules => {
        if (!_.isEmpty(rules)) {
          $(".datatable-basic").DataTable().destroy()
          this.rules = rules;
          this.isDataAvailable = false;
        }
      }).catch(error => {
      this.$common.error(error)
    });
  }

  /*updateRequest(request:RequestModel, cstatus:string) {
   request.status = cstatus;
   // request.userId=this.user._id;
   this.serviceRequest.updateRequest(request).then(message => {
   if (message && message === "Success") {
   $("#full_history_close").click();
   }
   }).catch(error => this.error = error);

   }*/

  upsert() {
    debugger;
    if (this.rule._id) {
      this.rule.updatedBy = this.userService.getUser();
      this.$common.service("/api/rules").update(this.rule._id, this.rule).then(rule => {
        if (rule) {
          this.$common.notify().success("Rule updated successfully.");
        }
      }).catch(error => {
        this.$common.error(error)
      });
    } else {
      this.rule.createdBy = this.userService.getUser();
     this.$common.service("/api/rules").create(this.rule).then(rule => {
        if (rule) {
          this.$common.notify().success("Rule added successfully.");
        }
      }).catch(error => {
       this.$common.error(error)
     });
    }
  }

  delete(rule) {
    debugger;
    this.$common.service("/api/rules").remove(rule._id).then(rule => {
      if (rule) {
        this.get_rules();
        this.$common.notify().success("Rule deleted successfully.");
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  update(rule) {
    this.rule = rule;
    $("#rule").focus();
  }


}
