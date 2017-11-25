import {Component, OnInit, Input, OnDestroy, ElementRef} from '@angular/core';
import {User} from "../../../../../models/profile";
import {RequestModel} from "../../../../../models/requests/request";
import {ServiceRequest} from "../../../../../services/service_request/service_request";
import {CommonService} from "../../../../../services/common/common.service";
import {ConfigService} from "../../../../../services/config/config.service";


declare var $:any;
const _ = require("lodash")
const moment = require("moment")
const slimScroll = require("jquery-slimscroll")

@Component({
  selector: 'app-service-requests',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestsComponent implements OnInit,OnDestroy {

  @Input() user:User;
  @Input() requests:RequestModel[];
  @Input() servicerequest:RequestModel = new RequestModel({});
  @Input() request_data:RequestModel = new RequestModel({});
  request_types:any;
  error:any;
  @Input() comment:string;
  @Input() request_comment:string;

  inprogress = 0;
  pending = 0;
  closed = 0;
  resolved = 0;
  index = 0;

  selectedRow:Number = 0;


  constructor(private $common:CommonService,
              private $config:ConfigService,
              private $service:ServiceRequest) {
  }

  ngOnInit() {
    debugger;
    var self = this;
    this.user = this.$common.user();

    this.default();

    //Getting Keyvalues for ID Proofs.
    this.$config.find({
      query: {
        type: "service"
      }
    }).then(response => {
      self.request_types = response;
    }).catch(error => {
      this.$common.error(error)
    });

    //Initilizing Dropdown and Dimmer
    $('.ui.selection.dropdown').dropdown({
      on: 'hover'
    });

    $('.ui.checkbox').checkbox();
    this.getRequests();

    this.$service.service.on("patched", (request) => {
      if (_.isEqual(request._id, this.request_data._id)) {
        this.request_data = request;
        this.getRequests();
      }
    })
    this.$service.service.on("created", (request) => {
      if (!_.isNull(request) && !_.isUndefined(request)) {
        this.getRequests();
      }
    })
    /**/
  }

  getRequests() {
    let self = this;
    this.$service.find({})
      .then(requests => {
        console.log(requests)
        if (!_.isEmpty(requests)) {
          self.requests = requests;
          _.forEach(self.requests, function (request) {
            console.log(request)
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
            self.setClickedRow(0)
          }, 10)
        }
      }).catch(error => {
      this.$common.error(error)
    });
  }

  // onShown callback
  onFullHistory(request:RequestModel, index) {
    $('#content-group').slimScroll({
      destroy: true
    });
    this.index = index;
    this.request_data = request;
    this.setClickedRow(index)
    $(".ui.dropdown").dropdown("set selected", request.status).dropdown('refresh');
    setTimeout(() => {
      $('#content-group').slimScroll({
        height: '350px',
        start: 'bottom',
      });
      $('#content-group').animate({scrollTop: $('#content-group').prop('scrollHeight')}, 1000);
    }, 50)
  }

  save() {
    this.servicerequest.comments = []
    let comments = {
      comment: this.request_comment,
      owner: false
    }
    this.servicerequest.comments.push(comments)
    this.servicerequest.request = $(".requesttype").dropdown("get value");
    this.servicerequest.owner = this.user.createdBy;
    this.servicerequest.request_number = moment().valueOf();
    this.$service.create(this.servicerequest).then(response => {
      if (!_.isEmpty(response)) {
        this.$common.notify().success("Request sent successfuly.");
        $("#modal_info_close").click();
        this.servicerequest = new RequestModel({});
        this.request_comment = "";
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  default() {
    this.servicerequest = new RequestModel({});
  }

  public ngOnDestroy() {

  }

  getClass(comment) {
    return !comment.owner ? "media reversed" : "media";
  }


  fromNow(createAt) {
    return moment(createAt).fromNow();
  }

  send() {
    debugger;

    let self = this;
    this.request_data.comments.push({
      comment: this.comment,
      owner: false
    })

    this.$service.patch(this.request_data._id, this.request_data).then(message => {
      if (!_.isEmpty(message)) {
        self.request_data = message;
        self.comment = "";
        $('#content-group').animate({scrollTop: $('#content-group').prop('scrollHeight')}, 1000);
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  setClickedRow(index) {
    this.selectedRow = index;
  }

  ngAfterViewInit() {

  }
}
