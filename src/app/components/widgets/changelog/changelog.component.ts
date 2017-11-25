import { Component,Input } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {User} from "../../../models/profile";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector : 'user',
  templateUrl : './changelog.component.html',
  styleUrls : ['./changelog.component.css']
})

export class ChangelogComponent {
  @Input() user:User=this.userService.getUser();

  constructor(private authService: AuthService,
              private router: Router,
              private userService:UserService) {}

  ngOnInit() {
    /*this.userService.getUserDetails().subscribe((user: User) => {
      if(user){
        this.user=user;
      }
    });*/
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }

}
