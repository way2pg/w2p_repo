import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";
import {ActivatedRoute, Params} from '@angular/router';
import {User} from "../../../../models/profile";
import {RequestModel} from "../../../../models/requests/request";
import {ServiceRequest} from "../../../../services/service_request/service_request";
import {SocketService, RestService} from "../../../../services/feathersjs/feathers.service";
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from "../../../../services/common/common.service";
declare var $:any;
const _ = require('lodash');
const moment = require("moment")
const slimScroll = require("jquery-slimscroll")


@Component({
  selector: 'pg-owner',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements OnInit {
  @Input() user:User;
  @Input() requests:RequestModel[];
  @Input() modelData:RequestModel = new RequestModel({});
  error:any;
  @Input() request_type:any = "";
  isDataAvailable:boolean = true;
  private subscription:Subscription;

  inprogress = 0;
  pending = 0;
  closed = 0;
  resolved = 0;
  @Input() comment;

  index = 0;
  selectedRow:Number = 0;

  constructor(private $service:ServiceRequest,
              private activatedRoute:ActivatedRoute,
              private $common:CommonService) {

  }

  ngOnInit() {
    var self = this;
    this.getRequests();

    $('.ui.dropdown')
      .dropdown()
    ;

    this.$service.service.on("patched", (request) => {
      if (_.isEqual(request._id, this.modelData._id)) {
        this.modelData = request;
        this.getRequests();
      }
    })
  }

  getRequests() {
    let self = this;
    self.inprogress=0;
    self.closed=0;
    self.pending=0;
    self.resolved=0;

    this.$service.find({})
      .then(requests => {
        if (!_.isEmpty(requests)) {
          self.requests = requests;
          _.forEach(self.requests, function (request) {
            if (_.isEqual(request.status, "In Progress")) {
              self.inprogress += 1
            }
            if (_.isEqual(request.status, "Pending")) {
              self.pending += 1
            }
            if (_.isEqual(request.status, "Resolved")) {
              self.resolved += 1
            }
            if (_.isEqual(request.status, "Closed")) {
              self.closed += 1
            }
          });

          self.onFullHistory(self.requests[self.index], self.index)
          setTimeout(() => {
            self.setClickedRow(self.index)
          }, 10)
        }
      }).catch(error => {
      this.$common.error(error)
    });
  }

  updateRequest() {
    let self = this;
    this.modelData.status = $('.ui.dropdown').dropdown('get value');
    this.modelData.comments.push({
      comment: this.comment,
      owner: true,
      createdAt: new Date()
    })
    this.modelData.status = $(".status").dropdown("get value");
    this.$service.patch(this.modelData._id, this.modelData).then(message => {
      if (!_.isEmpty(message)) {
        self.modelData = message;
        $('#content-group').animate({scrollTop: $('#content-group').prop('scrollHeight')}, 1000);
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  getClass(comment) {
    return comment.owner ? "media reversed" : "media";
  }

  fromNow(createAt) {
    return moment(createAt).fromNow();
  }

  // onShown callback
  onFullHistory(request:RequestModel, index) {
    $('#content-group').slimScroll({
      destroy: true
    });
    this.index = index;
    this.modelData = request;
    this.setClickedRow(index)
    $(".ui.dropdown").dropdown("set selected", request.status).dropdown('refresh');
    setTimeout(() => {
      $('#content-group').slimScroll({
        height: '450px',
        start: 'bottom',
      });
      $('#content-group').animate({scrollTop: $('#content-group').prop('scrollHeight')}, 1000);
    }, 50)
  }

  setClickedRow(index) {
    this.selectedRow = index;
  }

}



