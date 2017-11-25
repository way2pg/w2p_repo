import {Component, Input, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommonService} from "../../../services/common/common.service";
import {ExpenseService} from "../../../services/expenses/expense.service";
import {Expense} from "../../../models/expenses/expense";
import {ExpenseGroupService} from "../../../services/expenses/expense-group.service";
import {ExpenseGroup} from "../../../models/expenses/expense-group";
import {User} from "../../../models/profile";
import {UserService} from "../../../services/user/user.service";
import {ExpenseItem} from "../../../models/expenses/expense-item";
import {ExpenseItemService} from "../../../services/expenses/expense-item.service";

var _ = require('lodash');
declare var $:any;
var moment = require('moment')

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})

export class ExpenseComponent implements OnInit, AfterViewInit {
  @Input() data = null;
  user:User = null;
  expenses:Expense[] = []
  groupList:ExpenseGroup[] = []

  rent_expenses:Expense[] = []
  salary_expenses:Expense[] = []
  remaining_expenses:Expense[] = []

  rent_msg = null;
  salary_msg = null;
  remaining_msg = null;

  rent_amount = 0;
  salry_amount = 0;
  remaining_amount = 0;
  /* ========================================== */
  group:ExpenseGroup = new ExpenseGroup({});
  item:ExpenseItem = new ExpenseItem({});

  groups:ExpenseGroup[] = [];
  items:ExpenseItem[] = []

  expense_items:ExpenseItem[] = []
  expense:Expense = new Expense({});

  tenants = []
  staffmembers = []

  rent_group:ExpenseGroup = null;
  rent_item:ExpenseItem = null;
  rent_expense:Expense = new Expense({});

  sl_group:ExpenseGroup = null;
  sl_item:ExpenseItem = null;
  sl_expense:Expense = new Expense({});

  constructor(private route:ActivatedRoute,
              private router:Router,
              private $common:CommonService,
              private $group:ExpenseGroupService,
              private $expense:ExpenseService,
              private $item:ExpenseItemService,
              private $user:UserService) {

  }

  ngOnInit() {
    let self = this;
    this.getExpenseGroups();

    if (_.isEqual(this.$common.role(), "pgowner")) {
      this.expense.pgowner = this.rent_expense.pgowner = this.sl_expense.pgowner = this.$common.user();
    }
    $('.select').select2();
    this.activateGroup();
    this.activateItem();
    this.getStaffMembers()
    // Single picker
    $('.daterange-single').pickadate({
      labelMonthNext: 'Go to the next month',
      labelMonthPrev: 'Go to the previous month',
      labelMonthSelect: 'Pick a month from the dropdown',
      labelYearSelect: 'Pick a year from the dropdown',
      selectMonths: true,
      selectYears: 2,
      format: 'yyyy-mm-dd',
      onClose: function () {
        if (_.isEqual(this.$node.context.name, "rent_date")) {
          self.rent_expense.date = this.get();
        }
        if (_.isEqual(this.$node.context.name, "sl_date")) {
          self.sl_expense.date = this.get();
        }
        if (_.isEqual(this.$node.context.name, "me_date")) {
          self.expense.date = this.get();
        }
      }
    });

    $('.daterange-single').val(moment().format("YYYY-MM-DD")).pickadate()
    self.rent_expense.date = moment().format("YYYY-MM-DD");
    self.sl_expense.date = moment().format("YYYY-MM-DD");
    self.expense.date = moment().format("YYYY-MM-DD");
  }


