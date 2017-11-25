import {Injectable} from '@angular/core';
import {SocketService, RestService} from "../feathersjs/feathers.service";
import {NotifyService} from "../notify.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
const Howl = require("howler")
@Injectable()
export class CommonService {

  private subject = new Subject<any>();

  constructor(private $router:Router,
              private $activatedRoute:ActivatedRoute,
              private $socket:SocketService,
              private $rest:RestService,
              private $notify:NotifyService) {

  }


  send(object:string) {
    this.subject.next({user: object});
  }

  clear() {
    this.subject.next();
  }

  get():Observable<any> {
    return this.subject.asObservable();
  }


  rest() {
    return this.$rest._app;
  }

  socket() {
    return this.$socket._app;
  }

  io() {
    return this.socket().io;
  }

  notify() {
    return this.$notify;
  }

  user() {
    return (this.socket().settings.storage.user) ? JSON.parse(this.socket().settings.storage.user) : null;
  }

  router() {
    return this.$router;
  }

  service(service_name) {
    return this.$socket._app.service(service_name);
  }

  logout() {
    console.log(this.socket())
    this.socket().logout();
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('accessToken') !== null;
  }

  role() {
    return this.user().role;
  }

  id() {
    return this.user()._id;
  }

  sound() {
    var sound = new Howl.Howl({
      src: ['/assets/sounds/notify.mp3']
    });

    sound.play();
  }

  error(error) {
    console.log(error)
    this.notify().warning(error.message)
  }

  success(message){
    this.notify().success(message)
  }

  warning(message){
    this.notify().warning(message)
  }
}
