import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GroupModel} from "../../models/pgowner/groups";
import {UserService} from "../../services/user/user.service";
import {StaffModel} from "../../models/pgowner/staff";
import {User} from "../../models/profile";
import {CommonService} from "../../services/common/common.service";
import {GroupService} from "../../services/groups/group.service";

declare var $:any;
var _ = require('lodash');

@Component({
  selector: 'pg-owner',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class AddGroupsComponent {
  @Input() staffMembers:StaffModel[];
  @Input() users:User[];
  @Input() group:GroupModel = new GroupModel({});

  @Input() values:any = [];
  error:any;
  private _staffMembers:Object = {};
  private _tenants:Object = {};
  user;
  disabled="";

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $common:CommonService,
              private $group:GroupService,
              private $user:UserService) {
    this.user = this.$common.user();
  }

  ngOnInit() {
    this.$user.find({})
      .then(users => {
        if (!_.isEmpty(users)) {
          this.users = users;
        }
      });

    $('.ui.selection.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
  }

  click(type:boolean, user:User, index:number) {
    this.group.members.push(user);
    this.users.splice(index, 1);
  }

  deleteMember(user:User, index:number) {
    debugger;
    console.log("this.group.members[index] - " + this.group.members[index]);
    this.users.push(user);
    this.group.members.splice(index, 1);
  }

  save() {

    this.$group.create(this.group).then(response => {
      if (!_.isEmpty(response)) {
        this.$common.notify().success("Group Created successfully!");
        this.router.navigateByUrl('/user/notifications/email');
      }
    }).catch(error => {
      this.error = error
    });
  }

}