  defaults() {
    let self = this;
    $('.daterange-rent').daterangepicker(
      {
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        dateLimit: {days: 120},
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
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

    $('.daterange-salary').daterangepicker(
      {
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        dateLimit: {days: 120},
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        opens: "left",
        applyClass: "btn-small bg-slate-600 btn-block",
        cancelClass: "btn-small btn-default btn-block",
        format: "MM/DD/YYYY"
      },
      function (start, end) {
        self.getExpensesSalary(start, end)
        $('.daterange-salary span').html(start.format('MM-DD-YYYY') + ' &nbsp; - &nbsp; ' + end.format('MM-DD-YYYY'));
      }
    );
    $('.daterange-salary span').html(moment().startOf('month').format('MM-DD-YYYY') + ' &nbsp; - &nbsp; ' + moment().endOf('month').format('MM-DD-YYYY'));

    $('.daterange-remaining').daterangepicker(
      {
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        dateLimit: {days: 120},
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        opens: "left",
        applyClass: "btn-small bg-slate-600 btn-block",
        cancelClass: "btn-small btn-default btn-block",
        format: "MM/DD/YYYY"
      },
      function (start, end) {
        self.getExpensesRemaining(start, end)
        $('.daterange-remaining span').html(start.format('MM-DD-YYYY') + ' &nbsp; - &nbsp; ' + end.format('MM-DD-YYYY'));
      }
    );
    $('.daterange-remaining span').html(moment().startOf('month').format('MM-DD-YYYY') + ' &nbsp; - &nbsp; ' + moment().endOf('month').format('MM-DD-YYYY'));

    self.getExpensesRent(moment().startOf('month'), moment().endOf('month'))
    self.getExpensesSalary(moment().startOf('month'), moment().endOf('month'))
    self.getExpensesRemaining(moment().startOf('month'), moment().endOf('month'))
  }

  getExpenseGroups() {
    this.$group.find({}).then(response => {
      if (!_.isEmpty(response)) {
        this.groupList = response;
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  getExpensesRemaining(start, end) {
    this.$expense.find({
      query: {
        createdBy: this.user._id,
        rent: false,
        salary: false,
        date: {
          $gte: moment(start),
          $lte: moment(end)
        }
      }
    })
      .then(response => {
        this.remaining_expenses = response;
        if (_.isEmpty(response)) {
          this.remaining_msg = "No data available for the date range " + moment(start).format('MM-DD-YYYY') + " - " + moment(end).format('MM-DD-YYYY')
        } else {
          this.remaining_amount = _.sumBy(response, function (o) {
            return o.amount
          })
          this.remaining_msg = ""
        }
      }).catch(error => {
      this.$common.error(error)
    });
  }

  getExpensesRent(start, end) {
    this.$expense.find({
      query: {
        createdBy: this.user._id,
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

  getExpensesSalary(start, end) {
    this.$expense.find({
      query: {
        createdBy: this.user._id,
        salary: true,
        rent: false,
        date: {
          $gte: moment(start),
          $lte: moment(end)
        }
      }
    })
      .then(response => {
        this.salary_expenses = response;
        if (_.isEmpty(response)) {
          this.salary_msg = "No data available for the date range " + moment(start).format('MM-DD-YYYY') + " - " + moment(end).format('MM-DD-YYYY')
        } else {
          this.salry_amount = _.sumBy(response, function (o) {
            return o.amount
          })
          this.salary_msg = ""
        }
      }).catch(error => {
      this.$common.error(error)
    });
  }


  getExpenses() {
    this.$expense.find({})
      .then(response => {
        if (!_.isEmpty(response)) {
          this.expenses = response;
        }
      }).catch(error => {
      this.$common.error(error)
    });
  }

  settings() {
    this.router.navigateByUrl('/user/expenses/settings');
  }

  show() {
    return !_.startsWith(this.router.url, '/reports');
  }

  ngAfterViewInit() {
    let self = this;
    if (_.isNull(this.data)) {
      self.user = this.$common.user();
      self.defaults()
    } else {
      this.$user.get(this.data).then(response => {
        if (!_.isEmpty(response)) {
          self.user = response;
          self.defaults()
        }
      })
    }
    this.getGroups();

    this.getTenants();

    $('.me_group').on('select2:select', function (evt) {
      self.expense.expense_group = this.value;
      self.getItemsById(this.value);
    }).on('select2:unselect', function (event) {
      self.expense_items = []
      self.expense.expense_group = null;
      self.expense.expense_item = null;
    });

    $('.me_item').on('select2:select', function (evt) {
      self.expense.expense_item = this.value;
    }).on('select2:unselect', function (event) {
      self.expense.expense_item = null;
    });

    $('.rent_tenant').on('select2:select', function (evt) {
      self.rent_expense.user = this.value;
    }).on('select2:unselect', function (event) {
      self.rent_expense.user = null;
    });

    $('.sl-staff').on('select2:select', function (evt) {
      self.sl_expense.user = this.value;
    }).on('select2:unselect', function (event) {
      self.sl_expense.user = null;
    });
    $('#model_expense_group').on('hidden.bs.modal', function () {
      debugger;
      self.group = new ExpenseGroup({});
    })
  }

  getGroups() {
    let self = this;
    this.$group.find({
      query: {
        createdBy: this.$common.user()._id,
        $client: {
          items: true
        }
      }
    }).then(response => {
      if (!_.isEmpty(response)) {
        $(".group-datatable-basic").DataTable().destroy();
        self.groups = response;
        self.rent_group = _.find(this.groups, {"rent": true});
        self.sl_group = _.find(this.groups, {"salary": true});
        self.getItems();        
      }
	  setTimeout(()=> {
          self.activateGroup()
          $(".table-group").show()
          $("#spinner").hide()
        }, 100);
    }).catch(error => {
      this.$common.error(error)
    });
  }

  create_group() {
    let self = this;
    this.$group.create(this.group).then(response => {
      self.$common.notify().success("Expence group created successfully")
      self.group = new ExpenseGroup({})
      self.getGroups();
    }).catch(error => {
      this.$common.error(error)
    });
  }

  getItems() {
    let self = this;
    this.$item.find({
      query: {
        createdBy: this.$common.user()._id,
        $client: {
          group: true
        }
      }
    }).then(response => {
      if (!_.isEmpty(response)) {
        $(".item-datatable-basic").DataTable().destroy();
        self.items = response;
        self.rent_item = _.find(self.items, function (litem) {
          return litem.expense_group._id === self.rent_group._id;
        });
        self.sl_item = _.find(self.items, function (litem) {
          return litem.expense_group._id === self.sl_group._id;
        });      
      }
	   setTimeout(()=> {
          self.activateItem()
          $(".table-item").show()
          $("#spinner").hide()
        }, 100);
    }).catch(error => {
      this.$common.error(error)
    });
  }

  getItemsById(id) {
    let self = this;
    this.$item.find({
      query: {
        createdBy: this.$common.user()._id,
        expense_group: id
      }
    }).then(response => {
      if (!_.isEmpty(response)) {
        self.expense_items = response;
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  add_item() {
    let self = this;

    this.item.expense_group = $(".group").val();
    this.item.operation = $(".expense_type").val();
    this.$item.create(this.item).then(response => {
      self.$common.notify().success("Expence item added successfully")
      $(".group").val("").trigger("change")
      $(".expense_type").val("").trigger("change")
      self.item = new ExpenseItem({})
      self.getItems();
    }).catch(error => {
      this.$common.error(error)
    });

  }

  private activateGroup() {
    $(".table-group").hide()
    $("#spinner").show()
    $('.group-datatable-basic').DataTable({
      columnDefs: [{
        targets: -1, // Hide actions column
        visible: true
      }],
      bFilter: false,
      bInfo: false,
      paging: false
    });

  }

  private activateItem() {
    $(".table-item").hide()
    $("#spinner").show()
    $('.item-datatable-basic').DataTable({
      columnDefs: [{
        targets: -1, // Hide actions column
        visible: true
      }],
      bFilter: false,
      bInfo: false,
      paging: false
    });

  }

  editGroup(group) {
    this.group = group;
  }

  showGroup() {
    this.group = new ExpenseGroup({});
  }

  editItem(item) {
    this.item = item;
    $(".group").val(this.item.expense_group["_id"]).trigger("change")
    $(".expense_type").val(this.item.operation).trigger("change")

  }

  add_expense() {
    this.$expense.create(this.expense).then(response => {
      if (!_.isEmpty(response)) {
        this.$common.notify().success("Expense added successfully");
        this.expense = new Expense({});
        $(".me_group").val("").trigger("change")
        $(".me_item").val("").trigger("change")
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  getTenants() {
    let query = {}
    if (_.isEqual(this.$common.user().role, "admin")) {
      query = {
        role: "tenant"
      };
    } else {
      query = {
        role: "tenant",
        createdBy: this.$common.user()._id
      }
    }
    this.$user.find({
      query: query
    }).then(response => {
      this.tenants = response;
    }).catch(error => {
      this.$common.error(error)
    });
  }

  getStaffMembers() {
    this.$user.find({
      query: {
        role: "pgstaff"
      }
    }).then(response => {
      this.staffmembers = response;
    }).catch(error => {
      this.$common.error(error)
    });
  }

  setRent() {

  }

  add_rent() {
    this.rent_expense.expense_group = this.rent_group._id;
    this.rent_expense.expense_item = this.rent_item._id;
    this.rent_expense.rent = true;

    this.$expense.create(this.rent_expense).then(response => {
      if (!_.isEmpty(response)) {
        this.$common.notify().success("Rent added successfully");
        this.rent_expense = new Expense({});
        $('.rent_tenant').val("").trigger("change")
        this.rent_expense.date = moment().format("YYYY-MM-DD");
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  add_salary() {
    this.sl_expense.expense_group = this.sl_group._id;
    this.sl_expense.expense_item = this.sl_item._id;
    this.sl_expense.salary = true;
    this.sl_expense.date = $(".sl_date").val()

    this.$expense.create(this.sl_expense).then(response => {
      if (!_.isEmpty(response)) {
        this.$common.notify().success("Salary details added successfully");
        this.sl_expense = new Expense({});
        $('.sl-staff').val("").trigger("change")
        this.sl_expense.date = moment().format("YYYY-MM-DD");
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  setDefaults() {
    debugger;
    $(".sl_group").val(this.sl_group._id).trigger("change")
    $(".rent_group").val(this.rent_group._id).trigger("change")
    $(".rent_item").val(this.rent_item._id).trigger("change")
    $('.daterange-single').val(moment().format("MM-DD-YYYY")).pickadate()
  }

}


