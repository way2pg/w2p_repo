import {Component, OnInit, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {SMSConfigService} from "../../../../services/config/sms-config.service";
import {SMSConfig} from "../../../../models/config/sms-config";
import {CommonService} from "../../../../services/common/common.service";


declare var $:any;
var _ = require('lodash');

@Component({
  selector: 'app-pgsubscribe',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SMSConfigComponent implements OnInit,OnDestroy,AfterViewInit {
  @Input() config:SMSConfig = new SMSConfig({});
  @Input() configs:SMSConfig[];
  error:any;
  isDataAvailable:boolean = true;
  _id;

  constructor(private $common:CommonService,
              private $config:SMSConfigService) {
  }

  ngOnInit() {
    $('.sms-config').hide()
    this.activateDataTable();
    var self = this;
    this.get();
  }

  get() {
    debugger;
    let self = this;
    this.$config.find({}).then(configs => {
      $(".sms-datatable-basic").DataTable().destroy()
      self.configs = (configs) ? configs : [];
      setTimeout(() => {
        this.activateDataTable()
        $('.sms-config').show()
        $("#spinner").hide();
      }, 50)
    }).catch(error => {
      this.$common.error(error)
    });
  }

  public ngOnDestroy() {

  }

  ngAfterViewInit() {
    $('.select').select2();
  }

  edit(config:SMSConfig) {
    this.config = config;
    $('.status').val(_.toString(this.config.isEnabled)).trigger('change');
    $("#host").focus();

  }

  update() {
    debugger;
    this.config.isEnabled = _.isEqual($(".status").dropdown("get value"), "false") ? false : true;
    this.$config.patch(this.config._id, this.config).then(response => {
      this.$common.notify().success("SMS configuration details updated successfuly");
      this.get()
      $('.status').dropdown("restore defaults");
    }).catch(error => {
      this.$common.error(error)
    });
  }

  private activateDataTable() {
    $('.sms-config').hide()
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

    $('.sms-datatable-basic').DataTable({
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="icon-three-bars"></i> <span class="caret"></span>',
          className: 'btn bg-blue btn-icon',
          collectionLayout: 'fixed two-column',
          postfixButtons: ['colvisRestore']
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
