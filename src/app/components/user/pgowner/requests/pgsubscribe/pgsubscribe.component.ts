import {Component, OnInit, Input,OnDestroy} from '@angular/core';
import {User} from "../../../../../models/profile";
import {UserService} from "../../../../../services/user/user.service";
import {RequestModel} from "../../../../../models/requests/request";
import {ServiceRequest} from "../../../../../services/service_request/service_request";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pgsubscribe',
  templateUrl: './pgsubscribe.component.html',
  styleUrls: ['./pgsubscribe.component.css']
})
export class PgsubscribeComponent implements OnInit,OnDestroy {

  @Input() user:User;
  @Input() pgsubscribe:RequestModel;
  error:any;
  private subscription: Subscription;

  constructor(private userService:UserService,
              private request_service:ServiceRequest) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.pgsubscribe=new RequestModel({});
  }

  save($event) {
   /* $event.preventDefault();
    debugger;
    /!*this.pgsubscribe.userId = this.user._id;*!/
    //this.pgsubscribe.email=this.user.email||;
    this.pgsubscribe.status = "Pending Approval";
    this.pgsubscribe.request_type = "pgsubscribe";
    this.pgsubscribe.createdBy=this.user;
    this.pgsubscribe.updatedBy=this.user;
    this.request_service.sendRequest(this.pgsubscribe);*/

  }

  public ngOnDestroy() {

  }


}
