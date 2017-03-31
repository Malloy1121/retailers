import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx";
import {Category} from "../model/category";
import {Page} from "../model/page";

@Injectable()
export class ShoppingService {

  constructor(private http: Http) {
  }

  getAllCategories() {
    return this.http.get("/products/getAllCategories")
      .map((response: Response) => {
        return response.json();
      });
  }

  getProductsByCategory(categoryID: number, pageNumber: number) {
    // const category = new Category();
    // category.id = categoryID;
    // const page = new Page();
    // page.pageNumber = pageNumber;
    pageNumber -= 1;
    return this.http.get("/products/getProductsByCategory/" + categoryID + "/" + pageNumber)
      .map((response: Response) => {
        return response.json();
      });
  }

  getProductById(id: number) {
    return this.http.get("/products/getProductById/" + id)
      .map((response: Response) => {
        return response.json();
      });
  }

  ifItemExist(id:number){
    return this.http.get("/products/ifItemExists/" + id)
      .map((response: Response) => {
        return response.json();
      });
  }
}
