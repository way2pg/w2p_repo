import {Component, OnInit, Input,OnDestroy} from '@angular/core';
import {ServiceRequest} from "../../../services/service_request/service_request";
import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})

export class WalletComponent implements OnInit,OnDestroy{


  error:any;
  //private subscription: Subscription;

  constructor(private userService:UserService,
              private request_service:ServiceRequest) {
    debugger;

  }

  ngOnInit() {

  }



  public ngOnDestroy() {
   // this.subscription.unsubscribe();
  }


}
