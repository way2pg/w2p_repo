import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {User} from "../../models/profile";
import {UserService} from "../../services/user/user.service";
import {RequestModel} from "../../models/requests/request";
import {UploadService} from "../../services/upload/upload.service";
import {ServiceRequest} from "../../services/service_request/service_request";
import {Subscription} from "rxjs/Subscription";
import {CommonService} from "../../services/common/common.service";
import {environment} from "../../../environments/environment.prod";
declare var $:any;
declare var PNotify:any;

var _ = require('lodash');
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit,OnDestroy {
  @Input() user:User = new User({});
  @Input() request_count = 0;
  @Input() IMAGE_URL = environment.IMAGE_URL;

  @Input() uploadId:string;
  @Input() profileImg:string = this.user.profileImg;
  @Input() coverImg:string = this.user.coverImg;

  @Input() requests:RequestModel[];
  loading:any;

  private subscription:Subscription;


  app;

  constructor(private $user:UserService,
              private uploadService:UploadService,
              private request_service:ServiceRequest,
              private $common:CommonService) {
    this.app = this.$common.socket();
    this.user = this.$common.user();
  }

  ngOnInit() {
    var self = this;
    this.profileImg = this.getPhoto();
    this.coverImg = this.getCoverImg();

    this.subscription = this.$common.get().subscribe(object => {
      if (!(_.isUndefined(object) && _.isNull(object))) {
        this.user = object.user;
      }
    });

    /*this.subscription = this.request_service.onCreated().subscribe(request => {
      if (request && request.request_type == "PG Subscribe" && this.$user.getUser().role == "admin") {
        self.request_count = self.request_count + 1;
      }
    })*/
  }

  ngAfterViewInit() {
    // Basic options
    let self = this;
    var $input = this.uploadService.uploadImage("pupload", "Profile image", $);

    $input
      .on("filebatchselected", function (event, files) {
        debugger;
        if (!_.isEqual(files.length, 0)) {
          $input.fileinput("upload");
        } else {
          new PNotify({
            title: 'Warning!!',
            text: 'Please upload valid image',
            addclass: 'alert bg-danger alert-styled-left',
            type: 'error'
          });
        }
      })
      .on('fileuploaded', function (event, data) {
        new PNotify({
          title: 'Success!!',
          text: 'File Uploaded Successfully',
          addclass: 'alert bg-success alert-styled-left',
        });
        self.user['profileImg'] = "api/image/download/" + data.response.fileid;
        self.profileImg = self.getPhoto();

      });
    this.uploadService.uploadImage("cupload", "Cover image", $)
      .on('fileuploaded', function (event, data) {
        self.user['coverImg'] = "api/image/download/" + data.response.fileid;
        self.coverImg = self.getCoverImg();
      });

  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCoverImg() {
    if (_.includes(this.user.coverImg, "assets/images/demo")) {
      return this.user.coverImg;
    } else {
      return this.IMAGE_URL + this.user.coverImg;
    }
  }

  getPhoto() {
    if (_.includes(this.user.profileImg, "assets/images/demo")) {
      return this.user.profileImg;
    } else {
      return this.IMAGE_URL + this.user.profileImg;
    }
  }
}
