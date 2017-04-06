import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx";
import {KeywordCollection} from "../model/keyword-collection";

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
    pageNumber -= 1;
    return this.http.get("/products/getProductsByCategory/" + categoryID + "/" + pageNumber)
      .map((response: Response) => {
        return response.json();
      });
  }

  getProductsByCategoryAndKeyword(categoryID: number, keywords: string[], pageNumber: number) {
    const keys = [];
    for (let keyword of keywords) {
      const keywordCollection = new KeywordCollection();
      keywordCollection.keyword = keyword;
      keys.push(keywordCollection);
    }
    pageNumber -= 1;
    return this.http.post("/products/getProductsByCategoryAndKeywords/" + categoryID + "/" + pageNumber, keys)
      .map((response: Response) => {
        return response.json();
      });
  }

  getProductsByKeywords(keyword: string) {
    const keywordCollection = new KeywordCollection();
    keywordCollection.keyword = keyword;
    return this.http.post("/products/getProductsByKeywords", keywordCollection)
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

  ifItemExist(id: number) {
    return this.http.get("/products/ifItemExists/" + id)
      .map((response: Response) => {
        return response.json();
      });
  }
}
