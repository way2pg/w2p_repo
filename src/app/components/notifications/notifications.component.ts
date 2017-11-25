import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/profile";
import {GroupModel} from "../../models/pgowner/groups";
import {NotificationService} from "../../services/pgowner/notification.service";
import {Subscription} from "rxjs/Subscription";
import {SocketService} from "../../services/feathersjs/feathers.service";
import {GroupService} from "../../services/groups/group.service";
import {CommonService} from "../../services/common/common.service";

declare var $:any;
var root:any;
var Ps = require('perfect-scrollbar');
var _ = require('lodash');

@Component({
  selector: 'pg-owner',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit, AfterViewInit {

  @Input() groups:GroupModel[];
  type:boolean=true;

  _type:Subscription;

  users = [];
  admins = []
  superadmins = []
  pgowners = []
  staff = []
  tenants = []

  _suser:Subscription;
  _sgroup:Subscription;

  constructor(private router:Router,
              private $user:UserService,
              private $group:GroupService,
              private notificationsService:NotificationService,
              private elementRef:ElementRef,
              private $common:CommonService) {
    root = elementRef.nativeElement;

  }

  ngOnInit() {

    if(_.isEqual(this.$common.user().role,"pgowner")){
      this.$user.find({
        query: {
          createdBy: this.$common.user()._id
        }
      })
        .then(response => {
          debugger;
          console.log(response)
          if (!_.isEmpty(response)) {
            let userslist = _.groupBy(response, "role");
            this.users = userslist.user;
            this.admins = userslist.admin;
            this.superadmins = userslist.superadmin;
            this.pgowners = userslist.pgowner;
            this.staff = userslist.staff;
            this.tenants = userslist.tenant;
            console.log(this.users)
          }
        });
    } else if(_.isEqual(this.$common.user().role,"admin") || _.isEqual(this.$common.user().role,"superadmin")){
      this.$user.find({})
        .then(response => {
          debugger;
          if (!_.isEmpty(response)) {
            let userslist = _.groupBy(response, "role");
            this.users = userslist.user;
            this.admins = userslist.admin;
            this.superadmins = userslist.superadmin;
            this.pgowners = userslist.pgowner;
            this.staff = userslist.staff;
            this.tenants = userslist.tenant;
            console.log(this.users)
          }
        });
    }


    // Getting Groups
    this.$group.find({
      query: {
        createdBy: this.$common.user().createdBy
      }
    }).then(groups => {
      if (!_.isEmpty(groups)) {
        console.log(_.size(groups))
        console.log(groups)
        this.groups = groups;
      }
    });

  }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {
    Ps.initialize(root.querySelector("#contacts"));
    this._type = this.notificationsService.gettype().subscribe(type => {
      console.log("=============== " + type);
      this.type = type;
    });
  }

  onClickUser(user:User, toorcc:string) {
    this.notificationsService.setMail({
      user: user,
      toorcc: toorcc,
      type: "user",
      mailtag: "." + toorcc + "Mailtags"
    });
  }

  onClickGroup(groupModel:GroupModel, toorcc:string) {
    this.notificationsService.setMail({
      user: groupModel,
      toorcc: toorcc,
      type: "group",
      mailtag: "." + toorcc + "Mailtags"
    });
  }

  sendSMSGroup(groupModel:GroupModel) {
    this.notificationsService.setSMS({
      user: groupModel,
      type: "group"
    });
  }

  sendSMS(user:User) {
    this.notificationsService.setSMS({
      user: user,
      type: "user"
    });
  }

  ngOnDestroy():void {
    this._type.unsubscribe();
  }
}
