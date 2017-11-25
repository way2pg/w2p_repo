import {Injectable} from '@angular/core';
import * as hooks from 'feathers-hooks';
import {environment} from "../../../environments/environment.prod";
//const localstorage = require('feathers-localstorage');
const io = require('socket.io-client');
import * as feathers from 'feathers';
const rest = require('feathers-rest/client')
const socketio = require('feathers-socketio/client');
const authentication = require('feathers-authentication-client');
const superagent = require('superagent');
const reactive = require('feathers-reactive');
const RxJS = require('rxjs');
const _ = require('lodash');

const HOST = environment.api;  // Your base server URL here

@Injectable()
export class RestService {
  public _app:any;

  constructor() {
    this._app = feathers() // Initialize feathers
      .configure(rest(HOST).superagent(superagent)) // Fire up rest
      .configure(hooks())
      .configure(reactive({idField: '_id'}))
      .configure(authentication({storage: window.localStorage, storageKey: 'accessToken'}));
  }
}

@Injectable()
export class SocketService {
  public socket:any;
  public _app:any;

  constructor() {
    this.socket = io(HOST);
    this._app = feathers()
      .configure(socketio(this.socket))
      .configure(hooks())
      .configure(reactive({idField: '_id'}))
      .configure(authentication({storage: window.localStorage, storageKey: 'accessToken'}));

    console.log(this._app)
    this._app.io.on('connect', () => {
      console.log("<====================== Inside ==================>");
    });

    this._app.io.on('error', (err) => {
      console.log('Error connecting to server', err);
    });

    this._app.io.on('disconnect', () => {
      console.log('Disconnect from server');
    });

    this._app.io.on('reconnect', (number) => {
      console.log('Reconnected to server', number);
    });

    this._app.io.on('reconnect_attempt', () => {
      console.log('Reconnect Attempt');
    });

    this._app.io.on('reconnecting', (number) => {
      console.log('Reconnecting to server', number);
    });

    this._app.io.on('reconnect_error', (err) => {
      console.log('Reconnect Error', err);
    });

    this._app.io.on('reconnect_failed', () => {
      console.log('Reconnect failed');
    });

    this._app.io.on('connect_error', () => {
      console.log('connect_error');
    });
  }


}
