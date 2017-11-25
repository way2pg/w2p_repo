import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CommonService} from "../../../../../services/common/common.service";
import {FoodRequestService} from "../../../../../services/request/food-request.service";
import {FoodRequestModel} from "../../../../../models/requests/food-request";
import {User} from "../../../../../models/profile";

const _ = require('lodash');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

declare var $:any;

@Component({
  selector: 'food-request',
  templateUrl: './food-request.component.html',
  styleUrls: ['./food-request.component.css']
})

export class FoodRequestComponent implements OnInit {
  @Input() requests:FoodRequestModel[];
  @Input() request_type:any = "";
  isDataAvailable:boolean = true;
  @Input() request:FoodRequestModel = new FoodRequestModel({});
  @Input() data = null;
  user:User = null;

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $common:CommonService,
              private $request:FoodRequestService) {

  }

  ngOnInit() {
    this.activate();
    let self = this;
    this.user = this.$common.user();
    if (_.isEqual(this.$common.role(), "tenant")) {
      this.request.tenant = this.$common.user();
    }

    // Dropdown selectors
    $('.daterange').pickadate({
      selectYears: 1,
      selectMonths: true,
      min: true,
      format: 'mm-dd-yyyy',
      onClose: function () {
        //self.start_date = moment(this.get('value')).format("DD-MM-YYYY");
        console.log(this.get('value'))
      }
    });

    this.get();
  }

  showDate(){
    // Dropdown selectors
    $('.daterange').pickadate({
      selectYears: 1,
      selectMonths: true,
      min: true,
      format: 'mm-dd-yyyy',
      onClose: function () {
        //self.start_date = moment(this.get('value')).format("DD-MM-YYYY");
        console.log(this.get('value'))
      }
    });
  }
  get() {
    let self = this;
    this.$request.find({})
      .then(requests => {
        console.log(requests)
        $(".datatable-basic").DataTable().destroy();
        self.requests = requests;
        setTimeout(()=>{
          this.activate()
          $('.food-requests').show()
          $("#spinner").hide();
        }, 50);
      }).catch(error => {
      this.$common.error(error)
    });
  }

  save() {
    let self = this;
    this.request.pgowner = this.$common.user().createdBy;
    this.request.start_date = !_.isEmpty($(".start-date").val()) ? moment($(".start-date").val()).format("MM-DD-YYYY") : "";
    this.request.end_date = !_.isEmpty($(".end-date").val()) ? moment($(".end-date").val()).format("MM-DD-YYYY") : "";

    if (this.validate(this.request)) {
      this.$request.find({
        query: {
          tenant: this.$common.id()
        }
      }).then(response => {
        debugger;
        if (!_.isEmpty(response)) {
          if (self.overlap_dates(response)) {
            self.create()
          }
        } else {
          self.create()
        }
      })
    }
  }

  edit(data) {
    this.request = data;
    this.request.start_date = moment(data.start_date).format("MM-DD-YYYY")
    this.request.end_date = moment(data.end_date).format("MM-DD-YYYY")
  }

  delete(data) {
    let self = this;
    this.$request.remove(data._id).then(response => {
      if (!_.isEmpty(response)) {
        self.$common.notify().success("Request details deleted successfully.");
        self.get();
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  reset() {
    this.request = new FoodRequestModel({});
    this.request.tenant = this.$common.user();
  }

  create() {
    let self = this;
    this.$request.create(this.request).then(response => {
      if (!_.isEmpty(response)) {
        self.$common.notify().success("Request sent successfuly.");
        self.request = new FoodRequestModel({});
        self.request.tenant = this.$common.user();
        self.get();
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  overlap_dates(response) {
    let self = this;
    let bool = true;
    _.forEach(response, function (foodrequest) {
      console.log("========================= db range")
      console.log(moment(foodrequest.start_date).format("DD-MM-YYYY"), moment(foodrequest.end_date).format("DD-MM-YYYY"))
      const dbrange = moment.range(moment(foodrequest.start_date), moment(foodrequest.end_date));

      console.log("========================= range")
      console.log(moment(self.request.start_date).format("DD-MM-YYYY"), moment(self.request.end_date).format("DD-MM-YYYY"))
      const range = moment.range(moment(self.request.start_date), moment(self.request.end_date));

      console.log(dbrange.overlaps(range, {adjacent: true}))
      console.log(moment(self.request.start_date).within(dbrange))
      if (moment(self.request.start_date).within(dbrange) || dbrange.overlaps(range, {adjacent: true})) {
        self.$common.notify().warning("Start and End dates are overlapping with existing dates.");
        bool = false;
        return false;
      }
    });
    console.log("bool value = " + bool)
    return bool;
  }

  validate(request) {


    if (!moment(request.start_date).isValid()) {
      this.$common.notify().warning("Please select start date")
      return false;
    }

    if (!moment(request.end_date).isValid()) {
      this.$common.notify().warning("Please select end date")
      return false;
    }

    if (!moment(request.end_date).isAfter(request.start_date)) {
      this.$common.notify().warning("End date should be after start date")
      return false;
    }
    if (_.isEqual(this.request.breakfast, false) && _.isEqual(this.request.dinner, false) && _.isEqual(this.request.lunch, false)) {
      this.$common.notify().warning("Please select food not required for Breakfast or Lunch or Dinner")
      return false;
    }
    return true
  }


  getDays(start, end) {
    return moment(end).diff(moment(start), 'days')
  }

  private activate() {


    $('.food-requests').hide()
    $("#spinner").show();
    $.extend($.fn.dataTable.defaults, {
      autoWidth: false,
      columnDefs: [{
        width: '20%',
        targets: 0
      },
        {
          "targets": [5],
          "visible": false
        }],
      dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
      language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      }
    });

    $('.datatable-basic').DataTable({
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="icon-three-bars"></i> <span class="caret"></span>',
          className: 'btn bg-blue btn-icon',
          collectionLayout: 'fixed two-column',
          postfixButtons: ['colvisRestore']
        }
      ]
    });

    $('.dataTables_filter input[type=search]').attr('placeholder', 'Type to filter...');


    $('.dataTables_length select').select2({
      minimumResultsForSearch: Infinity,
      width: 'auto'
    });

  }

}



