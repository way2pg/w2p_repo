import {Injectable} from '@angular/core';
import {CommonService} from "../common/common.service";
var _ = require('lodash');

@Injectable()
export class FoodService {
  service:any;
  private SERVICE_API = "/api/foodmenu";

  constructor(private _common:CommonService) {
    this.service = _common.service(this.SERVICE_API);

  }


  find(query:any) {
    debugger;
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.find(query);
      }
    })
  }

  get(id:string) {
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.get(id);
      }
    })
  }

  create(object:any) {
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.create(object);
      }
    })

  }

  remove(id:string, query:any) {
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.remove(id, query);
      }
    })
  }

  patch(id:string, object:any) {
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.patch(id, object);
      }
    })
  }

/*  private FOOD_MENU_LATEST_URL:string = "api/pgowner/foodmenu";
  private FOOD_MENU_URL:string = "api/pgowner/food";


  public constants:Constants;


  constructor(private http:Http, constants:Constants) {
    this.constants = constants;
  }


  saveFoodMenu(foodMenu:FoodModel) {
    debugger;
    if (foodMenu._id) {
      console.log("Inside if " + foodMenu._id);
      return this.putFoodMenu(foodMenu);
    } else {
      console.log("Inside if " + foodMenu._id);
      return this.postFoodMenu(foodMenu);
    }
  }

  getFoodMenuList():Promise<any> {
    debugger;
    return this.http.get(this.FOOD_MENU_URL + this.constants.getToken())
      .map(response => {
        return response.json().data
      })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getFoodMenu():Promise<any> {
    debugger;
    return this.http.get(this.FOOD_MENU_LATEST_URL + this.constants.getToken())
      .map(response => {
        return response.json().data
      })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getFoodMenuById(_id:string):Promise<any> {
    debugger;
    return this.http.get(`${this.FOOD_MENU_URL}/${_id}`)
      .map(response => {
        return response.json().data[0]
      })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  private putFoodMenu(foodMenu:FoodModel):Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .put(`${this.FOOD_MENU_URL}/${foodMenu._id}` + this.constants.getToken(), JSON.stringify(foodMenu), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private postFoodMenu(foodMenu:FoodModel):Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.FOOD_MENU_URL + this.constants.getToken(), JSON.stringify(foodMenu), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error:any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  //Delete Food Menu

  delete(food:any):Promise<any> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.FOOD_MENU_URL}/${food._id}` + this.constants.getToken();
    return this.http
      .delete(url, headers)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  checkFoodMenu(week:number,year:number):Promise<any> {
    debugger;
    return this.http.get(`${this.FOOD_MENU_URL}/${week}/${year}`)
      .map(response => {
        debugger;
        return response.json()
      })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
  */

}
