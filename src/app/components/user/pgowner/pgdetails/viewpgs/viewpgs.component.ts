import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {PGOwnerService} from "../../../../../services/pgowner/pgowner.service";
import {PGDetails} from "../../../../../models/pgowner/pgdetails";
import {CommonService} from "../../../../../services/common/common.service";
var _ = require('lodash');
declare var $:any;

@Component({
  selector: 'pg-owner',
  templateUrl: './viewpgs.component.html',
  styleUrls: ['./viewpgs.component.css']
})

export class ViewPGsComponent implements OnInit, AfterViewInit {
  @Input() pgdetails:PGDetails[];
  @Input() isDataAvailable = true;
  disabled = "";

  constructor(private router:Router,
              private $pgowner:PGOwnerService,
              private $common:CommonService) {
  }


  addpg() {
    this.router.navigateByUrl('/user/addpg');
  }

  ngOnInit() {
    let self = this;
    $('.table-viewpgs').hide()
    self.dataTable();
    this.get()
  }

  ngAfterViewInit() {

  }

  get(){
    this.$pgowner.find({}).then(pgdetails => {
      $(".datatable-pgview").DataTable().destroy();
      if (!_.isEmpty(pgdetails)) {
        this.isDataAvailable = false;
        this.pgdetails = pgdetails;
      }
      setTimeout(()=> {
        this.dataTable();
        $('.table-viewpgs').show()
       $("#spinner").hide();
      }, 50);
    }).catch(error => {
      this.$common.error(error)
    });
  }

  dataTable() {
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

    $('.datatable-pgview').DataTable({
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="icon-three-bars"></i> <span class="caret"></span>',
          className: 'btn bg-blue btn-icon',
          collectionLayout: 'fixed four-column',
          postfixButtons: ['colvisRestore']
        }
      ],
      columnDefs: [
        {
          "targets": [5],
          "visible": false
        },
        {
          "targets": [6],
          "visible": false
        },
        {
          "targets": [7],
          "visible": false
        },
        {
          "targets": [8],
          "visible": false
        },
        {
          "targets": [9],
          "visible": false
        },
        {
          "targets": [10],
          "visible": false
        },
        {
          "targets": [11],
          "visible": false
        },
        {
          "targets": [12],
          "visible": false
        },
        {
          "targets": [13],
          "visible": false
        },
        {
          "targets": [14],
          "visible": false
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
