import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/operator/map";

@Injectable()
export class OrderService {

  constructor(private http: Http) {
  }

  fetchOrders(index: number, page: number) {
    return this.http.get("/order/getOrders/" + index + "/" + page)
      .map((response: Response) => {
        return response.json();
      })

  }

  fetchOrderDetail(id: number) {
    return this.http.get("/order/getOrderDetail/" + id)
      .map((response: Response) => {
        return response.json();
      })

  }

}
