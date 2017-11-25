import {Component, OnInit, Input,OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ServiceRequest} from "../../../services/service_request/service_request";
import {RequestModel} from "../../../models/requests/request";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/profile";
import {CommonService} from "../../../services/common/common.service";
const _ = require("lodash")

@Component({
  selector: 'app-howitworks',
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.css']
})

export class HowitworksComponent implements OnInit,OnDestroy{

  @Input() user:User;
  @Input() support:RequestModel;
  error:any;


  constructor(private userService:UserService,
              private $common:CommonService,
              private request_service:ServiceRequest) {
    debugger;
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.support=new RequestModel({});
  }

  save($event) {
    $event.preventDefault();
    debugger;
    /*this.pgsubscribe.userId = this.user._id;*/
    //this.pgsubscribe.email=this.user.email||;
    this.support.status = "In Progress";
    this.support.type = "Support";
    this.request_service.create(this.support).then(response => {
      if(!_.isEmpty(response)){
        this.$common.notify().success("Request sent successfuly.");
        this.support=new RequestModel({});
      }
    }).catch(error => {
      this.$common.error(error)
    });

  }

  public ngOnDestroy() {

  }


}
