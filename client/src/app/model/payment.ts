/**
 * Created by Malloy on 3/27/2017.
 */

export class Payment {
  public id: number;

  public name: string;

  public number: number;

  public month: number;

  public year: number;

  public isPrimary: boolean;

  public street: string;

  public suite: string = "";

  public city: string;

  public state: string;

  public stateID: number;

  public zipcode: number;

  public isOpen: boolean = false;

}
