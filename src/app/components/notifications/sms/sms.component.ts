import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../../services/user/user.service";
import {NotificationService} from "../../../services/pgowner/notification.service";
import {SMSModel} from "../../../models/sms";
import {Subscription} from "rxjs/Subscription";
import {CommonService} from "../../../services/common/common.service";
import {EventService} from "../../../services/common/events.service";

declare var $:any;
var _ = require('lodash');


@Component({
  selector: 'notification',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})

export class SMSComponent implements OnInit, AfterViewInit {
  @Input() sms:SMSModel = new SMSModel({});
  notifications:Subscription;

  constructor(private router:Router,
              private userService:UserService,
              private $common:CommonService,
              private $events:EventService,
              private notificationService:NotificationService) {
  }


  ngOnInit() {
    this.notifications = this.notificationService.getSMS().subscribe(sms => {
      debugger;
      if (sms) {
        debugger;
        if (_.isEqual(sms.type, "user")) {
          $('.toSMStags').tagsinput('add',
            {
              id: sms.user._id,
              label: sms.user.mobile,
              content: sms.user.mobile
            }
          );
        } else {
          $('.toSMStags').tagsinput('add', {
            id: sms.user._id,
            label: sms.user.name,
            content: _.map(sms.user.members, 'mobile')
          });
        }
      }

    });

  }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {
    this.notificationService.setType(false);
    $('.toSMStags').tagsinput({
      allowDuplicates: false,
      itemValue: 'id',  // this will be used to set id of tag
      itemText: 'label' // this will be used to set text of tag
    });
  }

  showMailComponent() {
    this.router.navigateByUrl("/user/notifications/email");
  }

  sendSMS() {

    this.sms.mobile = _.map($(".toSMStags").tagsinput('items'), "content").toString().replace(/,/g, ";") + "," + $('.bootstrap-tagsinput input[type="text"]').val()
    console.log(this.sms.mobile)
    this.$events.create({
      "name": "Send SMS",
      "action": "Clicked Send SMS button in Notifications Page",
      "url": this.router.url,
      "message": "Sending SMS",
      "data": this.sms
    }).then(response => {
      this.$common.success("Your message has been sent.");
      this.sms = new SMSModel({});
      $('.toSMStags').tagsinput('removeAll');
      $('.bootstrap-tagsinput input[type="text"]').val('');
    })
  }

  ngOnDestroy():void {
    this.notifications.unsubscribe();
  }
}
