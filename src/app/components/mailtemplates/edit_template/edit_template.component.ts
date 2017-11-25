import {Component, OnInit, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {CommonService} from "../../../services/common/common.service";
import {MailTemplateService} from "../../../services/mail/mail_template.service";
import {MailTemplate} from "../../../models/mail_templates/mail_templates";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Http} from '@angular/http';

const io = require('socket.io-client');

declare var $:any;
var _ = require('lodash');
declare var PNotify:any;

@Component({
  selector: 'app-mailtemplate',
  templateUrl: './edit_template.component.html',
  styleUrls: ['./edit_template.component.css']
})
export class EditMailTemplateComponent implements OnInit,OnDestroy,AfterViewInit {

  @Input() mail_template:MailTemplate = new MailTemplate({});

  code = null;
  isEditing = false;
  socket;

  constructor(private $common:CommonService,
              private $mail_template:MailTemplateService,
              private route:ActivatedRoute,
              private router:Router,
              private http:Http) {
  }

  ngOnInit() {
    this.socket = io('http://localhost:4300');
    if (this.route.snapshot.params['id']) {
      this.$mail_template.get(this.route.snapshot.params['id']).then(mailtemplate => {
        console.log(mailtemplate)
        if (!_.isEmpty(mailtemplate)) {
          this.mail_template = mailtemplate;
          $('.status').val(this.mail_template.isEnabled.toString()).trigger('change');
          $('.summernote').summernote('code', this.mail_template.template);

          $("div.note-toolbar.panel-heading > div.note-btn-group.btn-group.note-insert").remove();
          $(".btn-fullscreen").remove();
          $("div.note-toolbar.panel-heading > div:nth-child(7) > button:nth-child(2)").remove();
          $(".note-toolbar").append('<div class="note-btn-group btn-group note-view"><button type="button" class="note-btn btn btn-default btn-sm btn-back" tabindex="-1" title="Back"><i class="icon-arrow-left8 position-left"></i>Back</button></div> <div class="note-btn-group btn-group note-view"><button type="button" class="note-btn btn btn-default btn-sm btn-save" tabindex="-1" title="Save"><i class="icon-database-add position-left"></i>Save</button></div>')
          $(".btn-back").click(function () {
            self.router.navigate(['/mail_templates']);
          })

          $(".btn-save").click(function () {
            self.save();
          })

          $(".btn-testmail").click(function () {
            self.testMail();
          })

        }
      })
    }
    let self = this;
    $('.select').select2();


  }

  save() {
    debugger;
    this.mail_template.template = $('.summernote').summernote("code");
    if (!_.isNull(this.mail_template._id)) {
      this.$mail_template.patch(this.mail_template._id, this.mail_template).then(response => {
        if (!_.isEmpty(response)) {
          this.success("Successfully updated data.");
          this.router.navigate(['/mail_templates']);
        }
      }).catch(error => {

      })
    }
  }

  edit() {
    debugger;
    this.isEditing = true;
    $('.summernote').summernote('code', this.mail_template.template);
  }

  public ngOnDestroy() {

  }

  ngAfterViewInit() {

  }

  success(message) {
    new PNotify({
      title: 'Success!!',
      text: message,
      addclass: 'alert bg-success alert-styled-left',
    });
  }

  warning(message) {
    new PNotify({
      title: 'Warning!!',
      text: message,
      addclass: 'alert bg-danger alert-styled-left'
    });
  }

  checkAdmin() {
    let isAdmin = false;
    if (!_.isNull(this.$common.user()) && !_.isUndefined(this.$common.user())) {
      isAdmin = (_.isEqual(this.$common.user().role, "admin") || _.isEqual(this.$common.user().role, "superadmin"));
    }
    return isAdmin;
  }

  testMail() {
    this.mail_template["user"] = this.$common.user();
    this.$common.io().emit("testMail", this.mail_template)
  }
}
