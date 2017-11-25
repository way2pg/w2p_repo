import {Component, OnInit, Input,OnDestroy} from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import {CommonService} from "../../../services/common/common.service";
import {User} from "../../../models/profile";
const _ = require("lodash")
declare var $:any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent{

  user:User;

  constructor( private router: Router,
               private $common:CommonService) {

  }

  ngOnInit() {
       this.user = this.$common.user();

    $('.ui.search')
      .search({
        type          : 'category',
        minCharacters : 3,
        apiSettings   : {
          onResponse: function(githubResponse) {
            var
              response = {
                results : {}
              }
              ;
            // translate GitHub API response to work with search
            $.each(githubResponse.items, function(index, item) {
              var
                language   = item.language || 'Unknown',
                maxResults = 8
                ;
              if(index >= maxResults) {
                return false;
              }
              // create new language category
              if(response.results[language] === undefined) {
                response.results[language] = {
                  name    : language,
                  results : []
                };
              }
              // add result to category
              response.results[language].results.push({
                title       : item.name,
                description : item.description,
                url         : item.html_url
              });
            });
            return response;
          },
          url: '//api.github.com/search/repositories?q={query}'
        }
      })
    ;
  }
  isLoggedIn() {
    return this.$common.isLoggedIn();
  }
  showLeftMenu() {
    if (!this.isLoggedIn() && (
      _.includes(this.router.url, "/home") ||
      _.includes(this.router.url, "/auth/login") ||
      _.includes(this.router.url, "/auth/register") ||
      _.includes(this.router.url, "/howitworks") ||
      _.includes(this.router.url, "/support") ||
      _.includes(this.router.url, "/referrals_home"))) {
      return true;
    } else {
      return false;
    }
  }
}
