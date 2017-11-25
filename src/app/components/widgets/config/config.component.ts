import {Component, OnInit, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {CommonService} from "../../../services/common/common.service";
import {Config} from "../../../models/config";
import {ConfigService} from "../../../services/config/config.service";

declare var $:any;
var _ = require('lodash');

@Component({
  selector: 'app-pgsubscribe',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit,OnDestroy,AfterViewInit {
  @Input() config:Config = new Config({});
  @Input() configs:Config[];
  error:any;
  isDataAvailable:boolean = true;
  _id;

  constructor(private $common:CommonService,
              private $config:ConfigService) {
  }

  ngOnInit() {
    this.activateDataTable();
    this.get();
  }

  get() {
    let self = this;
    this.$config.find({}).then(config => {
      console.log(config)
      $(".datatable-basic").DataTable().destroy()
      self.configs = (config) ? config : [];
      setTimeout(() => {
        this.activateDataTable()
        $('.table-config').show()
        $("#spinner").hide();
      }, 50)

    }).catch(error => {
      this.$common.error(error)
    });
  }

  save($event) {
    $event.preventDefault();
    this.config.type = $(".select").select2("val");
    if (_.isNull(this.config._id)) {
      this.$config.create(this.config).then(response => {
        if (response) {
          this.$common.notify().success("Config values are added successfuly.");
          this.get()
        }
      }).catch(error => {
        this.$common.error(error)
      });
    } else {
      this.$config.patch(this.config._id, this.config).then(response => {
        if (response) {
          this.$common.notify().success("Config values are updated successfuly.");
          this.get()
        }
      }).catch(error => {
        this.$common.error(error)
      });
    }
    this.config = new Config({});
  }

  public ngOnDestroy() {

  }

  ngAfterViewInit() {
    $('.select').select2();
  }

  edit(config:Config) {
    this.config = config;
    $('.select').val(this.config.type).trigger('change');
    $("#key").focus();
  }

  beforeDelete(kv:Config) {
    this._id = kv._id;
  }

  delete() {
    this.$config.remove(this._id, {}).then(response => {
      if (!_.isEmpty(response)) {
        this.$common.notify().success("Configuration values are removed successfuly.");
        this.get();
      }
    });
    $("#modal_info_close").click();

  }

  private activateDataTable() {
    $('.table-config').hide()
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
    // External table additions
    // ------------------------------

    $('.datatable-basic').DataTable({
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

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder', 'Type to filter...');

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
      minimumResultsForSearch: Infinity,
      width: 'auto'
    });
  }


}
