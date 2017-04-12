import {CartItem} from "./cart-item";
import {Payment} from "./payment";
import {Address} from "./address";
/**
 * Created by Malloy on 4/10/2017.
 */

export class Checkout{

  public  cartItems:CartItem[];

  public payment:Payment;

  public address:Address;
}
