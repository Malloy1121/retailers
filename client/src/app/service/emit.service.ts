import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class MyEmitService {

  public userStatusSubject: Subject<any> = new Subject();
  public cartItemAmountSubject: Subject<any> = new Subject();
  public totalPageSubject: Subject<any> = new Subject();
  public currentPageSubject: Subject<any> = new Subject();
  public changePageSubject:Subject<any>=new Subject();

  constructor() {
  }

}
