import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from "../../../../../models/profile";
import {UserService} from "../../../../../services/user/user.service";
import {CommonService} from "../../../../../services/common/common.service";
var _ = require('lodash');

declare var $:any;

@Component({
  selector: 'superadmins',
  templateUrl: './view-superadmins.component.html',
  styleUrls: ['./view-superadmins.component.css']
})

export class ViewSuperAdminsComponent implements OnInit {
  @Input() data = null;
  @Input() users:User[];
  id;
  isDataAvailable:boolean = true;
  @Input() current_user:User;
  user:User = null;
  pageLength = 5;
  constructor(private $user:UserService,
              private router:Router,
              private $common:CommonService) {

  }

  ngOnInit() {
    $('.table-superadmins').hide()
    let self = this;
    self.dataTable();
    if (_.isNull(this.data)) {
      self.current_user =self.user = this.$common.user();
      self.get({role: "superadmin"});
    } else {
      this.$user.get(this.data).then(response => {
        if (!_.isEmpty(response)) {
          self.current_user = self.user = response;
          self.get({role: "superadmin"});
        }
      })
    }
  }

  get(query){

    this.$user.find({
      query: query
    }).then(superadmin => {
      $(".datatable-superadmins").DataTable().destroy();
      if (!_.isEmpty(superadmin)) {
        this.isDataAvailable = false;
        this.users = superadmin;
      }
      setTimeout(()=>{
        this.dataTable();
        $('.table-superadmins').show()
        $("#spinner").hide();
      }, 50);
    }).catch(error => {
      this.$common.error(error)
    });
  }
  goBack() {
    window.history.back();
  }

  deleteSuperAdmin(){

  }
  /*deleteTenant(tenant : TenantModel,event:any){
   $("#modal_info_close").click();
   event.stopPropagation();
   this.tenantService
   .delete(tenant)
   .then(response => {
   debugger;
   if(response){
   this.toastr.success(response.message,"Success");
   this.tenants=response.data;
   $(".datatable-basic").DataTable().row($("#"+this.modelData._id)).remove().draw();
   this.modelData=null;
   }
   })
   .catch(error => this.error = error);
   }

   onDelete(tenant : TenantModel){
   this.modelData=tenant;
   }*/

  dataTable() {
    $('.table-superadmins').hide()
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

    $('.datatable-superadmins').DataTable({
      "pageLength": self.pageLength,
      columnDefs: [

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
  show() {
    return !_.startsWith(this.router.url, '/reports');
  }
}

