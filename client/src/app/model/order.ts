import {Payment} from "./payment";
import {Address} from "./address";
import {OrderItem} from "./order-item";
/**
 * Created by Malloy on 4/11/2017.
 */

export class Order {
  public orderID: number = -1;

  public payment: Payment;

  public address: Address;

  public items: OrderItem[];

  public total: number = 0;

  public subtotal: number = 0;

  public tax: number = 0;

  public handling: number = 0;

  public status: string = "";

  public month: string = "";

  public year: string = "";

  public date: string = "";
}
