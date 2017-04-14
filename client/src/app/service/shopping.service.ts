import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from "@angular/http";
import "rxjs/operator/map";
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

  getProductsByCategory(categoryID: number, pageNumber: number, lowestPrice: any, highestPrice: any) {
    pageNumber -= 1;
    let lowest = -1;
    let highest = -1;
    if (lowestPrice == "") {
      lowest = -1;
    }
    else {
      lowest = lowestPrice;
    }
    if (highestPrice == "") {
      highest = -1;
    }
    else {
      highest = highestPrice;
    }
    console.log("Lowest: ", lowestPrice);
    console.log("Highest:", highestPrice);

    const params = new URLSearchParams();
    params.set("lowestPrice", "" + lowest + "");
    params.set("highestPrice", "" + highest + "");


    return this.http.get("/products/getProductsByCategory/" + categoryID + "/" + pageNumber, {search: params})
      .map((response: Response) => {
        return response.json();
      });
  }

  getProductsByCategoryAndKeyword(categoryID: number, keywords: string[], pageNumber: number, lowestPrice: any, highestPrice: any) {
    const keys = [];
    for (let keyword of keywords) {
      const keywordCollection = new KeywordCollection();
      keywordCollection.keyword = keyword;
      keys.push(keywordCollection);
    }
    let lowest = -1;
    let highest = -1;
    if (lowestPrice == "") {
      lowest = -1;
    }
    else {
      lowest = lowestPrice;
    }
    if (highestPrice == "") {
      highest = -1;
    }
    else {
      highest = highestPrice;
    }
    pageNumber -= 1;
    console.log("Lowest: ", lowestPrice);
    console.log("Highest:", highestPrice);
    const params = new URLSearchParams();
    params.set("lowestPrice", "" + lowest + "");
    params.set("highestPrice", "" + highest + "");
    return this.http.post("/products/getProductsByCategoryAndKeywords/" + categoryID + "/" + pageNumber, keys, {search: params})
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

  getProductsByPriceOrder(categoryID: number, page: number, keywords: string[], ascending: number, lowestPrice: any, highestPrice: any) {
    const keys = [];
    for (let keyword of keywords) {
      const keywordCollection = new KeywordCollection();
      keywordCollection.keyword = keyword;
      keys.push(keywordCollection);
    }

    let lowest = -1;
    let highest = -1;
    if (lowestPrice == "") {
      lowest = -1;
    }
    else {
      lowest = lowestPrice;
    }
    if (highestPrice == "") {
      highest = -1;
    }
    else {
      highest = highestPrice;
    }
    console.log("Lowest: ", lowestPrice);
    console.log("Highest:", highestPrice);
    const params = new URLSearchParams();
    params.set("lowestPrice", "" + lowest + "");
    params.set("highestPrice", "" + highest + "");
    // const orderFlag = ascending == true ? 1 : -1;
    return this.http.post("/products/getProductsByPriceOrder/" + categoryID + "/" + ascending + "/" + page, keys, {search: params})
      .map((response: Response) => {
        return response.json();
      });
  }
}
