import {Component, Input, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TenantModel} from "../../../../../models/pgowner/tenant";
import {CommonService} from "../../../../../services/common/common.service";
import {TenantService} from "../../../../../services/pgowner/tenant.service";
import {PGOwnerService} from "../../../../../services/pgowner/pgowner.service";
import {UserService} from "../../../../../services/user/user.service";
import {User} from "../../../../../models/profile";
const _ = require('lodash');

declare var $:any;

@Component({
  selector: 'tenants',
  templateUrl: './view-tenants.component.html',
  styleUrls: ['./view-tenants.component.css']
})

export class ViewTenantComponent implements OnInit,AfterViewInit {
  @Input() data = null;
  user:User = null;
  @Input() tenants:TenantModel[] = [];
  @Input() modelData:TenantModel = new TenantModel({});
  error:any;
  message:any = null;
  pageLength = 5;

  constructor(private $common:CommonService,
              private $user:UserService,
              private router:Router,
              private $pgowner:PGOwnerService,
              private $tenant:TenantService) {

  }

  ngOnInit() {
    $('.table-tenants').hide()
    let self = this;
    self.dataTable();


    if (_.isNull(this.data)) {
      self.user = this.$common.user();
      self.get({});
    } else {
      this.$user.get(this.data).then(response => {
        if (!_.isEmpty(response)) {
          self.user = response;
          self.get({pgowner: self.data});
        }
      })
    }
    /*this.$tenant.events().on('patched', tenant => {
     debugger;
     if (tenant.deleted) {
     this.deleteUser(tenant.tenant._id)
     } else {
     this.restoreUser(tenant.tenant._id)
     }
     });*/

    /*this.$common.service("/api/users").on('patched', user => {
     debugger;
     if (user && this.message != null) {
     this.$common.notify().success(this.message);
     this.message = null;
     }
     this.get();
     });*/
  }

  ngAfterViewInit() {

  }

  get(query) {

    this.$tenant.find({
      query: query
    }).then(tenants => {
      debugger;
      $(".datatable-tenants").DataTable().destroy();
      if (!_.isEmpty(tenants)) {
        this.pageLength = _.size(tenants);
        this.tenants = tenants;
      }
      setTimeout(()=>{
        this.dataTable();
        $('.table-tenants').show()
        $("#spinner").hide();
      }, 50);

    }).catch(error => {
      this.$common.error(error)
    });
  }


  goBack() {
    window.history.back();
  }

  delete(tenant:TenantModel, event:any) {
    let self = this;
    $("#modal_info_close").click();
    event.stopPropagation();
    this.$tenant.patch(tenant._id, {
      deleted: true,
      deletedBy: this.$common.id,
      deletedAt: new Date()
    })
      .then(tenant => {
        if (!_.isNull(tenant)) {
          self.deleteUser(tenant.tenant._id)
        }
      })
      .catch(error => {
        this.$common.error(error)
      });
  }

  restore(tenant:TenantModel, event:any) {
    let self = this;
    $("#restore_modal_info_close").click();
    event.stopPropagation();
    this.$tenant.patch(tenant._id, {
      deleted: false,
      deletedBy: null,
      deletedAt: null
    })
      .then(tenant => {
        if (!_.isNull(tenant)) {
          self.restoreUser(tenant.tenant._id)
        }
      })
      .catch(error => {
        this.$common.error(error)
      });
  }

  deleteUser(id) {
    let self = this;
    this.$user.patch(id, {
      deleted: true,
      deletedBy: this.$common.id,
      deletedAt: new Date()
    })
      .then(response => {
        if (!_.isEmpty(response) && response.deleted) {
          self.$common.notify().success("Successfully deactivate tenant!!")
          self.get({});
        }
      })
      .catch(error => {
        this.$common.error(error)
      });
  }

  restoreUser(id) {
    let self = this;
    this.$user.patch(id, {
      deleted: false,
      deletedBy: null,
      deletedAt: null
    })
      .then(response => {
        if (!_.isEmpty(response) && !response.deleted) {
          self.$common.notify().success("Successfully activated tenant!!")
          self.get({});
        }
      })
      .catch(error => {
        this.$common.error(error)
      });
  }

  onRestore(tenant:TenantModel) {
    this.modelData = tenant;
  }

  onDelete(tenant:TenantModel) {
    this.modelData = tenant;
  }


  addTenant() {
    this.$pgowner.find({
      query: {
        createdBy: this.$common.id
      }
    }).then(result => {
      if (result.length > 0) {
        this.$common.router().navigateByUrl('/user/addtenant');
      } else {
        this.$common.notify().warning("PG details are required to add tenant, Please add pgdetails first!!")
      }
    }).catch(error => {
      this.$common.error(error)
    });

  }

  dataTable() {
    $('.table-tenants').hide()
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

    $('.datatable-tenants').DataTable({
      "pageLength": self.pageLength,
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

  show() {
    return !_.startsWith(this.router.url, '/reports');
  }

}

