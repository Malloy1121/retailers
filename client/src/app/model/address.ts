/**
 * Created by Malloy on 3/10/2017.
 */
export class Address {
  public id: any;
  public tag: string;
  public street: string;
  public city: string;
  public stateID: number;
  public state: string;
  public suite: string = "";
  public zipcode: number;
  public isPrimary: boolean;
}
