import {Component, Input, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ExpenseGroup} from "../../../../models/expenses/expense-group";
import {ExpenseItem} from "../../../../models/expenses/expense-item";
import {Expense} from "../../../../models/expenses/expense";
import {CommonService} from "../../../../services/common/common.service";
import {ExpenseGroupService} from "../../../../services/expenses/expense-group.service";
import {UserService} from "../../../../services/user/user.service";
import {ExpenseService} from "../../../../services/expenses/expense.service";
import {ExpenseItemService} from "../../../../services/expenses/expense-item.service";


var _ = require('lodash');
declare var $:any;
var moment = require('moment')

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class ESettingsComponent{


  constructor() {

  }

 }


