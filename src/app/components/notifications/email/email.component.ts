import {
  Component,
  Input,
  Output,
  OnInit,
  AfterViewInit,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from "../../../services/pgowner/notification.service";
import {MailModel} from "../../../models/mail";
import {Subscription} from "rxjs/Subscription";
import {CommonService} from "../../../services/common/common.service";
import {EventService} from "../../../services/common/events.service";

var _ = require('lodash');

declare var $:any;
// Define element


@Component({
  selector: 'notification',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() mail:MailModel = new MailModel({});
  notifications:Subscription;

  constructor(private router:Router,
              private notificationService:NotificationService,
              private $events:EventService,
              private $common:CommonService) {

  }

  ngOnInit() {
    let self = this;
    this.notifications = this.notificationService.getMail().subscribe(notification => {
      if (notification) {
        debugger;
        if (_.isEqual(notification.type, "user")) {
          $(notification.mailtag).tagsinput('add', {
            id: notification.user._id,
            label: notification.user.email,
            content: notification.user.email
          });
        } else if (_.isEqual(notification.type, "group")) {
          $(notification.mailtag).tagsinput('add', {
            id: notification.user._id,
            label: notification.user.name,
            content: _.map(notification.user.members, 'email').toString()
          });
        }
      }
    });
  }

  ngAfterViewChecked() {

  }

  add_to_mail() {
    console.log("==================== add_to_mail")
    debugger;
    $(".toMailtags").tagsinput('add', {
      id: $("#to").val(),
      label: $("#to").val(),
      content: $("#to").val()
    });
  }

  add_cc_mail() {
    $(".ccMailtags").tagsinput('add', {
      id: $("#to").val(),
      label: $("#to").val(),
      content: $("#to").val()
    });
  }

  ngAfterViewInit() {
    this.notificationService.setType(true);
    $('.toMailtags').tagsinput({
      allowDuplicates: false,
      itemValue: 'id',  // this will be used to set id of tag
      itemText: 'label' // this will be used to set text of tag
    });
    $('.ccMailtags').tagsinput({
      allowDuplicates: false,
      itemValue: 'id',  // this will be used to set id of tag
      itemText: 'label' // this will be used to set text of tag
    });
    /* $(document).on('click', function (event) {
     $('.bootstrap-tagsinput input[type="text"]').val('');
     });*/

  }

  showSMSComponent() {
    this.router.navigateByUrl("/user/notifications/sms");
  }

  createGroup() {
    this.router.navigateByUrl('/user/addgroup');
  }

  sendMail() {
    this.mail.to = _.map($(".toMailtags").tagsinput('items'), "content").toString().replace(/,/g, ";") + "; " + $('.bootstrap-tagsinput input[type="text"]').val();
    this.mail.cc = _.map($(".ccMailtags").tagsinput('items'), "content").toString().replace(/,/g, ";");
    this.$events.create({
      "name": "Send Mail",
      "action": "Clicked Send Mail button in Notifications Page",
      "url": this.router.url,
      "message": "Sending Mail",
      "data": this.mail
    }).then(response => {
      this.$common.success("Your message has been sent.");
      this.mail= new MailModel({});
      $('.toMailtags').tagsinput('removeAll');
      $('.bootstrap-tagsinput input[type="text"]').val('');
    })
  }

  ngOnDestroy():void {
    this.notifications.unsubscribe();
  }
}
