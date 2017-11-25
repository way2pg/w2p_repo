import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FoodModel} from "../../../../../models/pgowner/food";
import {FoodService} from "../../../../../services/pgowner/food.service";

declare var $:any;
import * as moment from 'moment';
import {CommonService} from "../../../../../services/common/common.service";
declare var self;
var _ = require('lodash');

@Component({
  selector: 'pg-owner',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})

export class AddFoodComponent implements OnInit {

  @Input() foodModel:FoodModel = new FoodModel({});
  error:any;

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $common:CommonService,
              private $foodService:FoodService) {
    self = this;
  }

  ngOnInit() {
   debugger;
    this.activatedRoute.params.forEach((params:Params) => {
      if (params['id']) {
        this.$foodService.get(params['id']).then(response => {
          this.foodModel = response;
        }).catch(error => {
          this.$common.error(error)
        });
      }
    });
  }

  saveFoodMenu() {
    debugger;
    this.foodModel.week = moment($('.daterange-ranges').data('daterangepicker').startDate).week();
    this.foodModel.year = moment($('.daterange-ranges').data('daterangepicker').startDate).year();
    this.foodModel.pgowner=this.$common.user();
    if(_.isNull(this.foodModel._id)){
      this.$foodService.create(this.foodModel).then(response => {
        debugger;
        this.foodModel = response.data;
        this.$common.notify().success("Saved Food Details");
        this.router.navigateByUrl('/user/food/list');
      }).catch(error => {
        this.$common.error(error)
      });
    }else {
      this.$foodService.patch(this.foodModel._id,this.foodModel).then(response => {
        debugger;
        this.foodModel = response.data;
        this.$common.notify().success("Food Details updated");
        this.router.navigateByUrl('/user/food/list');
      }).catch(error => {
        this.$common.error(error)
      });
    }
  }

  ngAfterViewInit():void {
    // Daterange picker
    // ------------------------------
    $('.daterange-ranges').daterangepicker(
      {
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        minDate: moment().startOf('isoWeek'),
        maxDate: moment().endOf('month'),
        dateLimit: {days: 14},
        alwaysShowCalendars: false,
        showCustomRangeLabel: false,
        ranges: {
          'Next Week': [moment().add(1, 'weeks').startOf('isoWeek'), moment().add(1, 'weeks').endOf('isoWeek')],
          'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
        },
        opens: 'left',
        applyClass: 'btn-small bg-slate-600 btn-block',
        cancelClass: 'btn-small btn-default btn-block',
        format: 'MM/DD/YYYY'
      },
      function (start, end) {
        self.setValues();
        self.check(moment(start).week(), moment(start).year());
        $('.daterange-ranges span').html(start.format('MMMM D') + ' - ' + end.format('MMMM D'));
      }
    );


    $('.daterange-ranges span').html(moment().startOf('isoWeek').format('MMMM D') + ' - ' + moment().endOf('isoWeek').format('MMMM D'));
    $("div.daterangepicker > div.calendars,.daterangepicker-inputs, .range_inputs,div.ranges > ul > li:last").remove();
    this.setValues();
    this.check(moment().week(), moment().year());
  }

  private setValues() {
    this.foodModel.foodMenu.dayOneName = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(1, 'days').format('dddd');
    this.foodModel.foodMenu.dayOneDate = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(1, 'days').format('MMM DD, YYYY');
    this.foodModel.foodMenu.dayTwoName = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(2, 'days').format('dddd');
    this.foodModel.foodMenu.dayTwoDate = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(2, 'days').format('MMM DD, YYYY');
    this.foodModel.foodMenu.dayThreeName = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(3, 'days').format('dddd');
    this.foodModel.foodMenu.dayThreeDate = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(3, 'days').format('MMM DD, YYYY');
    this.foodModel.foodMenu.dayFourName = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(4, 'days').format('dddd');
    this.foodModel.foodMenu.dayFourDate = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(4, 'days').format('MMM DD, YYYY');
    this.foodModel.foodMenu.dayFiveName = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(5, 'days').format('dddd');
    this.foodModel.foodMenu.dayFiveDate = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(5, 'days').format('MMM DD, YYYY');
    this.foodModel.foodMenu.daySixName = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(6, 'days').format('dddd');
    this.foodModel.foodMenu.daySixDate = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(6, 'days').format('MMM DD, YYYY');
    this.foodModel.foodMenu.daySevenName = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(7, 'days').format('dddd');
    this.foodModel.foodMenu.daySevenDate = moment($('.daterange-ranges').data('daterangepicker').startDate).startOf('week').add(7, 'days').format('MMM DD, YYYY');
  }

  goBack() {
    window.history.back();
  }

  showFoodMenu() {
    this.router.navigateByUrl('/user/food/view');
  }

  check(week:number, year:number) {
    this.$foodService.find({
      query:{
        week: Number(week),
        year: Number(year),
        $sort: { createdAt: -1}
      }
    }).then(response => {
      console.log("Inside Check")
      console.log(response)

      if(!_.isEmpty(response)){
        this.foodModel = response[0];
      }else {
        this.foodModel = new FoodModel({});
        this.setValues();
      }
    }).catch(error => {
      this.$common.error(error)
    });

   /* checkFoodMenu(week, year).then(response => {
      if (!_.isUndefined(response.data[0]) && !_.isEmpty(response)) {
        this.foodModel = response.data[0];
        this.toastr.success(response.message, response.title);
      } else {

      }
    }).catch(error => this.error = error);*/
  }

}

