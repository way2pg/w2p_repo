import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from "../../../../../models/profile";
import {UserService} from "../../../../../services/user/user.service";
import {CommonService} from "../../../../../services/common/common.service";
var _ = require('lodash');

declare var $:any;

@Component({
  selector: 'users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

export class ViewUserComponent implements OnInit {
  @Input() users:User[];
  @Input() data = null;
  isDataAvailable:boolean = true;
  @Input() modelData:User = new User({});
  pageLength = 5;

  constructor(private $user:UserService,
              private router:Router,
              private $common:CommonService) {
    console.log("ViewUserComponent Running")
  }

  ngOnInit() {
    $('.table-users').hide()
    let self = this;
    self.dataTable();
    this.get({role: "user"})
  }

  get(query) {

    this.$user.find({
      query: query
    }).then(users => {
      debugger;
      $(".datatable-users").DataTable().destroy();
      if (!_.isEmpty(users)) {
        this.pageLength = _.size(users);
        this.users = users;
      }
      setTimeout(()=> {
        this.dataTable();
        $('.table-users').show()
        $("#spinner").hide();
      }, 50);

    }).catch(error => {
      this.$common.error(error)
    });
  }

  goBack() {
    window.history.back();
  }


  delete(user:User, event:any) {
    $("#modal_info_close").click();
    event.stopPropagation();
    /* this.tenantService
     .delete(tenant)
     .then(response => {
     debugger;
     if (response) {
     this.toastr.success(response.message, "Success");
     $('.datatable-basic tbody tr').empty()
     this.tenants = response.data;
     $(".datatable-basic").DataTable().draw();
     this.modelData = null;
     }
     })
     .catch(error => this.error = error);*/
  }

  restore(user:User, event:any) {
    debugger;
    $("#restore_modal_info_close").click();
    event.stopPropagation();
    /*this.tenantService
     .restore(tenant)
     .then(response => {
     debugger;
     if (response) {
     this.toastr.success(response.message, "Success");
     $('.datatable-basic tbody tr').empty()
     this.tenants = response.data;
     $(".datatable-basic").DataTable().draw();
     this.modelData = null;
     }
     })
     .catch(error => this.error = error);*/
  }

  onRestore(user:User) {
    this.modelData = user;
  }

  onDelete(user:User) {
    this.modelData = user;
  }

  show() {
    return !_.startsWith(this.router.url, '/reports');
  }

  dataTable() {
    $('.table-users').hide()
    $("#spinner").show();
    let self = this;
    $.extend($.fn.dataTable.defaults, {
      autoWidth: false,
      dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
      language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      },
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="icon-three-bars"></i> <span class="caret"></span>',
          className: 'btn bg-blue btn-icon',
          collectionLayout: 'fixed four-column',
          postfixButtons: ['colvisRestore']
        }
      ]
    });
    // External table additions
    // ------------------------------

    $('.datatable-users').DataTable({
      "pageLength": self.pageLength,
      columnDefs: []
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

