import {Component, OnInit, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {CommonService} from "../../../services/common/common.service";
import {MailTemplateService} from "../../../services/mail/mail_template.service";
import {MailTemplate} from "../../../models/mail_templates/mail_templates";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Http} from '@angular/http';
import {SMSTemplate} from "../../../models/sms_templates/sms_template";
import {SMSTemplateService} from "../../../services/sms/smstemplate.service";

declare var $:any;
var _ = require('lodash');
declare var PNotify:any;

@Component({
  selector: 'app-mailtemplate',
  templateUrl: './edit_template.component.html',
  styleUrls: ['./edit_template.component.css']
})
export class EditSMSTemplateComponent implements OnInit,OnDestroy,AfterViewInit {

  @Input() template:SMSTemplate = new SMSTemplate({});

  code = null;
  isEditing = false;
  socket;

  constructor(private $common:CommonService,
              private $template:SMSTemplateService,
              private route:ActivatedRoute,
              private router:Router,
              private http:Http) {
  }

  ngOnInit() {

    if (this.route.snapshot.params['id']) {
      this.$template.get(this.route.snapshot.params['id']).then(mailtemplate => {
        console.log(mailtemplate)
        if (!_.isEmpty(mailtemplate)) {
          this.template = mailtemplate;
          $('.status').val(this.template.isEnabled.toString()).trigger('change');
          $('.summernote').summernote('code', this.template.template);
          $('.note-toolbar .note-insert, .note-toolbar .note-table, .note-toolbar .note-style:first,.note-font,.note-fontname,.note-view,.note-color, .note-toolbar .note-para').remove();
          $("div.note-toolbar.panel-heading > div.note-btn-group.btn-group.note-insert").remove();
          $(".btn-fullscreen").remove();
          $("div.note-toolbar.panel-heading > div:nth-child(7) > button:nth-child(2)").remove();
          $(".note-toolbar").append('<div class="note-btn-group btn-group note-back"><button type="button" class="note-btn btn btn-default btn-sm btn-back" tabindex="-1" title="Back"><i class="icon-arrow-left8 position-left"></i>Back</button></div> <div class="note-btn-group btn-group note-save"><button type="button" class="note-btn btn btn-default btn-sm btn-save" tabindex="-1" title="Save"><i class="icon-database-add position-left"></i>Save</button></div>')
          $(".btn-back").click(function () {
            self.router.navigate(['/sms_templates']);
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
    this.template.template = $(".summernote").summernote("code");
    this.template.isEnabled = $('.status').val();
    if (!_.isNull(this.template._id)) {
      this.$template.patch(this.template._id, this.template).then(response => {
        if (!_.isEmpty(response)) {
          this.success("Successfully updated data.");
          this.router.navigate(['/sms_templates']);
        }
      }).catch(error => {

      })
    }
  }

  edit() {
    debugger;
    this.isEditing = true;
    $('.summernote').summernote('code', this.template.template);
    $('.note-toolbar .note-insert, .note-toolbar .note-table, .note-toolbar .note-style:first,.note-font,.note-fontname,.note-color,.note-view, .note-toolbar .note-para').remove();
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
    this.template["user"] = this.$common.user();
    this.$common.io().emit("testSMS", this.template)
  }
}
