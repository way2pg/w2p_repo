import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


const _ = require('lodash');
const moment = require('moment');

declare var $:any;
@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {

  constructor(private router:Router,
              private route:ActivatedRoute) {

  }

  ngOnInit() {
   
  }

}

