import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../models/profile";
import {UserService} from "../../../../../services/user/user.service";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommonService} from "../../../../../services/common/common.service";

var _ = require('lodash');

declare var $:any;

@Component({
  selector: 'admins',
  templateUrl: './view-admins.component.html',
  styleUrls: ['./view-admins.component.css']
})

export class ViewAdminsComponent implements OnInit {
  @Input() users:User[];
  isDataAvailable:boolean = true;
  user:User = new User({});
  @Input() data = null;
  pageLength = 5;

  @Input() current_user:User;
  @Input() modelData:User = new User({});

  constructor(private $users:UserService,
              private router:Router,
              private $common:CommonService) {

  }

  ngOnInit() {
    $('.table-admins').hide()
    let self = this;
    self.dataTable();


    if (_.isNull(this.data)) {
      self.current_user =self.user = this.$common.user();
      self.get({role: "admin"});
    } else {
      this.$users.get(this.data).then(response => {
        if (!_.isEmpty(response)) {
          self.current_user = self.user = response;
          self.get({role: "admin"});
        }
      })
    }

    $('.dropdown').dropdown();


    /*this.userService.getUserList("admin").then(users => {
     if(!_.isEmpty(users)){
     this.isDataAvailable=false;
     this.users = users;
     }
     });*/
  }

  get(query){
    this.$users.find({
      query: query
    }).then(admins => {
      $(".datatable-admins").DataTable().destroy();
      if (!_.isEmpty(admins)) {
        this.isDataAvailable = false;
        this.users = admins;
      }
      setTimeout(()=>{
        this.dataTable();
        $('.table-admins').show()
        $("#spinner").hide();
      }, 50);
    }).catch(error => {
      this.$common.error(error)
    });
  }
  goBack() {
    window.history.back();
  }

  deleteAdmin() {

  }

  delete(muser:User) {
    $("#modal_info_close").click();
    this.$users.patch(muser._id, {
      deleted: true,
      deletedBy: this.$common.id(),
      deletedAt: new Date()
    })
      .then(response => {
        this.$common.success("Successfully deactivate user!!")
      })
      .catch(error => {
        this.$common.error(error)
      });
  }

  restore(user:User) {
    $("#restore_modal_info_close").click();
    this.$users.patch(user._id, {
      deleted: false,
      deletedBy: null,
      deletedAt: null
    })
      .then(response => {
        this.$common.success("Successfully activated user!!")
      })
      .catch(error => {
        this.$common.error(error)
      });
  }

  onRestore(user:User) {
    this.modelData = user;
  }

  onDelete(user:User) {
    this.modelData = user;
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
    $('.table-admins').hide()
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
    $('.datatable-admins').DataTable({
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

