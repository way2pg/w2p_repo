import {Component, Input} from '@angular/core';
import {SocketService, RestService} from "../../../../services/feathersjs/feathers.service";
import {UserService} from "../../../../services/user/user.service";
import {CommonService} from "../../../../services/common/common.service";
import {FoodRequestService} from "../../../../services/request/food-request.service";
import {FoodReportService} from "../../../../services/reports/food-report.service";
const ec = require('echarts');
var _ = require('lodash');

const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

@Component({
  selector: 'pg-owner',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent {

  actual_count:any;
  breakfast:any;
  lunch:any;
  dinner:any;

  constructor(private userService:UserService,
              private $common:CommonService,
              private $food:FoodReportService) {

  }

  ngOnInit():void {

  }

  ngAfterViewInit() {

    let self = this;
    let dates = self.getDates(moment().startOf('isoWeek').format("DD-MM-YYYY"), moment().endOf('isoWeek').format("DD-MM-YYYY"))
    this.$food.find({
      query: {
        pgowner: this.$common.user()
      }
    }).then(response => {
      debugger;
      console.log(response)

    }).catch(error => {
      this.$common.error(error)
    });

    // ['2010', '2011', '2012', '2013', '2014', '2015']


    /*   var count = {}
     var self = this;
     this._socket._app.service("/api/users").find({
     query: {
     createdBy: this.userService.getUser()._id
     }
     }).then(response => {
     this.actual_count = response.length;
     });

     this._socket._app.service("/api/request").find({
     query: {
     "request_data.start_date": {
     $gte: moment(moment().format("YYYY-MM-DD")).startOf('day').toDate(),
     $lte: moment(moment().format("YYYY-MM-DD")).endOf('day').toDate()
     },
     "approver": this.userService.getUser()._id
     },
     }).then(response => {
     debugger;
     var map = {};
     self.breakfast = 0;
     self.dinner = 0;
     self.lunch = 0;
     _.each(response, function (object, key) {
     if (!_.hasIn(map, object.createdBy._id)) {
     map[object.createdBy._id] = object.createdBy._id;
     _.each(object.request_data, function (data, k) {
     if (data.breakfast)
     self.breakfast++;
     if (data.dinner)
     self.dinner++;
     if (data.lunch)
     self.lunch++;
     });

     }
     });
     })


     this.report();
     this.income_report();
     this._socket._app.service("/api/request").on("created", request => {
     this.report();
     });*/

  }

  income_report() {
    var income_report = ec.init(document.getElementById('income_report'));
    //
    // Change waterfall options
    //

    let income_report_options = {

      // Setup grid
      grid: {
        x: 45,
        x2: 10,
        y: 35,
        y2: 25
      },

      // Add tooltip
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          var tar;
          if (params[1].value != '-') {
            tar = params[1];
          }
          else {
            tar = params[0];
          }
          return tar.name + '<br/>' + tar.seriesName + ' - ' + tar.value;
        }
      },

      // Add legend
      legend: {
        data: ['Expenses', 'Income']
      },

      // Horizontal axis
      xAxis: [{
        type: 'category',
        data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      }],

      // Vertical axis
      yAxis: [{
        type: 'value'
      }],

      // Add series
      series: [
        {
          name: 'Income',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            normal: {
              color: '#42A5F5',
              label: {
                show: true, position: 'top'
              }
            }
          },
          data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
        },
        {
          name: 'Expenses',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            normal: {
              color: '#ef5350',
              label: {
                show: true,
                position: 'top'
              }
            }
          },
          data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203, 300]
        }
      ]
    };

    income_report.setOption(income_report_options);
    // Resize charts
    // ------------------------------

    window.onresize = function () {
      setTimeout(function () {
        income_report.resize();
      }, 200);
    }
  }

  report() {
    /*this._socket._app.service("/api/reports/request").find().then(response => {
     console.log(response);

     var weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
     var total = [0, 0, 0, 0, 0, 0, 0];
     var info = [0, 0, 0, 0, 0, 0, 0];
     var service = [0, 0, 0, 0, 0, 0, 0];
     var pending = [0, 0, 0, 0, 0, 0, 0];
     var completed = [0, 0, 0, 0, 0, 0, 0];
     var data = ['All Requests', 'Food Requests', 'Service Requests', 'Pending Requests', 'Completed Requests'];

     let series = [
     {
     name: 'All Requests',
     type: 'bar',
     stack: 'Total',
     itemStyle: {
     normal: {
     color: '#42A5F5',
     label: {
     show: true,
     position: 'insideLeft',
     }
     },
     emphasis: {
     color: '#42A5F5',
     label: {
     show: true
     }
     }
     },
     data: total
     },
     {
     name: 'Food Requests',
     type: 'bar',
     stack: 'Total',
     itemStyle: {
     normal: {
     color: '#ef5350',
     label: {
     show: true,
     position: 'insideLeft',
     }
     },
     emphasis: {
     color: '#ef5350',
     label: {
     show: true
     }
     }
     },
     data: info
     },
     {
     name: 'Service Requests',
     type: 'bar',
     stack: 'Total',
     itemStyle: {
     normal: {
     color: '#66bb6a',
     label: {
     show: true,
     position: 'insideLeft',
     }
     },
     emphasis: {
     color: '#66bb6a',
     label: {
     show: true
     }
     }
     },
     data: service
     },
     {
     name: 'Pending Requests',
     type: 'bar',
     stack: 'Total',
     itemStyle: {
     normal: {
     color: '#26a69a',
     label: {
     show: true,
     position: 'insideLeft',
     }
     },
     emphasis: {
     color: '#26a69a',
     label: {
     show: true
     }
     }
     },
     data: pending
     },
     {
     name: 'Completed Requests',
     type: 'bar',
     stack: 'Total',
     itemStyle: {
     normal: {
     color: '#ff7043',
     label: {
     show: true,
     position: 'insideLeft',
     }
     },
     emphasis: {
     color: '#ff7043',
     label: {
     show: true
     }
     }
     },
     data: completed
     }
     ]

     if (!_.isEmpty(response["total"])) {
     _.forEach(response['total'], function (object, key) {
     total[_.indexOf(weeks, key)] = object;
     })
     } else {
     _.pull(data, data[0]);
     _.pull(series, series[0])
     }

     if (!_.isEmpty(response["info"])) {
     _.forEach(response['info'], function (object, key) {
     info[_.indexOf(weeks, key)] = object;
     })
     } else {
     _.pull(data, data[1]);
     _.pull(series, series[1])
     }

     if (!_.isEmpty(response["service"])) {
     _.forEach(response['service'], function (object, key) {
     service[_.indexOf(weeks, key)] = object;
     })
     } else {
     _.pull(data, data[2]);
     _.pull(series, series[2])
     }


     if (!_.isEmpty(response["pending"])) {
     _.forEach(response['pending'], function (object, key) {
     pending[_.indexOf(weeks, key)] = object;
     })
     } else {
     _.pull(data, data[3]);
     _.pull(series, series[3])
     }


     if (!_.isEmpty(response["completed"])) {
     _.forEach(response['completed'], function (object, key) {
     completed[_.indexOf(weeks, key)] = object;
     })
     } else {
     _.pull(data, data[4]);
     _.pull(series, series[4])
     }


     console.log("total " + total);
     console.log("info " + info);
     console.log("service " + service);
     console.log("pending " + pending);
     console.log("completed " + completed);
     console.log("data " + data);


     var stacked_bars = ec.init(document.getElementById('stacked_bars'));

     //
     // Stacked bars options
     //

     let stacked_bars_options = {

     // Setup grid
     grid: {
     x: 75,
     x2: 25,
     y: 35,
     y2: 25
     },

     // Add tooltip
     tooltip: {
     trigger: 'axis',
     axisPointer: {
     type: 'shadow'
     }
     },

     // Add legend
     legend: {
     data: data
     },

     // Enable drag recalculate
     // calculable: true,

     // Horizontal axis
     xAxis: [{
     type: 'value'
     }],

     // Vertical axis
     yAxis: [{
     type: 'category',
     data: weeks
     }],

     // Add series
     series: series
     };

     stacked_bars.setOption(stacked_bars_options);
     // Resize charts
     // ------------------------------
     window.onresize = function () {
     setTimeout(function () {
     stacked_bars.resize();
     }, 200);
     }
     })*/
  }

  // Returns an array of dates between the two dates
  getDates(startDate, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return moment(date).format("DD-MM-YYYY");
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
}


