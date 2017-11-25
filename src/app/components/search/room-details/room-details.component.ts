import {Component, OnInit, AfterViewInit, Input} from "@angular/core";
import {Router, Params, ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment.prod";
import {PGDetails} from "../../../models/pgowner/pgdetails";
import {CommonService} from "../../../services/common/common.service";
import {PGOwnerService} from "../../../services/pgowner/pgowner.service";
import {TenantService} from "../../../services/pgowner/tenant.service";
import {SupportModel} from "../../../models/support/support";
import {SearchService} from "../../../services/search/search.service";
import {TenantModel} from "../../../models/pgowner/tenant";
import {Room} from "../../../models/pgowner/room";
import {CommentService} from "../../../services/common/comments";
import {Comments} from "../../../models/comments";
const _ = require('lodash');

declare var $:any;
declare var PhotoSwipe:any;
declare var PhotoSwipeUI_Default:any;

const moment = require('moment');
declare var PNotify:any;
const slimScroll = require("jquery-slimscroll")


@Component({
  selector: 'room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})


export class SearchRoomComponent implements OnInit, AfterViewInit {
  imageURL:string = environment.IMAGE_URL;
  popOwl:any;
  homeOwl:any;
  isDataAvailable:boolean = true;
  @Input() images:any = [];
  @Input() single:boolean = true;
  @Input() double:boolean = true;
  @Input() triple:boolean = true;
  @Input() four:boolean = true;

  @Input() room = new Room({});

  owner_name:any;
  @Input() pgdetails:PGDetails;

  @Input() request:SupportModel = new SupportModel({});
  IMAGE_URL:string = environment.IMAGE_URL;
  search_data:string;

  tenants:TenantModel[] = [];
  pgcomments:Comments[] = []
  comment:string;
  comments = new Comments({});

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $common:CommonService,
              private $pgowner:PGOwnerService,
              private $tenant:TenantService,
              private $comments:CommentService,
              private _searchService:SearchService) {

  }

  ngOnInit() {
    var self = this;
    this.search_data = this._searchService.search_data;
    console.log(this.search_data)

    this.activatedRoute.params.forEach((params:Params) => {
      debugger;
      let pgId = params['pgid'];
      let roomId = params['id'];
      if (pgId) {
        this.$pgowner.get(pgId).then(response => {
          self.isDataAvailable = false;
          this.pgdetails = response;
          this.images = []
          _.each(this.pgdetails.rooms, function (room) {
            if (_.isEqual(room.roomid, roomId)) {
              self.room = room;
              _.each(room["simages"], function (simage) {
                self.images.push(simage)
              })
              _.each(room["dimages"], function (dimage) {
                self.images.push(dimage)
              })
              _.each(room["timages"], function (timage) {
                self.images.push(timage)
              })
              _.each(room["fimages"], function (fimage) {
                self.images.push(fimage)
              })

              self.single = !room.single;
              self.double = !room.double;
              self.triple = !room.triple;
              self.four = !room.four;
            }
          });
          this.owner_name = this.pgdetails.createdBy["firstName"];
          this.$tenant.find({
            query: {
              pgdetails: pgId
            }
          }).then(response => {
            this.tenants = response;
          })
        });

        this.mComments(pgId)


      }
      this.photoswipe()
    });

    //Getting Keyvalues for ID Proofs.
    /* this._socket._app.service("/api/rooms").find({
     query:{
     $text: {$search: "Bangalore"}
     }
     }).subscribe(response => {
     console.log(response);
     debugger;
     this.pgdetails=response;

     });*/

    // Checkboxes, radios
    $(".styled, .multiselect-container input").uniform({
      radioClass: 'choice'
    });

    var self = this;

    debugger;

    $('#houseImageSection').mouseover(function () {
      $('#wishlistMessage').removeClass("hide");
    });
    $('#houseImageSection').mouseout(function () {
      $('#wishlistMessage').addClass("hide");
    });
    (function BannerPopup() {
      $('iframe').load(function () {
        $(this).contents().find("body").on('click', function (event) {
          alert('test');
        });
      });

      $('.banner-slider-popup').click(function (e) {
        if (e.target.tagName.toLowerCase() == 'img') {
          debugger;
          $(".black-popup-overlay").fadeIn(200);
          $(".banner-popup").fadeIn(200);
          $("body").css('overflow', 'hidden');
          $('#home-slider').trigger('owl.stop');
          self.popOwl.jumpTo(self.homeOwl.currentItem);
          return false
        }
      });

      $('.enlarge-pano').click(function (e) {
        debugger;
        console.log('sjgfhs');
        $(".black-popup-overlay").fadeIn(200);
        $(".banner-popup").fadeIn(200);
        $("body").css('overflow', 'hidden');
        $('#home-slider').trigger('owl.stop');
        self.popOwl.jumpTo(self.homeOwl.currentItem);
        return false
      });

      $('.black-popup-overlay,.close-popup2').click(function () {
        debugger;
        $(".black-popup-overlay").fadeOut(200);
        $(".banner-popup").fadeOut(200);
        $("body").css('overflow', 'visible');
        $('#home-slider').trigger('owl.play', 2000);
        self.homeOwl.jumpTo(self.popOwl.currentItem);
        return false
      });

      (function escBox() {
        $(document.documentElement).keyup(function (event) {
          debugger;
          if (event.keyCode == 27) {
            $(".black-popup-overlay").fadeOut(200);
            $(".banner-popup").fadeOut(200);
            $("body").css('overflow', 'visible');
            self.homeOwl.jumpTo(self.popOwl.currentItem);
            $('#home-slider').trigger('owl.play', 2000);
          }
        });
      })();

    })();

    (function BodHt() {
      $('.slider-item,.banner-popup,#home-gallery-items iframe').height($(window).height() - 40);
    })();

    self.popOwl = $('#home-gallery-items').data('owlCarousel');
    self.homeOwl = $("#home-slider").data('owlCarousel');

    $(document.documentElement).keyup(function (event) {
      // handle cursor keys
      if (event.keyCode == 37) {
        self.popOwl.prev();
      } else if (event.keyCode == 39) {
        self.popOwl.next();
      }
    });

    $('.ui.selection.dropdown').dropdown();

    $('.circular.image').dimmer({
      on: 'hover'
    });
    $(".checkbox").checkbox();

    /*To show tooltip in houses page*/
    $("#Offers-slider").owlCarousel({
      navigation: true, // Show next and prev buttons
      pagination: false,
      slideSpeed: 300,
      loop: true,
      items: 1,
      paginationSpeed: 400,
      touchDrag: false,
      mouseDrag: false,
      navigationText: [
        "<i class='icon-uniE6A0'></i>",
        "<i class='icon-uniE6AD'></i>"
      ],
    });
    $("#tenant_testimonials").each(function () {
      var tenant_tes = $(this).children(".item");
      $(tenant_tes[Math.floor(Math.random() * tenant_tes.length)]).addClass('current');
    });
  }

  mComments(pgId) {
    $('#content-group').slimScroll({
      destroy: true
    });
    this.$comments.find({
      query: {
        pgid: pgId
      }
    }).then(response => {
      console.log(response)
      this.pgcomments = response;
      setTimeout(() => {
        $('#content-group').slimScroll({
          height: '450px',
          start: 'bottom',
        });
        $('#content-group').animate({scrollTop: $('#content-group').prop('scrollHeight')}, 1000);
      }, 50)
    })
  }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {

  }

  send() {
    debugger;
    // this.request.type = "PG Enquire";
    //this.request.owner = this.pgdetails.createdBy;
    this.$common.service("/api/requests").create(this.request).then(response => {
      this.$common.notify().success("Your message sent to PG Owner")
      this.request = new SupportModel({});
    }).catch(error => {
      this.$common.notify().warning("Some error occurred, Please try again.")
    })
  }

  goBack() {
    window.history.back();
  }
  isLoggedIn() {
    return this.$common.isLoggedIn();
  }
  fromNow(createdAt) {
    return moment(createdAt).fromNow()
  }

  photoswipe(){
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
      {
        src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
        w: 964,
        h: 1024
      },
      {
        src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
        w: 1024,
        h: 683
      }
    ];

    // define options (if needed)
    var options = {
      // history & focus options are disabled on CodePen
      history: false,
      focus: false,

      showAnimationDuration: 0,
      hideAnimationDuration: 0

    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }
}


