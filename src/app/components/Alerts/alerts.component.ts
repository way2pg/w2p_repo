import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {Schedule} from "../../models/schedule/schedule";
import {ScheduleService} from "../../services/schedule.service";
import {CommonService} from "../../services/common/common.service";
import {Agenda} from "../../models/common/agenda";
import {AgendaService} from "../../services/common/agenda.service";
import {User} from "../../models/profile";
declare var $:any;
declare var AnyTime:any;
var _ = require('lodash');
var cronstrue = require('cronstrue');
var parser = require('cron-parser');

@Component({
  selector: 'pg-owner',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})

export class AlertsComponent implements OnInit,AfterViewInit {
  constructor() {

  }

  ngOnInit() {

  }

  private activate() {

  }

  ngAfterViewInit() {


  }

}

