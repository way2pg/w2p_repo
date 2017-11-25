import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CommonService} from "../../../services/common/common.service";
import {ExpenseService} from "../../../services/expenses/expense.service";
import {Expense} from "../../../models/expenses/expense";


const _ = require('lodash');
const moment=require('moment');

declare var $:any;
@Component({
  selector: 'pg-owner',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class StaffPaymentComponent implements OnInit {

  rent_expenses:Expense[] = []
  rent_msg = null;
  rent_amount = 0;
  error:any;

  constructor(private router:Router,
              private $common:CommonService,
              private $expense:ExpenseService) {

  }

  ngOnInit() {
    let self = this;

    $('.daterange-rent').daterangepicker(
      {
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        dateLimit: {days: 120},
        ranges: {
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        opens: "left",
        applyClass: "btn-small bg-slate-600 btn-block",
        cancelClass: "btn-small btn-default btn-block",
        format: "MM/DD/YYYY"
      },
      function (start, end) {
        self.getExpensesRent(start, end)
        $('.daterange-rent span').html(start.format('MM-DD-YYYY') + ' &nbsp; - &nbsp; ' + end.format('MM-DD-YYYY'));
      }
    );
    $('.daterange-rent span').html(moment().startOf('month').format('MM-DD-YYYY') + ' &nbsp; - &nbsp; ' + moment().endOf('month').format('MM-DD-YYYY'));

    this.getExpenses();
  }

  getExpenses() {
    this.$expense.find({
      query: {
        user: this.$common.user()._id,
        rent: false,
        salary: true,
      }
    }).then(response => {
      this.rent_expenses = response;
      if (_.isEmpty(response)) {
        this.rent_msg = "No data available for the date range ";
      } else {
        this.rent_amount = _.sumBy(response, function (o) {
          return o.amount
        })
        this.rent_msg = ""
      }
    })
  }

  getExpensesRent(start, end) {
    this.$expense.find({
      query: {
        user: this.$common.user()._id,
        rent: false,
        salary: true,
        date: {
          $gte: moment(start),
          $lte: moment(end)
        }
      }
    })
      .then(response => {
        console.log("rent_expenses")
        console.log(response)
        this.rent_expenses = response;
        if (_.isEmpty(response)) {
          this.rent_msg = "No data available for the date range " + moment(start).format('MM-DD-YYYY') + " - " + moment(end).format('MM-DD-YYYY');
        } else {
          this.rent_amount = _.sumBy(response, function (o) {
            return o.amount
          })
          this.rent_msg = ""
        }
      })
  }


  goBack() {
    window.history.back();
  }


}

