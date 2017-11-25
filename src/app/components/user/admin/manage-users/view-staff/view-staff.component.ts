import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StaffModel} from "../../../../../models/pgowner/staff";
import {CommonService} from "../../../../../services/common/common.service";
import {StaffService} from "../../../../../services/pgowner/staff.service";
import {UserService} from "../../../../../services/user/user.service";
import {PGOwnerService} from "../../../../../services/pgowner/pgowner.service";
import {User} from "../../../../../models/profile";
declare var $:any;
var _ = require('lodash');

@Component({
  selector: 'staffs',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})

export class ViewStaffComponent implements AfterViewInit {
  @Input() staffMembers:StaffModel[];
  @Input() modelData:StaffModel = new StaffModel({});

  @Input() imageURL:string = "http://localhost:4300/api/image/getImage/";
  error:any;
  @Input() disabled:string = "";
  isDataAvailable:boolean = true;
  message:string = null;
  @Input() data = null;
  user:User = null;
  pageLength = 5;

  constructor(private $common:CommonService,
              private router:Router,
              private $user:UserService,
              private $staff:StaffService,
              private $pgowner:PGOwnerService) {

  }


  ngOnInit() {
    $('.table-staff').hide()
    this.dataTable();
    this.get();

    $('.ui.selection.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
  }

  ngAfterViewInit() {

  }

  get() {
    this.$staff.find({}).then(staffMembers => {
      $(".datatable-staffs").DataTable().destroy();
      this.staffMembers = staffMembers;
      this.pageLength = _.size(staffMembers);
      setTimeout(()=>{
        this.dataTable();
        $('.table-staff').show()
        $("#spinner").hide();
      }, 50);
    }).catch(error => {
      this.$common.error(error)
    });
  }

  save() {
    debugger;
    /* this.tenant.idproofs=$(".idproofs").dropdown("get text");
     this.tenant.gender=$(".gender").dropdown("get text");
     this.tenant.materialStatus=$(".materialStatus").dropdown("get text");*/
    /* this.pgownerService.saveTenant(this.staffMembers).then(pgowner => {

     }).catch(error => this.error = error);*/
  }

  addstaff() {
    this.$pgowner.find({
      query: {
        createdBy: this.$common.id
      }
    }).then(result => {
      if (result.length > 0) {
        this.$common.router().navigateByUrl('/user/addstaff');
      } else {
        this.$common.notify().warning("PG details are required to add staff, Please add pgdetails first!!")
      }
    }).catch(error => {
      this.$common.error(error)
    });

  }

  goBack() {
    window.history.back();
  }

  delete(staff:StaffModel, event:any) {
    let self = this;
    this.message = "Successfully deactivate staff member!!";
    $("#modal_info_close").click();
    event.stopPropagation();
    this.$staff.patch(staff._id, {
      deleted: true,
      deletedBy: this.$common.user()._id,
      deletedAt: new Date()
    })
      .then(staff => {
        if (!_.isNull(staff)) {
          self.deleteUser(staff.staffmember._id)
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
      deletedBy: this.$common.user()._id,
      deletedAt: new Date()
    })
      .then(response => {
        if (!_.isEmpty(response) && response.deleted) {
          self.$common.notify().success("Successfully deactivate staff member!!")
          self.get();
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
          self.$common.notify().success("Successfully activated staff member!!")
          self.get();
        }
      })
      .catch(error => {
        this.$common.error(error)
      });
  }

  onDelete(staffModel:StaffModel) {
    this.modelData = staffModel;
  }

  restore(staff:StaffModel, event:any) {
    let self = this;
    $("#restore_modal_info_close").click();
    event.stopPropagation();
    this.$staff.patch(staff._id, {
      deleted: false,
      deletedBy: null,
      deletedAt: null
    })
      .then(staff => {
        if (!_.isNull(staff)) {
          self.restoreUser(staff.staffmember._id)
        }
      })
      .catch(error => {
        this.$common.error(error)
      });
  }

  onRestore(staffModel:StaffModel) {
    this.modelData = staffModel;
  }

  dataTable() {
    $('.table-staff').hide()
    $("#spinner").show();

    $.extend($.fn.dataTable.defaults, {
      autoWidth: false,
      dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
      language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      },
      drawCallback: function () {
        $(this).find('tbody tr').slice(-2).find('.dropdown, .btn-group').addClass('dropup');
      },
      preDrawCallback: function () {
        $(this).find('tbody tr').slice(-2).find('.dropdown, .btn-group').removeClass('dropup');
      }
    });
    // External table additions
    // ------------------------------

    $('.datatable-staffs').DataTable({
      "pageLength": this.pageLength,
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
          "targets": [1],
          "visible": false
        },
        {
          "targets": [2],
          "visible": false
        },
        {
          "targets": [3],
          "visible": false
        },
        {
          "targets": [7],
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
