import {Component, Input, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CommonService} from "./services/common/common.service";
import {ServiceRequest} from "./services/service_request/service_request";
import {User} from "./models/profile";
import {UserService} from "./services/user/user.service";
import {environment} from "../environments/environment.prod";


const _ = require("lodash")
declare var $:any;
declare var Pace:any;
declare var app:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  user:User = null;
  users:User[] = [];
  IMAGE_URL = environment.IMAGE_URL;
  photo:any = "/assets/images/demo/users/face1.jpg";
  pageLength = 5;

  constructor(private $common:CommonService,
              private $users:UserService,
              private router:Router,
              private $request:ServiceRequest) {

  }

  ngOnInit() {
    let self = this;
    self.dataTable();
    this.user = this.$common.user();

    this.$common.get().subscribe(object => {
      if (!(_.isUndefined(object) && _.isNull(object))) {
        this.user = object.user;
      }
    })

    this.getUsers()

  }

  ngAfterViewInit() {
    app()
    let self = this;
    Pace.on("start", function () {
      $("div.blockUI").show();
    });

    Pace.on("done", function () {
      $("div.blockUI").hide();
    });

    this.$request.service.on("created", () => {

    })

    this.$request.service.on("patched", (request) => {
      if ((request.updatedBy !== self.$common.id() && request.createdBy === self.$common.id())) {
        console.log(request.updatedBy + " ====== " + self.$common.id())
        this.$common.sound();
      }
    })


  }

  getUsers() {
    this.$users.find({}).then(response => {
      $(".datatable-users-list").DataTable().destroy();
      this.users = response;
      setTimeout(()=>this.dataTable(), 50);

      $(".user-list").niceScroll({
        mousescrollstep: 100,
        cursorcolor: '#37474F',
        cursorborder: '',
        cursorwidth: 6,
        hidecursordelay: 100,
        autohidemode: 'false',
        horizrailenabled: false,
        preservenativescrolling: false
      });
    })
  }

  show() {
    return !_.startsWith(this.router.url, '/reports');
  }

  isLoggedIn() {
    return this.$common.isLoggedIn();
  }

  getImage(photo_url) {
    if (_.includes(photo_url, "assets/images/demo") || _.isNull(photo_url)) {
      return this.photo;
    } else {
      return this.IMAGE_URL + photo_url;
    }


  }

  navigate(user) {
    this.router.navigate(['/user/profile', user._id]);
  }

  showLeftMenu() {
    if ((!this.isLoggedIn() && (
      _.includes(this.router.url, "/home") ||
      _.includes(this.router.url, "/auth/login") ||
      _.includes(this.router.url, "/auth/register") ||
      _.includes(this.router.url, "/howitworks") ||
      _.includes(this.router.url, "/support") ||
      _.includes(this.router.url, "/referrals_home") ||
      _.includes(this.router.url, "/auth/reset"))) ||
      _.includes(this.router.url, "/home")) {
      return true;
    } else if (!this.isLoggedIn() && _.includes(this.router.url, "/search")) {
      return true;
    } else {
      return false;
    }
  }

  dataTable() {
    let self = this;
    $.extend($.fn.dataTable.defaults, {
      autoWidth: false,
      dom: '<"datatable-scroll-wrap"t><"datatable-footer"p>',
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
    var table = $('.datatable-users-list').DataTable({
      "pageLength": 10,
      columnDefs: []
    });

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder', 'Type to filter...');

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
      minimumResultsForSearch: Infinity,
      width: 'auto'
    });

    $('.search').on('keyup', function () {
      table.search(this.value).draw();
    });

  }


}
