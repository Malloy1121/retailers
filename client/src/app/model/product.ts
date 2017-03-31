import {User} from "./user";
import {ItemImage} from "./item-image";
import {ItemType} from "./item-type";
/**
 * Created by Malloy on 3/29/2017.
 */

export class Product {
  public id: number;

  public name: string;

  public retailer: User;

  public images: ItemImage[];

  public description: string;

  public details: string[];

  public briefDescription: string;

  public category: string;

  public categoryID: number;

  public itemType: ItemType[];

}
