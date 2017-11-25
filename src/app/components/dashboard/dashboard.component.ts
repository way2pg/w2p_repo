import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CommonService} from "../../services/common/common.service";
import {Reports} from "../../models/reports";
import {PGReportService} from "../../services/reports/pgreport.service";
import {FoodReportService} from "../../services/reports/food-report.service";
import {ExpenseService} from "../../services/expenses/expense.service";
import {User} from "../../models/profile";
import {Expense} from "../../models/expenses/expense";
import {RequestModel} from "../../models/requests/request";
import {ServiceRequest} from "../../services/service_request/service_request";
import {UserService} from "../../services/user/user.service";
const tip = require("d3-tip")
const jsPDF = require("jspdf")

declare var $:any;
declare var d3:any;
d3.tip = tip;

const _ = require("lodash")
const moment = require("moment")


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit, AfterViewInit {
  @Input() data = null;

  app;
  report:Reports = new Reports({})
  food_reports:{};
  user:User = null;

  tenant_count = 0;
  pg_count = 0;
  staff_count = 0;

  delux_single_count = 0;
  delux_double_count = 0;
  delux_triple_count = 0;
  delux_four_count = 0;

  delux_single_vacancies = 0;
  delux_double_vacancies = 0;
  delux_triple_vacancies = 0;
  delux_four_vacancies = 0;

  luxury_single_count = 0;
  luxury_double_count = 0;
  luxury_triple_count = 0;
  luxury_four_count = 0;

  luxury_single_vacancies = 0;
  luxury_double_vacancies = 0;
  luxury_triple_vacancies = 0;
  luxury_four_vacancies = 0;

  general_single_count = 0;
  general_double_count = 0;
  general_triple_count = 0;
  general_four_count = 0;

  general_single_vacancies = 0;
  general_double_vacancies = 0;
  general_triple_vacancies = 0;
  general_four_vacancies = 0;

  credit_amount = 0;
  debit_amount = 0;

  rent_expenses:Expense[] = []
  rent_msg = null;
  rent_amount = 0;
  @Input() requests:RequestModel[];
  @Input() request:RequestModel = null;
  @Input() comment;
  modelData;

  doc = new jsPDF();

  constructor(private $common:CommonService,
              private $pgreport:PGReportService,
              private $food:FoodReportService,
              private $expense:ExpenseService,
              private $user:UserService,
              private $service:ServiceRequest) {
    this.app = this.$common.socket();
  }

  ngOnInit() {
    let self = this;
    if (_.isNull(this.data)) {
      this.user = this.$common.user();
      this.reports(this.$common.role());

    } else {
      this.$user.get(this.data).then(response => {
        if (!_.isEmpty(response)) {
          self.user = response;
          self.reports(response.role)
        }
      })
    }
  }

  reports(role) {
    if (_.isEqual(role, "admin") || _.isEqual(role, "superadmin")) {
      this.getReportForAdmin()
    } else if (_.isEqual(role, "pgowner")) {
      this.getReportForPGOwner()
    } else if (_.isEqual(role, "tenant")) {
      this.tenants();
    }
  }

  tenants() {
    let self = this;
    this.getRequests();
    this.$service.service.on("patched", (request) => {
      if (_.isEqual(request.createdBy, this.user._id)) {
        this.getRequests();
      }
    });

    this.getExpensesRent(moment().startOf('month').format('MM-DD-YYYY'), moment().endOf('month').format('MM-DD-YYYY'))
  }

  getRequests() {
    let self = this;
    this.$service.find({})
      .then(requests => {
        if (!_.isEmpty(requests)) {
          self.request = requests[0];
        }
      }).catch(error => {
      this.$common.error(error)
    });
  }

  getClass(comment) {
    return comment.owner ? "media reversed" : "media";
  }

  send() {
    let self = this;
    this.request.comments.push({
      comment: this.comment,
      owner: false
    })
    this.$service.patch(this.request._id, this.request).then(message => {
      if (!_.isEmpty(message)) {
        self.modelData = message;
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  fromNow(createAt) {
    return moment(createAt).fromNow();
  }

  getReportForAdmin() {
    let self = this;
    this.app.service("/api/reports").find({}).then(response => {
      this.report = response[0];
      if (_.hasIn(this.report, "super_admin_count")) {
        this.showCounts("sa_pie_arc_legend", "Super Admins", "#4CB6AC", this.report.super_admin_count, "Super Admins")
      }
      if (_.hasIn(this.report, "admin_count")) {
        this.showCounts("admin_pie_arc_legend", "Admins", "#29B6F6", this.report.admin_count, "Admins")
      }
      if (_.hasIn(this.report, "pgowner_count")) {
        this.showCounts("pgowner_pie_arc_legend", "PGOwners", "#99A2D8", this.report.pgowner_count, "PGOwners")
      }
      if (_.hasIn(this.report, "tenant_count")) {
        this.showCounts("tenant_pie_arc_legend", "Tenants", "#4EB6AC", this.report.tenant_count, "Tenants")
      }
      if (_.hasIn(this.report, "user_count")) {
        this.showCounts("user_pie_arc_legend", "Normal Users", "#78909C", this.report.user_count, "Normal Users")
      }
      if (_.hasIn(this.report, "pgstaff_count")) {
        this.showCounts("pgstaff_pie_arc_legend", "Staff Members", "#D9534F", this.report.pgstaff_count, "Staff Members")
      }
})

    this.$pgreport.find({}).then(response => {
      _.forEach(response, function (pgreport) {
        self.tenant_count += pgreport.tenant_count
        self.pg_count += pgreport.pg_count
        self.staff_count += pgreport.staff_count

        self.delux_single_count += pgreport.deluxe.single.total;
        self.delux_double_count += pgreport.deluxe.double.total;
        self.delux_triple_count += pgreport.deluxe.triple.total;
        self.delux_four_count += pgreport.deluxe.four.total;

        self.delux_single_vacancies += pgreport.deluxe.single.vacancies;
        self.delux_double_vacancies += pgreport.deluxe.double.vacancies;
        self.delux_triple_vacancies += pgreport.deluxe.triple.vacancies;
        self.delux_four_vacancies += pgreport.deluxe.four.vacancies;
        self.luxury_single_count += pgreport.luxury.single.total;
        self.luxury_double_count += pgreport.luxury.double.total;
        self.luxury_triple_count += pgreport.luxury.triple.total;
        self.luxury_four_count += pgreport.luxury.four.total;

        self.luxury_single_vacancies += pgreport.luxury.single.vacancies;
        self.luxury_double_vacancies += pgreport.luxury.double.vacancies;
        self.luxury_triple_vacancies += pgreport.luxury.triple.vacancies;
        self.luxury_four_vacancies += pgreport.luxury.four.vacancies;

        self.general_single_count += pgreport.general.single.total;
        self.general_double_count += pgreport.general.double.total;
        self.general_triple_count += pgreport.general.triple.total;
        self.general_four_count += pgreport.general.four.total;

        self.general_single_vacancies += pgreport.general.single.vacancies;
        self.general_double_vacancies += pgreport.general.double.vacancies;
        self.general_triple_vacancies += pgreport.general.triple.vacancies;
        self.general_four_vacancies += pgreport.general.four.vacancies;

      })
      self.showRoomsCount("admin_general_pie_arc_legend", [self.general_single_count, self.general_double_count, self.general_triple_count, self.general_four_count], [self.general_single_vacancies, self.general_double_vacancies, self.general_triple_vacancies, self.general_four_vacancies], "General Total")
      self.showRoomsCount("admin_luxury_pie_arc_legend", [self.delux_single_count, self.delux_double_count, self.delux_triple_count, self.delux_four_count], [self.delux_single_count, self.delux_double_vacancies, self.delux_triple_vacancies, self.delux_four_vacancies], "Delux Total")
      self.showRoomsCount("admin_delux_pie_arc_legend", [self.luxury_single_count, self.luxury_double_count, self.luxury_triple_count, self.luxury_four_count], [self.luxury_single_vacancies, self.luxury_double_vacancies, self.luxury_triple_vacancies, self.luxury_four_vacancies], "Luxury Total")
    }).catch(error => {
      this.$common.error(error)
    });
  }

  getReportForPGOwner() {
    let self = this;

    this.$expense.find({
      query: {
        createdBy: this.user._id
      }
    }).then(response => {
      _.forEach(response, function (object) {
        if(!_.isNull(object.expense_item)){
          if (_.isEqual(object.expense_item.operation, "Credit")) {
            self.credit_amount += object.amount;
          } else {
            self.debit_amount += object.amount;
          }
        }
      })
    }).catch(error => {
      this.$common.error(error)
    });

    this.$pgreport.find({
      query: {
        pgowner: this.user._id
      }
    }).then(response => {
      _.forEach(response, function (pgreport) {
        self.tenant_count += pgreport.tenant_count
        self.pg_count += pgreport.pg_count
        self.staff_count += pgreport.staff_count

        self.delux_single_count += pgreport.deluxe.single.total;
        self.delux_double_count += pgreport.deluxe.double.total;
        self.delux_triple_count += pgreport.deluxe.triple.total;
        self.delux_four_count += pgreport.deluxe.four.total;

        self.delux_single_vacancies += pgreport.deluxe.single.vacancies;
        self.delux_double_vacancies += pgreport.deluxe.double.vacancies;
        self.delux_triple_vacancies += pgreport.deluxe.triple.vacancies;
        self.delux_four_vacancies += pgreport.deluxe.four.vacancies;
        self.luxury_single_count += pgreport.luxury.single.total;
        self.luxury_double_count += pgreport.luxury.double.total;
        self.luxury_triple_count += pgreport.luxury.triple.total;
        self.luxury_four_count += pgreport.luxury.four.total;

        self.luxury_single_vacancies += pgreport.luxury.single.vacancies;
        self.luxury_double_vacancies += pgreport.luxury.double.vacancies;
        self.luxury_triple_vacancies += pgreport.luxury.triple.vacancies;
        self.luxury_four_vacancies += pgreport.luxury.four.vacancies;

        self.general_single_count += pgreport.general.single.total;
        self.general_double_count += pgreport.general.double.total;
        self.general_triple_count += pgreport.general.triple.total;
        self.general_four_count += pgreport.general.four.total;

        self.general_single_vacancies += pgreport.general.single.vacancies;
        self.general_double_vacancies += pgreport.general.double.vacancies;
        self.general_triple_vacancies += pgreport.general.triple.vacancies;
        self.general_four_vacancies += pgreport.general.four.vacancies;

      })
      self.showTenantsCount();
      self.showPGCount();
      self.showStaffCount();
      self.showRoomsCount("delux_pie_arc_legend", [self.general_single_count, self.general_double_count, self.general_triple_count, self.general_four_count], [self.general_single_vacancies, self.general_double_vacancies, self.general_triple_vacancies, self.general_four_vacancies], "General Total")
      self.showRoomsCount("luxury_pie_arc_legend", [self.delux_single_count, self.delux_double_count, self.delux_triple_count, self.delux_four_count], [self.delux_single_count, self.delux_double_vacancies, self.delux_triple_vacancies, self.delux_four_vacancies], "Delux Total")
      self.showRoomsCount("general_pie_arc_legend", [self.luxury_single_count, self.luxury_double_count, self.luxury_triple_count, self.luxury_four_count], [self.luxury_single_vacancies, self.luxury_double_vacancies, self.luxury_triple_vacancies, self.luxury_four_vacancies], "Luxury Total")
    }).catch(error => {
      this.$common.error(error)
    });
    this.$food.find({
      query: {
        pgowner: this.user._id,
        date: {$gte: moment().startOf('day'), $lt: moment().endOf('day')}
      }
    }).then(response => {
      if (_.isEmpty(response)) {
        self.food_reports = {
          date: moment(),
          breakfast: 0,
          lunch: 0,
          dinner: 0
        }
      } else {
        self.food_reports = response[0];
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  // Chart setup
  areaChartWidget(element, chartHeight, color) {


    // Basic setup
    // ------------------------------

    // Define main variables
    var d3Container = d3.select(element),
      margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
      height = chartHeight - margin.top - margin.bottom;

    // Date and time format
    var parseDate = d3.time.format('%Y-%m-%d').parse;


    // Create SVG
    // ------------------------------

    // Container
    var container = d3Container.append('svg');

    // SVG element
    var svg = container
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Construct chart layout
    // ------------------------------

    // Area
    var area = d3.svg.area()
      .x(function (d) {
        return x(d.date);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.value);
      })
      .interpolate('monotone');


    // Construct scales
    // ------------------------------

    // Horizontal
    var x = d3.time.scale().range([0, width]);

    // Vertical
    var y = d3.scale.linear().range([height, 0]);


    // Load data
    // ------------------------------

    var data = [
      {
        "date": "2014-07-01",
        "value": 1203
      },
      {
        "date": "2014-07-02",
        "value": 480
      },
      {
        "date": "2014-07-03",
        "value": 903
      },
      {
        "date": "2014-07-04",
        "value": 790
      },
      {
        "date": "2014-07-05",
        "value": 1423
      },
      {
        "date": "2014-07-06",
        "value": 1222
      },
      {
        "date": "2014-07-07",
        "value": 948
      },
      {
        "date": "2014-07-08",
        "value": 1338
      },
      {
        "date": "2014-07-09",
        "value": 543
      },
      {
        "date": "2014-07-10",
        "value": 940
      },
      {
        "date": "2014-07-11",
        "value": 1245
      },
      {
        "date": "2014-07-12",
        "value": 683
      },
      {
        "date": "2014-07-13",
        "value": 898
      },
      {
        "date": "2014-07-14",
        "value": 1023
      },
      {
        "date": "2014-07-15",
        "value": 857
      },
      {
        "date": "2014-07-16",
        "value": 490
      },
      {
        "date": "2014-07-17",
        "value": 1009
      },
      {
        "date": "2014-07-18",
        "value": 437
      },
      {
        "date": "2014-07-19",
        "value": 735
      },
      {
        "date": "2014-07-20",
        "value": 865
      },
      {
        "date": "2014-07-21",
        "value": 478
      },
      {
        "date": "2014-07-22",
        "value": 690
      },
      {
        "date": "2014-07-23",
        "value": 954
      },
      {
        "date": "2014-07-24",
        "value": 1192
      },
      {
        "date": "2014-07-25",
        "value": 586
      },
      {
        "date": "2014-07-26",
        "value": 893
      },
      {
        "date": "2014-07-27",
        "value": 801
      },
      {
        "date": "2014-07-28",
        "value": 1182
      },
      {
        "date": "2014-07-29",
        "value": 1026
      },
      {
        "date": "2014-07-30",
        "value": 786
      },
      {
        "date": "2014-07-31",
        "value": 1056
      }
    ]


    // Pull out values
    data.forEach(function (d) {
      d.date = parseDate(d.date);
      d.value = +d.value;
    });

    // Get the maximum value in the given array
    var maxY = d3.max(data, function (d) {
      return d.value;
    });

    // Reset start data for animation
    var startData = data.map(function (datum) {
      return {
        date: datum.date,
        value: 0
      };
    });


    // Set input domains
    // ------------------------------

    // Horizontal
    x.domain(d3.extent(data, function (d, i) {
      return d.date;
    }));

    // Vertical
    y.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);


    //
    // Append chart elements
    //

    // Add area path
    svg.append("path")
      .datum(data)
      .attr("class", "d3-area")
      .style('fill', color)
      .attr("d", area)
      .transition() // begin animation
      .duration(1000)
      .attrTween('d', function () {
        var interpolator = d3.interpolateArray(startData, data);
        return function (t) {
          return area(interpolator(t));
        };
      });


    // Resize chart
    // ------------------------------

    // Call function on window resize
    $(window).on('resize', messagesAreaResize);

    // Call function on sidebar width change
    $(document).on('click', '.sidebar-control', messagesAreaResize);

    // Resize function
    //
    // Since D3 doesn't support SVG resize by default,
    // we need to manually specify parts of the graph that need to
    // be updated on window resize
    function messagesAreaResize() {

      // Layout variables
      width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


      // Layout
      // -------------------------

      // Main svg width
      container.attr("width", width + margin.left + margin.right);

      // Width of appended group
      svg.attr("width", width + margin.left + margin.right);

      // Horizontal range
      x.range([0, width]);


      // Chart elements
      // -------------------------

      // Area path
      svg.selectAll('.d3-area').datum(data).attr("d", area);
    }
  }

  showFoodCount() {
    let self = this;
    $("#delux_pie_arc_legend").empty();
    pieArcWithLegend("#delux_pie_arc_legend", 170);

    // Chart setup
    function pieArcWithLegend(element, size) {


      // Basic setup
      // ------------------------------

      // Add data set
      var data = [
        {
          "status": "Breakfast",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": self.delux_single_count,
          "vacancies": self.delux_single_vacancies,
          "color": "#29b6f6"
        },
        {
          "status": "Double",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": self.delux_double_count,
          "vacancies": self.delux_double_vacancies,
          "color": "#ec407a"
        },
        {
          "status": "Tripple",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": self.delux_triple_count,
          "vacancies": self.delux_triple_vacancies,
          "color": "#4CB6AC"
        },
        {
          "status": "Four",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": self.delux_four_count,
          "vacancies": self.delux_four_vacancies,
          "color": "#5C6BC0"
        }

      ];

      // Main variables
      var d3Container = d3.select(element),
        distance = 2, // reserve 2px space for mouseover arc moving
        radius = (size / 2) - distance,
        sum = d3.sum(data, function (d) {
          return d.value;
        });


      // Tooltip
      // ------------------------------

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .direction('e')
        .html(function (d) {
          return "<ul class='list-unstyled mb-5'>" +
            "<li>" + "<div class='text-size-base mb-5 mt-5'>" + d.data.icon + d.data.status + "</div>" + "</li>" +
            "<li>" + "Delux Total: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
            "<li>" + "Share: &nbsp;" + "<span class='text-semibold pull-right'>" + (100 / (sum / d.value)).toFixed(2) + "%" + "</span>" + "</li>" +
            "</ul>";
        });


      // Create chart
      // ------------------------------

      // Add svg element
      var container = d3Container.append("svg").call(tip);

      // Add SVG group
      var svg = container
        .attr("width", size)
        .attr("height", size / 2)
        .append("g")
        .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");


      // Construct chart layout
      // ------------------------------

      // Pie
      var pie = d3.layout.pie()
        .sort(null)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .value(function (d) {
          return d.value;
        });

      // Arc
      var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius / 1.3);


      //
      // Append chart elements
      //

      // Group chart elements
      var arcGroup = svg.selectAll(".d3-arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "d3-arc")
        .style({
          'stroke': '#fff',
          'stroke-width': 2,
          'cursor': 'pointer'
        });

      // Append path
      var arcPath = arcGroup
        .append("path")
        .style("fill", function (d) {
          return d.data.color;
        });


      //
      // Interactions
      //

      // Mouse
      arcPath
        .on('mouseover', function (d, i) {

          // Transition on mouseover
          d3.select(this)
            .transition()
            .duration(500)
            .ease('elastic')
            .attr('transform', function (d) {
              d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
              var x = Math.sin(d.midAngle) * distance;
              var y = -Math.cos(d.midAngle) * distance;
              return 'translate(' + x + ',' + y + ')';
            });

          $(element + ' [data-slice]').css({
            'opacity': 0.3,
            'transition': 'all ease-in-out 0.15s'
          });
          $(element + ' [data-slice=' + i + ']').css({'opacity': 1});
        })
        .on('mouseout', function (d, i) {

          // Mouseout transition
          d3.select(this)
            .transition()
            .duration(500)
            .ease('bounce')
            .attr('transform', 'translate(0,0)');

          $(element + ' [data-slice]').css('opacity', 1);
        });

      // Animate chart on load
      arcPath
        .transition()
        .delay(function (d, i) {
          return i * 500;
        })
        .duration(500)
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
          };
        });


      //
      // Append total text
      //

      svg.append('text')
        .attr('class', 'text-muted')
        .attr({
          'class': 'half-donut-total',
          'text-anchor': 'middle',
          'dy': -33
        })
        .style({
          'font-size': '12px',
          'fill': '#999'
        })
        .text('Delux Total');


      //
      // Append count
      //

      // Text
      svg
        .append('text')
        .attr('class', 'half-conut-count')
        .attr('text-anchor', 'middle')
        .attr('dy', -5)
        .style({
          'font-size': '21px',
          'font-weight': 500
        });

      // Animation
      svg.select('.half-conut-count')
        .transition()
        .duration(1500)
        .ease('linear')
        .tween("text", function (d) {
          var i = d3.interpolate(this.textContent, sum);

          return function (t) {
            this.textContent = d3.format(",d")(Math.round(i(t)));
          };
        });


      //
      // Legend
      //

      // Add legend list
      var legend = d3.select(element)
        .append('ul')
        .attr('class', 'chart-widget-legend')
        .selectAll('li')
        .data(pie(data))
        .enter()
        .append('li')
        .attr('data-slice', function (d, i) {
          return i;
        })
        .attr('style', function (d, i) {
          return 'border-bottom: solid 2px ' + d.data.color;
        })
        .text(function (d, i) {
          return d.data.status + ': ';
        });

      // Legend text
      legend.append('span')
        .text(function (d, i) {
          return d.data.vacancies + "/" + d.data.value;
        });
    }

  }

  showTenantsCount() {
    let self = this;
    $("#tenants_pie_arc_legend").empty();
    pieArcWithLegend("#tenants_pie_arc_legend", 170);

    // Chart setup
    function pieArcWithLegend(element, size) {


      // Basic setup
      // ------------------------------

      // Add data set
      var data = [
        {
          "status": "Available Tenants",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": self.tenant_count,
          "color": "#4CB6AC"
        }
      ];

      // Main variables
      var d3Container = d3.select(element),
        distance = 2, // reserve 2px space for mouseover arc moving
        radius = (size / 2) - distance,
        sum = d3.sum(data, function (d) {
          return d.value;
        });


      // Tooltip
      // ------------------------------

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .direction('e')
        .html(function (d) {
          return "<ul class='list-unstyled mb-5'>" +
            "<li>" + "<div class='text-size-base mb-5 mt-5'>" + d.data.icon + d.data.status + "</div>" + "</li>" +
            "<li>" + "Total: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
            "<li>" + "Share: &nbsp;" + "<span class='text-semibold pull-right'>" + (100 / (sum / d.value)).toFixed(2) + "%" + "</span>" + "</li>" +
            "</ul>";
        });


      // Create chart
      // ------------------------------

      // Add svg element
      var container = d3Container.append("svg").call(tip);

      // Add SVG group
      var svg = container
        .attr("width", size)
        .attr("height", size / 2)
        .append("g")
        .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");


      // Construct chart layout
      // ------------------------------

      // Pie
      var pie = d3.layout.pie()
        .sort(null)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .value(function (d) {
          return d.value;
        });

      // Arc
      var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius / 1.3);


      //
      // Append chart elements
      //

      // Group chart elements
      var arcGroup = svg.selectAll(".d3-arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "d3-arc")
        .style({
          'stroke': '#fff',
          'stroke-width': 2,
          'cursor': 'pointer'
        });

      // Append path
      var arcPath = arcGroup
        .append("path")
        .style("fill", function (d) {
          return d.data.color;
        });


      //
      // Interactions
      //

      // Mouse
      arcPath
        .on('mouseover', function (d, i) {

          // Transition on mouseover
          d3.select(this)
            .transition()
            .duration(500)
            .ease('elastic')
            .attr('transform', function (d) {
              d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
              var x = Math.sin(d.midAngle) * distance;
              var y = -Math.cos(d.midAngle) * distance;
              return 'translate(' + x + ',' + y + ')';
            });

          $(element + ' [data-slice]').css({
            'opacity': 0.3,
            'transition': 'all ease-in-out 0.15s'
          });
          $(element + ' [data-slice=' + i + ']').css({'opacity': 1});
        })
        .on('mouseout', function (d, i) {

          // Mouseout transition
          d3.select(this)
            .transition()
            .duration(500)
            .ease('bounce')
            .attr('transform', 'translate(0,0)');

          $(element + ' [data-slice]').css('opacity', 1);
        });

      // Animate chart on load
      arcPath
        .transition()
        .delay(function (d, i) {
          return i * 500;
        })
        .duration(500)
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
          };
        });


      //
      // Append total text
      //

      svg.append('text')
        .attr('class', 'text-muted')
        .attr({
          'class': 'half-donut-total',
          'text-anchor': 'middle',
          'dy': -33
        })
        .style({
          'font-size': '12px',
          'fill': '#999'
        })
        .text('Total Tenants');


      //
      // Append count
      //

      // Text
      svg
        .append('text')
        .attr('class', 'half-conut-count')
        .attr('text-anchor', 'middle')
        .attr('dy', -5)
        .style({
          'font-size': '21px',
          'font-weight': 500
        });

      // Animation
      svg.select('.half-conut-count')
        .transition()
        .duration(1500)
        .ease('linear')
        .tween("text", function (d) {
          var i = d3.interpolate(this.textContent, sum);

          return function (t) {
            this.textContent = d3.format(",d")(Math.round(i(t)));
          };
        });


      //
      // Legend
      //

      // Add legend list
      var legend = d3.select(element)
        .append('ul')
        .attr('class', 'chart-widget-legend')
        .selectAll('li')
        .data(pie(data))
        .enter()
        .append('li')
        .attr('data-slice', function (d, i) {
          return i;
        })
        .attr('style', function (d, i) {
          return 'border-bottom: solid 2px ' + d.data.color;
        })
        .text(function (d, i) {
          return d.data.status + ': ';
        });

      // Legend text
      legend.append('span')
        .text(function (d, i) {
          return d.data.value;
        });
    }

  }

  showPGCount() {
    let self = this;
    $("#pg_pie_arc_legend").empty();
    pieArcWithLegend("#pg_pie_arc_legend", 170);

    // Chart setup
    function pieArcWithLegend(element, size) {


      // Basic setup
      // ------------------------------

      // Add data set
      var data = [
        {
          "status": "Available PGs",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": self.pg_count,
          "color": "#29b6f6"
        }
      ];

      // Main variables
      var d3Container = d3.select(element),
        distance = 2, // reserve 2px space for mouseover arc moving
        radius = (size / 2) - distance,
        sum = d3.sum(data, function (d) {
          return d.value;
        });


      // Tooltip
      // ------------------------------

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .direction('e')
        .html(function (d) {
          return "<ul class='list-unstyled mb-5'>" +
            "<li>" + "<div class='text-size-base mb-5 mt-5'>" + d.data.icon + d.data.status + "</div>" + "</li>" +
            "<li>" + "Total: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
            "<li>" + "Share: &nbsp;" + "<span class='text-semibold pull-right'>" + (100 / (sum / d.value)).toFixed(2) + "%" + "</span>" + "</li>" +
            "</ul>";
        });


      // Create chart
      // ------------------------------

      // Add svg element
      var container = d3Container.append("svg").call(tip);

      // Add SVG group
      var svg = container
        .attr("width", size)
        .attr("height", size / 2)
        .append("g")
        .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");


      // Construct chart layout
      // ------------------------------

      // Pie
      var pie = d3.layout.pie()
        .sort(null)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .value(function (d) {
          return d.value;
        });

      // Arc
      var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius / 1.3);


      //
      // Append chart elements
      //

      // Group chart elements
      var arcGroup = svg.selectAll(".d3-arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "d3-arc")
        .style({
          'stroke': '#fff',
          'stroke-width': 2,
          'cursor': 'pointer'
        });

      // Append path
      var arcPath = arcGroup
        .append("path")
        .style("fill", function (d) {
          return d.data.color;
        });


      //
      // Interactions
      //

      // Mouse
      arcPath
        .on('mouseover', function (d, i) {

          // Transition on mouseover
          d3.select(this)
            .transition()
            .duration(500)
            .ease('elastic')
            .attr('transform', function (d) {
              d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
              var x = Math.sin(d.midAngle) * distance;
              var y = -Math.cos(d.midAngle) * distance;
              return 'translate(' + x + ',' + y + ')';
            });

          $(element + ' [data-slice]').css({
            'opacity': 0.3,
            'transition': 'all ease-in-out 0.15s'
          });
          $(element + ' [data-slice=' + i + ']').css({'opacity': 1});
        })
        .on('mouseout', function (d, i) {

          // Mouseout transition
          d3.select(this)
            .transition()
            .duration(500)
            .ease('bounce')
            .attr('transform', 'translate(0,0)');

          $(element + ' [data-slice]').css('opacity', 1);
        });

      // Animate chart on load
      arcPath
        .transition()
        .delay(function (d, i) {
          return i * 500;
        })
        .duration(500)
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
          };
        });


      //
      // Append total text
      //

      svg.append('text')
        .attr('class', 'text-muted')
        .attr({
          'class': 'half-donut-total',
          'text-anchor': 'middle',
          'dy': -33
        })
        .style({
          'font-size': '12px',
          'fill': '#999'
        })
        .text('Total PGs');


      //
      // Append count
      //

      // Text
      svg
        .append('text')
        .attr('class', 'half-conut-count')
        .attr('text-anchor', 'middle')
        .attr('dy', -5)
        .style({
          'font-size': '21px',
          'font-weight': 500
        });

      // Animation
      svg.select('.half-conut-count')
        .transition()
        .duration(1500)
        .ease('linear')
        .tween("text", function (d) {
          var i = d3.interpolate(this.textContent, sum);

          return function (t) {
            this.textContent = d3.format(",d")(Math.round(i(t)));
          };
        });


      //
      // Legend
      //

      // Add legend list
      var legend = d3.select(element)
        .append('ul')
        .attr('class', 'chart-widget-legend')
        .selectAll('li')
        .data(pie(data))
        .enter()
        .append('li')
        .attr('data-slice', function (d, i) {
          return i;
        })
        .attr('style', function (d, i) {
          return 'border-bottom: solid 2px ' + d.data.color;
        })
        .text(function (d, i) {
          return d.data.status + ': ';
        });

      // Legend text
      legend.append('span')
        .text(function (d, i) {
          return d.data.value;
        });
    }

  }

  showStaffCount() {
    let self = this;
    $("#staff_pie_arc_legend").empty();
    pieArcWithLegend("#staff_pie_arc_legend", 170);

    // Chart setup
    function pieArcWithLegend(element, size) {


      // Basic setup
      // ------------------------------

      // Add data set
      var data = [
        {
          "status": "Available Staff Members",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": self.staff_count,
          "color": "#ec407a"
        }
      ];

      // Main variables
      var d3Container = d3.select(element),
        distance = 2, // reserve 2px space for mouseover arc moving
        radius = (size / 2) - distance,
        sum = d3.sum(data, function (d) {
          return d.value;
        });


      // Tooltip
      // ------------------------------

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .direction('e')
        .html(function (d) {
          return "<ul class='list-unstyled mb-5'>" +
            "<li>" + "<div class='text-size-base mb-5 mt-5'>" + d.data.icon + d.data.status + "</div>" + "</li>" +
            "<li>" + "Total: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
            "<li>" + "Share: &nbsp;" + "<span class='text-semibold pull-right'>" + (100 / (sum / d.value)).toFixed(2) + "%" + "</span>" + "</li>" +
            "</ul>";
        });


      // Create chart
      // ------------------------------

      // Add svg element
      var container = d3Container.append("svg").call(tip);

      // Add SVG group
      var svg = container
        .attr("width", size)
        .attr("height", size / 2)
        .append("g")
        .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");


      // Construct chart layout
      // ------------------------------

      // Pie
      var pie = d3.layout.pie()
        .sort(null)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .value(function (d) {
          return d.value;
        });

      // Arc
      var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius / 1.3);


      //
      // Append chart elements
      //

      // Group chart elements
      var arcGroup = svg.selectAll(".d3-arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "d3-arc")
        .style({
          'stroke': '#fff',
          'stroke-width': 2,
          'cursor': 'pointer'
        });

      // Append path
      var arcPath = arcGroup
        .append("path")
        .style("fill", function (d) {
          return d.data.color;
        });


      //
      // Interactions
      //

      // Mouse
      arcPath
        .on('mouseover', function (d, i) {

          // Transition on mouseover
          d3.select(this)
            .transition()
            .duration(500)
            .ease('elastic')
            .attr('transform', function (d) {
              d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
              var x = Math.sin(d.midAngle) * distance;
              var y = -Math.cos(d.midAngle) * distance;
              return 'translate(' + x + ',' + y + ')';
            });

          $(element + ' [data-slice]').css({
            'opacity': 0.3,
            'transition': 'all ease-in-out 0.15s'
          });
          $(element + ' [data-slice=' + i + ']').css({'opacity': 1});
        })
        .on('mouseout', function (d, i) {

          // Mouseout transition
          d3.select(this)
            .transition()
            .duration(500)
            .ease('bounce')
            .attr('transform', 'translate(0,0)');

          $(element + ' [data-slice]').css('opacity', 1);
        });

      // Animate chart on load
      arcPath
        .transition()
        .delay(function (d, i) {
          return i * 500;
        })
        .duration(500)
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
          };
        });


      //
      // Append total text
      //

      svg.append('text')
        .attr('class', 'text-muted')
        .attr({
          'class': 'half-donut-total',
          'text-anchor': 'middle',
          'dy': -33
        })
        .style({
          'font-size': '12px',
          'fill': '#999'
        })
        .text('Total Staff');


      //
      // Append count
      //

      // Text
      svg
        .append('text')
        .attr('class', 'half-conut-count')
        .attr('text-anchor', 'middle')
        .attr('dy', -5)
        .style({
          'font-size': '21px',
          'font-weight': 500
        });

      // Animation
      svg.select('.half-conut-count')
        .transition()
        .duration(1500)
        .ease('linear')
        .tween("text", function (d) {
          var i = d3.interpolate(this.textContent, sum);

          return function (t) {
            this.textContent = d3.format(",d")(Math.round(i(t)));
          };
        });


      //
      // Legend
      //

      // Add legend list
      var legend = d3.select(element)
        .append('ul')
        .attr('class', 'chart-widget-legend')
        .selectAll('li')
        .data(pie(data))
        .enter()
        .append('li')
        .attr('data-slice', function (d, i) {
          return i;
        })
        .attr('style', function (d, i) {
          return 'border-bottom: solid 2px ' + d.data.color;
        })
        .text(function (d, i) {
          return d.data.status + ': ';
        });

      // Legend text
      legend.append('span')
        .text(function (d, i) {
          return d.data.value;
        });
    }

  }


  showRoomsCount(id, count:Number[], vacancies:Number[], total_text) {
    let self = this;
    $("#" + id).empty();
    pieArcWithLegend("#" + id, 170);

    // Chart setup
    function pieArcWithLegend(element, size) {


      // Basic setup
      // ------------------------------

      // Add data set
      var data = [
        {
          "status": "Single",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": count[0],
          "vacancies": vacancies[0],
          "color": "#29b6f6"
        },
        {
          "status": "Double",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": count[1],
          "vacancies": vacancies[1],
          "color": "#ec407a"
        },
        {
          "status": "Tripple",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": count[2],
          "vacancies": vacancies[2],
          "color": "#4CB6AC"
        },
        {
          "status": "Four",
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": count[3],
          "vacancies": vacancies[3],
          "color": "#5C6BC0"
        }

      ];

      // Main variables
      var d3Container = d3.select(element),
        distance = 2, // reserve 2px space for mouseover arc moving
        radius = (size / 2) - distance,
        sum = d3.sum(data, function (d) {
          return d.value;
        });


      // Tooltip
      // ------------------------------

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .direction('e')
        .html(function (d) {
          return "<ul class='list-unstyled mb-5'>" +
            "<li>" + "<div class='text-size-base mb-5 mt-5'>" + d.data.icon + d.data.status + "</div>" + "</li>" +
            "<li>" + "Delux Total: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
            "<li>" + "Share: &nbsp;" + "<span class='text-semibold pull-right'>" + (100 / (sum / d.value)).toFixed(2) + "%" + "</span>" + "</li>" +
            "</ul>";
        });


      // Create chart
      // ------------------------------

      // Add svg element
      var container = d3Container.append("svg").call(tip);

      // Add SVG group
      var svg = container
        .attr("width", size)
        .attr("height", size / 2)
        .append("g")
        .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");


      // Construct chart layout
      // ------------------------------

      // Pie
      var pie = d3.layout.pie()
        .sort(null)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .value(function (d) {
          return d.value;
        });

      // Arc
      var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius / 1.3);


      //
      // Append chart elements
      //

      // Group chart elements
      var arcGroup = svg.selectAll(".d3-arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "d3-arc")
        .style({
          'stroke': '#fff',
          'stroke-width': 2,
          'cursor': 'pointer'
        });

      // Append path
      var arcPath = arcGroup
        .append("path")
        .style("fill", function (d) {
          return d.data.color;
        });


      //
      // Interactions
      //

      // Mouse
      arcPath
        .on('mouseover', function (d, i) {

          // Transition on mouseover
          d3.select(this)
            .transition()
            .duration(500)
            .ease('elastic')
            .attr('transform', function (d) {
              d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
              var x = Math.sin(d.midAngle) * distance;
              var y = -Math.cos(d.midAngle) * distance;
              return 'translate(' + x + ',' + y + ')';
            });

          $(element + ' [data-slice]').css({
            'opacity': 0.3,
            'transition': 'all ease-in-out 0.15s'
          });
          $(element + ' [data-slice=' + i + ']').css({'opacity': 1});
        })
        .on('mouseout', function (d, i) {

          // Mouseout transition
          d3.select(this)
            .transition()
            .duration(500)
            .ease('bounce')
            .attr('transform', 'translate(0,0)');

          $(element + ' [data-slice]').css('opacity', 1);
        });

      // Animate chart on load
      arcPath
        .transition()
        .delay(function (d, i) {
          return i * 500;
        })
        .duration(500)
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
          };
        });


      //
      // Append total text
      //

      svg.append('text')
        .attr('class', 'text-muted')
        .attr({
          'class': 'half-donut-total',
          'text-anchor': 'middle',
          'dy': -33
        })
        .style({
          'font-size': '12px',
          'fill': '#999'
        })
        .text(total_text);


      //
      // Append count
      //

      // Text
      svg
        .append('text')
        .attr('class', 'half-conut-count')
        .attr('text-anchor', 'middle')
        .attr('dy', -5)
        .style({
          'font-size': '21px',
          'font-weight': 500
        });

      // Animation
      svg.select('.half-conut-count')
        .transition()
        .duration(1500)
        .ease('linear')
        .tween("text", function (d) {
          var i = d3.interpolate(this.textContent, sum);

          return function (t) {
            this.textContent = d3.format(",d")(Math.round(i(t)));
          };
        });


      //
      // Legend
      //

      // Add legend list
      var legend = d3.select(element)
        .append('ul')
        .attr('class', 'chart-widget-legend')
        .selectAll('li')
        .data(pie(data))
        .enter()
        .append('li')
        .attr('data-slice', function (d, i) {
          return i;
        })
        .attr('style', function (d, i) {
          return 'border-bottom: solid 2px ' + d.data.color;
        })
        .text(function (d, i) {
          return d.data.status + ': ';
        });

      // Legend text
      legend.append('span')
        .text(function (d, i) {
          return d.data.vacancies + "/" + d.data.value;
        });
    }

  }

  showCounts(id, status, color, value, total_text) {
    let self = this;
    $("#" + id).empty();
    pieArcWithLegend("#" + id, 170);

    // Chart setup
    function pieArcWithLegend(element, size) {


      // Basic setup
      // ------------------------------

      // Add data set
      var data = [
        {
          "status": status,
          "icon": "<i class='status-mark border-blue-300 position-left'></i>",
          "value": value,
          "color": color
        }
      ];

      // Main variables
      var d3Container = d3.select(element),
        distance = 2, // reserve 2px space for mouseover arc moving
        radius = (size / 2) - distance,
        sum = d3.sum(data, function (d) {
          return d.value;
        });


      // Tooltip
      // ------------------------------

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .direction('e')
        .html(function (d) {
          return "<ul class='list-unstyled mb-5'>" +
            "<li>" + "<div class='text-size-base mb-5 mt-5'>" + d.data.icon + d.data.status + "</div>" + "</li>" +
            "<li>" + "Total: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
            "<li>" + "Share: &nbsp;" + "<span class='text-semibold pull-right'>" + (100 / (sum / d.value)).toFixed(2) + "%" + "</span>" + "</li>" +
            "</ul>";
        });


      // Create chart
      // ------------------------------

      // Add svg element
      var container = d3Container.append("svg").call(tip);

      // Add SVG group
      var svg = container
        .attr("width", size)
        .attr("height", size / 2)
        .append("g")
        .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");


      // Construct chart layout
      // ------------------------------

      // Pie
      var pie = d3.layout.pie()
        .sort(null)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .value(function (d) {
          return d.value;
        });

      // Arc
      var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius / 1.3);


      //
      // Append chart elements
      //

      // Group chart elements
      var arcGroup = svg.selectAll(".d3-arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "d3-arc")
        .style({
          'stroke': '#fff',
          'stroke-width': 2,
          'cursor': 'pointer'
        });

      // Append path
      var arcPath = arcGroup
        .append("path")
        .style("fill", function (d) {
          return d.data.color;
        });


      //
      // Interactions
      //

      // Mouse
      arcPath
        .on('mouseover', function (d, i) {

          // Transition on mouseover
          d3.select(this)
            .transition()
            .duration(500)
            .ease('elastic')
            .attr('transform', function (d) {
              d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
              var x = Math.sin(d.midAngle) * distance;
              var y = -Math.cos(d.midAngle) * distance;
              return 'translate(' + x + ',' + y + ')';
            });

          $(element + ' [data-slice]').css({
            'opacity': 0.3,
            'transition': 'all ease-in-out 0.15s'
          });
          $(element + ' [data-slice=' + i + ']').css({'opacity': 1});
        })
        .on('mouseout', function (d, i) {

          // Mouseout transition
          d3.select(this)
            .transition()
            .duration(500)
            .ease('bounce')
            .attr('transform', 'translate(0,0)');

          $(element + ' [data-slice]').css('opacity', 1);
        });

      // Animate chart on load
      arcPath
        .transition()
        .delay(function (d, i) {
          return i * 500;
        })
        .duration(500)
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
          };
        });


      //
      // Append total text
      //

      svg.append('text')
        .attr('class', 'text-muted')
        .attr({
          'class': 'half-donut-total',
          'text-anchor': 'middle',
          'dy': -33
        })
        .style({
          'font-size': '12px',
          'fill': '#999'
        })
        .text(total_text);


      //
      // Append count
      //

      // Text
      svg
        .append('text')
        .attr('class', 'half-conut-count')
        .attr('text-anchor', 'middle')
        .attr('dy', -5)
        .style({
          'font-size': '21px',
          'font-weight': 500
        });

      // Animation
      svg.select('.half-conut-count')
        .transition()
        .duration(1500)
        .ease('linear')
        .tween("text", function (d) {
          var i = d3.interpolate(this.textContent, sum);

          return function (t) {
            this.textContent = d3.format(",d")(Math.round(i(t)));
          };
        });


      //
      // Legend
      //

      // Add legend list
      var legend = d3.select(element)
        .append('ul')
        .attr('class', 'chart-widget-legend')
        .selectAll('li')
        .data(pie(data))
        .enter()
        .append('li')
        .attr('data-slice', function (d, i) {
          return i;
        })
        .attr('style', function (d, i) {
          return 'border-bottom: solid 2px ' + d.data.color;
        })
        .text(function (d, i) {
          return d.data.status + ': ';
        });

      // Legend text
      legend.append('span')
        .text(function (d, i) {
          return d.data.value;
        });
    }

  }

  ngAfterViewChecked() {


  }

  ngAfterViewInit() {

  }

  getExpensesRent(start, end) {
    this.$expense.find({
      query: {
        user: this.user._id,
        rent: true,
        salary: false,
        date: {
          $gte: moment(start),
          $lte: moment(end)
        }
      }
    })
      .then(response => {
        this.rent_expenses = response;
        if (_.isEmpty(response)) {
          this.rent_msg = "No data available for the date range " + moment(start).format('MM-DD-YYYY') + " - " + moment(end).format('MM-DD-YYYY');
        } else {
          this.rent_amount = _.sumBy(response, function (o) {
            return o.amount
          })
          this.rent_msg = ""
        }
      }).catch(error => {
      this.$common.error(error)
    });
  }

  download() {
    var doc = new jsPDF('p', 'pt', 'a4');
    doc.addHTML($('#content-wrapper').get(0), 0, 20, {}, function () {
      doc.save('dashboard.pdf');
    });
  }
}
