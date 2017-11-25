import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';
import {environment} from "../../../environments/environment.prod";

declare var $:any;

@Component({
  selector: 'admin-mongo',
  templateUrl: './mongo.component.html',
  styleUrls: ['./mongo.component.css']
})
export class MongoComponent implements OnInit,AfterViewInit {
//  mongoui:string = "http://ourspg.com:1234/";
  mongoui:string = environment.mongo_url;

  ngOnInit():void {
  }


  constructor(private router:Router, private http:Http) {

  }

  ngAfterViewInit():void {

  }

}
