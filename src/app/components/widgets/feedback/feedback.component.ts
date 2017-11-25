import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SocketService, RestService} from "../../../services/feathersjs/feathers.service";
import {UserService} from "../../../services/user/user.service";
import {Feedback} from "../../../models/feedback";
import {User} from "../../../models/profile";
import {CommonService} from "../../../services/common/common.service";

var _ = require('lodash');

declare var $:any;
@Component({
  selector: 'pg-owner',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {

  @Input() feedback:Feedback = new Feedback({});
  @Input() user:User;
  @Input() feedbacks=[];
  error:any;

  constructor(private router:Router,
              private _socket:SocketService,
              private _rest:RestService,
              private $common:CommonService,
              private userService:UserService) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
   var self=this;
    this._socket._app.service("/api/feedback").on("created",feedback =>{
      this.$common.notify().success("Thanks for providing your feedback");
      $('.ui.rating')
        .rating("clear rating");
      this.feedback.comments="";
    })

    //Getting Keyvalues for ID Proofs.
    this._socket._app.service("/api/keyvalue").find({
      query: {
        type: "feedback"
      }
    }).then(response => {
        self.feedbacks=response;
    }).catch(error => {
      this.$common.error(error)
    });

    $('.ui.rating').rating();
  }

  save($event) {
    debugger;
    $event.preventDefault();
    this.feedback.to = this.user.createdBy;
    this.feedback.createdBy=this.user;
    this.feedback.updatedBy=this.user;
    var object={};
    var ratings=$('.ui.rating').rating("get rating");
    _.each(this.feedbacks,(feedback,i) =>{
      object[feedback.key]=ratings[i];
    })
    this.feedback.ratings=object;
    this._socket._app.service("/api/feedback").create(this.feedback);

  }

  goBack() {
    window.history.back();
  }


}

