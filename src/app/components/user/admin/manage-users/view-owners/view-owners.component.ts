import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from "../../../../../models/profile";
import {CommonService} from "../../../../../services/common/common.service";
import {UserService} from "../../../../../services/user/user.service";
var _ = require('lodash');

declare var $:any;

@Component({
  selector: 'pgowners',
  templateUrl: './view-owners.component.html',
  styleUrls: ['./view-owners.component.css']
})

export class ViewOwnersComponent implements OnInit {
  @Input() users:User[];
  @Input() modelData:User = new User({});
  isDataAvailable:boolean = true;
  message:any = null;
  error:any;
  @Input() data = null;
  user:User = null;
  pageLength = 5;

  constructor(private $common:CommonService,
              private router:Router,
              private $user:UserService) {
  }

  ngOnInit() {
    $('.table-pgowners').hide()
    let self = this;
    self.dataTable();

    if (_.isNull(this.data)) {
      self.user = this.$common.user();
      self.get();
    } else {
      this.$user.get(this.data).then(response => {
        if (!_.isEmpty(response)) {
          self.user = response;
          self.get();
        }
      })
    }
  }

  get() {
    this.$user.find({
      query: this.conditions()
    }).then(pgowners => {
      if (!_.isEmpty(pgowners)) {
        $(".datatable-pgowners").DataTable().destroy();
        this.isDataAvailable = false;
        this.users = pgowners;
        setTimeout(()=>{
          this.dataTable();
          $('.table-pgowners').show()
          $("#spinner").hide();
        }, 50);
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  conditions() {
    let options = null;
    if (_.isEqual(this.user.role, "pgowner")) {
      options = {
        _id: this.user._id,
        "role": "pgowner"
      }
    } else if (_.isEqual(this.user.role, "admin") || _.isEqual(this.user.role, "superadmin")) {
      options = {
        "role": "pgowner"
      }
    }
    return options;
  }

  goBack() {
    window.history.back();
  }

  delete(user:User, event:any) {
    this.message = "Successfully deactivate user!!";
    $("#modal_info_close").click();
    event.stopPropagation();
    this.$user.patch(user._id, {
      deleted: true,
      deletedBy: this.$common.id(),
      deletedAt: new Date()
    })
      .then(response => response)
      .catch(error => {
        this.$common.error(error)
      });
  }

  restore(user:User, event:any) {
    this.message = "Successfully activated user!!"
    $("#restore_modal_info_close").click();
    event.stopPropagation();
    this.$user.patch(user._id, {
      deleted: false,
      deletedBy: null,
      deletedAt: null
    })
      .then(response => response)
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

  show() {
    return !_.startsWith(this.router.url, '/reports');
  }

  dataTable() {
    $('.table-pgowners').hide()
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
    $('.datatable-pgowners').DataTable({
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
}

