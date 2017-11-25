import {Component, OnInit, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {CommonService} from "../../../services/common/common.service";
import {AboutUsService} from "../../../services/common/aboutus.service";
import {Aboutus} from "../../../models/aboutus";

declare var $:any;
var _ = require('lodash');
declare var PNotify:any;

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutUsComponent implements OnInit,OnDestroy,AfterViewInit {

  @Input() aboutus:Aboutus = new Aboutus({});
  code = null;
  isEditing = false;

  constructor(private $common:CommonService,
              private $aboutus:AboutUsService) {
  }

  ngOnInit() {

    this.$aboutus.find({}).then(aboutus => {
      if (!_.isEmpty(aboutus)) {
        this.aboutus = aboutus[0];
      }
    }).catch(error => {
      this.$common.error(error)
    });


  }

  save() {
    debugger;
    this.aboutus.aboutus = $('.summernote').summernote("code");
    this.$aboutus.upsert(this.aboutus).then(response => {
      console.log(response)
      if (!_.isEmpty(response)) {
        this.success("Data saved successfully.")
        this.isEditing = false;
        $('.summernote').summernote('destroy');
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  edit() {
    let self = this;
    this.isEditing = true;
    $('.summernote').summernote('code', this.aboutus.aboutus);

    $("div.note-toolbar.panel-heading > div.note-btn-group.btn-group.note-insert").remove();
    $(".btn-fullscreen").remove();
    $("div.note-toolbar.panel-heading > div:nth-child(7) > button:nth-child(2)").remove();
    $(".note-toolbar").append('<div class="note-btn-group btn-group note-view"> <div class="note-btn-group btn-group note-view"><button type="button" class="note-btn btn btn-default btn-sm btn-save" tabindex="-1" title="Save"><i class="icon-database-add position-left"></i>Save</button></div>')
    $(".btn-save").click(function () {
      self.save();
    })
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
}
