import {Component, OnInit, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {CommonService} from "../../../../services/common/common.service";
import {ConfigService} from "../../../../services/config/config.service";
import {MailConfigService} from "../../../../services/config/mail-config.service";
import {MailConfig} from "../../../../models/config/mail-config";

declare var $:any;
var _ = require('lodash');

@Component({
  selector: 'app-pgsubscribe',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailConfigComponent implements OnInit,OnDestroy,AfterViewInit {
  @Input() config:MailConfig = new MailConfig({});
  @Input() configs:MailConfig[];
  error:any;
  isDataAvailable:boolean = true;
  _id;



  constructor(private $common:CommonService,
              private $config:MailConfigService) {
  }

  ngOnInit() {
    $('.mail-config').hide()
    this.activateDataTable();
    var self = this;
    this.get();
  }

  get() {
    debugger;
    let self = this;
    this.$config.find({}).then(configs => {
      $(".mail-datatable-basic").DataTable().destroy()
      self.configs = (configs) ? configs : [];
      setTimeout(() => {
        this.activateDataTable()
        $('.mail-config').show()
        $("#spinner").hide();
      }, 50)
    }).catch(error => {
      this.$common.error(error)
    });
  }

  save($event) {
    this.config.isEnabled = _.isEqual($(".status").dropdown("get value"), "false") ? false : true;
    this.$config.create(this.config).then(response => {
      if (response) {
        this.$common.notify().success("Config values are added successfuly.");
        this.get()
      }
    }).catch(error => {
      this.$common.error(error)
    });
    this.config = new MailConfig({});
  }

  public ngOnDestroy() {

  }

  ngAfterViewInit() {
    $('.select').select2();
  }

  edit(config:MailConfig) {
    this.config = config;
    $('.status').val(_.toString(this.config.isEnabled)).trigger('change');
    $("#host").focus();

  }

  update() {
    this.config.isEnabled = _.isEqual($(".status").dropdown("get value"), "false") ? false : true;
    this.$config.patch(this.config._id, this.config).then(response => {
      this.$common.notify().success("Mail configuration details updated successfuly");
      this.get()
    }).catch(error => {
      this.$common.error(error)
    });
  }
  cancel() {
    this.get()
  }

  private activateDataTable() {
    $('.mail-config').hide()
    $("#spinner").show();
    $.extend($.fn.dataTable.defaults, {
      autoWidth: false,
      columnDefs: [{
        width: '20%',
        targets: 0
      }],
      dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
      language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      }
    });

    $('.mail-datatable-basic').DataTable({
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="icon-three-bars"></i> <span class="caret"></span>',
          className: 'btn bg-blue btn-icon',
          collectionLayout: 'fixed two-column',
          postfixButtons: [ 'colvisRestore' ]
        }
      ]
    });

    $('.dataTables_filter input[type=search]').attr('placeholder', 'Type to filter...');

    $('.dataTables_length select').select2({
      minimumResultsForSearch: Infinity,
      width: 'auto'
    });
  }


}
