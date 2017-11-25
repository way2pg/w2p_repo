import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FoodModel} from "../../../../../models/pgowner/food";
import {FoodService} from "../../../../../services/pgowner/food.service";
import {CommonService} from "../../../../../services/common/common.service";
import {FoodRequestService} from "../../../../../services/request/food-request.service";
import {FoodRequestModel} from "../../../../../models/requests/food-request";

declare var $:any;
declare var PNotify:any;

const _ = require('lodash');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

@Component({
  selector: 'view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.css']
})

export class ViewFoodComponent implements OnInit {

  @Input() foodModel:FoodModel = new FoodModel({});
  error:any;
  @Input() request:FoodRequestModel = new FoodRequestModel({});
  @Input() data = null;
  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $foodService:FoodService,
              private $common:CommonService,
              private $request:FoodRequestService) {

  }


  ngOnInit() {

    let self = this;
    this.request.tenant = this.$common.user();
    this.activatedRoute.params.forEach((params:Params) => {
      if (params['id']) {
        this.$foodService.get(params['id']).then(response => {
          this.foodModel = response;
        }).catch(error => {
          this.$common.error(error)
        });
      } else {
        this.getFoodMenu(moment().startOf('isoWeek'), moment().endOf('isoWeek'))
      }
    });

    /* $('.daterange-food').daterangepicker(
     {
     startDate: moment().startOf('month'),
     endDate: moment().endOf('month'),
     dateLimit: {days: 120},
     ranges: {
     'Next Week': [moment().add(1, 'weeks').startOf('isoWeek'), moment().add(1, 'weeks').endOf('isoWeek')],
     'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
     },
     opens: "left",
     applyClass: "btn-small bg-slate-600 btn-block",
     cancelClass: "btn-small btn-default btn-block",
     format: "MM/DD/YYYY"
     },
     function (start, end) {
     // self.getExpensesRent(start, end)
     self.getFoodMenu(moment(start).week(), moment(start).year());
     $('.daterange-food span').html(start.format('MM-DD-YYYY') + ' &nbsp; - &nbsp; ' + end.format('MM-DD-YYYY'));
     }
     );
     $('.daterange-food span').html(moment().startOf('isoWeek').format('MM-DD-YYYY') + ' &nbsp; - &nbsp; ' + moment().endOf('isoWeek').format('MM-DD-YYYY'));*/

    // Dropdown selectors
    $('.daterange').pickadate({
      selectYears: 1,
      selectMonths: true,
      min: true,
      format:'mm-dd-yyyy',
      onClose: function () {
        //self.start_date = moment(this.get('value')).format("DD-MM-YYYY");
        console.log(this.get('value'))
      }
    });
   /* // Dropdown selectors
    $('.end-date').pickadate({
      selectYears: 1,
      selectMonths: true,
      min: true,
      onClose: function () {
        self.end_date = moment(this.get('value')).format("DD-MM-YYYY");
        console.log(this.get('value'))
      }
    });*/
  }

  saveFoodMenu() {
    debugger;
    console.log(this.foodModel)
    this.$foodService.create(this.foodModel).then(response => {
      this.foodModel = response.data;
      this.$common.notify().success(response.message);
    }).catch(error => {
      this.$common.error(error)
    });
  }

  goBack() {
    window.history.back();
  }

  showFoodMenu() {
    this.router.navigateByUrl('/user/food/add/' + this.foodModel._id);
  }

  getFoodMenu(week:number, year:number) {
    debugger;
    console.log(this.$common.user())
    console.log(moment(week).week() + " " + moment(year).year())
    this.$foodService.find({
      query: {
        week: moment(week).week(),
        year: moment(year).year(),
        /*createBy: this.$common.user().createBy*/
      }
    }).then(response => {
      debugger;
      console.log(response)
      if (!_.isEmpty(response)) {
        this.foodModel = response[0];
      } else {
        this.foodModel = new FoodModel({});
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  save() {
    debugger;
    this.request.pgowner = this.$common.user().createdBy;
    this.request.start_date = moment($(".start-date").val()).format("MM-DD-YYYY")
    this.request.end_date = moment($(".end-date").val()).format("MM-DD-YYYY")
    console.log(this.request)
    if (this.validate(this.request)) {
      this.$request.create(this.request).then(response => {
        if (!_.isEmpty(response)) {
          this.$common.notify().success("Request sent successfuly.");
          this.request = new FoodRequestModel({});
          this.request.tenant = this.$common.user();
        }
      }).catch(error => {
        this.$common.error(error)
      });
    }
    /* var isError = false;

     _.each(requestModel.request_data, function (object, i) {
     if (object.breakfast || object.lunch || object.dinner) {
     object['start_date'] = new Date(object.requestdate.split("-")[0]);
     object['end_date'] = new Date(object.requestdate.split("-")[1]);
     delete object.requestdate;
     } else {
     isError = true;
     return false;
     }
     })

     if (isError) {
     this.$common.notify().warning("Please select food not required for Breakfast or Lunch or Dinner");
     } else {
     requestModel.status = "Info";
     requestModel.approver = this.$common.user().createdBy;
     this.$request.create(requestModel).then(response => {
     if(!_.isEmpty(response)){
     this.$common.notify().success("Request sent successfuly.");
     this.createFormGroup();
     }
     })
     }*/
  }

  validate(request) {
    console.log(moment(request.start_date).isValid())
    console.log(moment(request.end_date).isValid())
    if (!(moment(request.start_date).isValid() || moment(request.end_date).isValid())) {
      this.$common.notify().warning("Please select start and end dates")
      return false;
    }

    if (_.isEqual(this.request.breakfast, false) && _.isEqual(this.request.dinner, false) && _.isEqual(this.request.lunch, false)) {
      this.$common.notify().warning("Please select food not required for Breakfast or Lunch or Dinner")
      return false;
    }
    return true
  }

  showTable() {
    return !_.isEmpty(this.foodModel);
  }

  checkAccess() {
    return (_.isEqual(this.$common.role(), 'user')
    || _.isEqual(this.$common.role(), 'tenant'))
      ? false : true;
  }

  ngOnDestroy() {

  }
  show() {
    return !_.startsWith(this.router.url, '/reports');
  }

}

