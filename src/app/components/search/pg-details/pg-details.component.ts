import {Component, OnInit, AfterViewInit, Input, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {environment} from "../../../../environments/environment.prod";
import {PageViews} from "../../../models/pageviews";
import {CommonService} from "../../../services/common/common.service";
import {PGOwnerService} from "../../../services/pgowner/pgowner.service";
import {CommentService} from "../../../services/common/comments";
import {Comments} from "../../../models/comments";

const slimScroll = require("jquery-slimscroll")

declare var $:any;
const _ = require('lodash');
const moment = require('moment');

@Component({
  selector: 'search-pg-details',
  templateUrl: './pg-details.component.html',
  styleUrls: ['./pg-details.component.css']
})


export class SearchPGDetailsComponent implements OnInit, AfterViewInit,OnDestroy {
  @Input() pgdetails:any;
  isDataAvailable:boolean = true;
  imageURL:string = environment.IMAGE_URL;
  pgId = null;

  @Input() search_data;

  pgname:string;

  selectedRow:Number;
  setClickedRow:Function;
  pgcomments:Comments[] = []
  comment:string;
  comments = new Comments({});
  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $common:CommonService,
              private $pgowner:PGOwnerService,
              private $comments:CommentService) {

  }

  ngOnInit() {

    this.activatedRoute.params.forEach((params:Params) => {
      this.pgId = params['id'];
      if (this.pgId) {
        debugger;
        this.$pgowner.search({
          query: {
            _id: this.pgId
          }
        }).then(response => {
          console.log(response)
          this.isDataAvailable = false;
          this.pgdetails = response;
          _.each(this.pgdetails, function (pgdetails) {
            let images = []
            _.each(pgdetails["rooms"], function (room) {
              _.each(room["simages"], function (simages) {
                images.push(simages)
              })
              _.each(room["dimages"], function (dimages) {
                images.push(dimages)
              })
              _.each(room["timages"], function (timages) {
                images.push(timages)
              })
              _.each(room["fimages"], function (fimages) {
                images.push(fimages)
              })
            })
            pgdetails.images = images;
          })
          this.activateOwl()
        })
      }
    });
    this.updatePageview(this.pgId);
  }

  mComments(pg, index) {
    $('#content-group-'+index).slimScroll({
      destroy: true
    });
    this.selectedRow = index;
    this.$comments.find({
      query: {
        pgid: pg._id
      }
    }).then(response => {
      console.log(response)
      this.pgcomments = response;
      setTimeout(() => {
        $('#content-group-'+index).slimScroll({
          height: '450px',
          start: 'bottom',
        });
        $('#content-group-'+index).animate({scrollTop: $('#content-group-'+index).prop('scrollHeight')}, 1000);
      }, 50)
    })
  }

  updatePageview(pgId) {
    if (!_.isNull(this.$common.user())) {
      this.$common.service("/api/page_views").find({query: {pgid: pgId}}).then(response => {
        if (_.isEmpty(response)) {
          let page_views = new PageViews({});
          page_views.pgid = this.pgId;
          page_views.view_count = 1;
          page_views.createdBy = this.$common.id();
          page_views.updatedBy = this.$common.id();
          this.$common.service("/api/page_views").create(page_views);
        } else {
          response[0].view_count = response[0].view_count + 1;
          this.$common.service("/api/page_views").update(response[0]._id, response[0]);
        }
      });

    }
  }

  ngAfterViewChecked() {
    $(".pre-slider").owlCarousel({
      navigation: true, // Show next and prev buttons
      pagination: false,
      slideSpeed: 300,
      loop: true,
      paginationSpeed: 400,
      singleItem: true,
      navigationText: [
        "<i class='icon-arrow-left32'></i>",
        "<i class='icon-arrow-right32'></i>"
      ],
      autoPlay: true,
      autoplayHoverPause: true,
      stopOnHover: true
    });

  }

  ngAfterViewInit() {
    // Checkboxes, radios
    $(".styled, .multiselect-container input").uniform({
      radioClass: 'choice'
    });

    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }

  activateOwl() {

  }

  user() {
    return JSON.parse(localStorage.getItem("user"));
  }

  public ngOnDestroy():void {
  }

  search(){

  }

  fromNow(createdAt) {
    return moment(createdAt).fromNow()
  }

  isLoggedIn() {
    return this.$common.isLoggedIn();
  }
}
