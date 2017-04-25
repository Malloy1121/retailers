import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ShoppingService} from "../../../../service/shopping.service";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {Subscription} from "rxjs";
import {ItemType} from "../../../../model/item-type";
import {Product} from "../../../../model/product";
import {CartItem} from "../../../../model/cart-item";
import {CartService} from "../../../../service/cart.service";
import {AuthService} from "../../../../service/auth.service";

declare var alert: any;

@Component({
  selector: 'app-item-detail',
  templateUrl: 'item-detail.component.html',
  styleUrls: ['item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  public lowestPrice: number = 0.00;
  public highestPrice: number = 0.00;
  public currentType: ItemType = new ItemType();
  public currentItem: Product = new Product();
  public itemTypes: ItemType[] = [];
  public amount: FormControl;
  public totalInventory: number = 0;
  public purchaseForm: FormGroup;
  private paramSub: Subscription;
  private amountSub: Subscription;
  private route: RouterStateSnapshot;
  public currentImage:string="";

  constructor(private fb: FormBuilder,
              private shp: ShoppingService,
              private actRoute: ActivatedRoute,
              private cartService: CartService,
              private router: Router,
              private authService: AuthService) {
    this.route = this.router.routerState.snapshot;
  }

  ngOnInit() {
    console.log(this.actRoute.snapshot.url);
    this.paramSub = this.actRoute.params.subscribe(data => {
      if (data["id"]) {
        const id = data["id"];
        this.shp.getProductById(id)
          .toPromise()
          .then(data => {
            if (data.result == true) {
              this.currentItem = data.object;
              this.currentImage="https://wallpaperbrowse.com/media/images/Dubai-Photos-Images-Oicture-Dubai-Landmarks-800x600.jpg";
              this.findPrices(this.currentItem.itemType);
            }
            else {
              this.router.navigateByUrl("/products/product-list");
            }
          });
      }
    });
    this.buildForm();
    this.amountSub = this.purchaseForm.valueChanges.subscribe(data => {
      if (this.currentType.id >= 0) {
        if (this.amount.value > this.currentType.inventory) {
          this.amount.setValue(this.currentType.inventory);
        }
      }
    });
  }

  findPrices(itemsTypes: ItemType[]) {
    let min = 0, max = 0;

    if (itemsTypes != null && itemsTypes.length > 0) {
      min = itemsTypes[0].unitPrice;
      max = itemsTypes[0].unitPrice;
    }

    for (let itemType of itemsTypes) {
      this.totalInventory += itemType.inventory;
      if (itemType.unitPrice < min) {
        min = itemType.unitPrice;
      }
      if (itemType.unitPrice > max) {
        max = itemType.unitPrice;
      }
    }

    this.highestPrice = max;
    this.lowestPrice = min;
  }

  typeOnClick(itemType: ItemType) {
    this.currentType = itemType;
    const newAmount = this.amount.value > this.currentType.inventory ? 0 : this.amount.value;
    this.amount.setValue(newAmount);
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
    this.amountSub.unsubscribe();
  }

  amountOnBlur() {

  }

  buildForm() {
    this.amount = new FormControl(1, Validators.compose([
      Validators.required,
      this.amountValidator.bind(this),
      Validators.pattern(/^\d+$/)
    ]));

    this.purchaseForm = this.fb.group({
      amount: this.amount
    });
  }

  categoryValidator(c: FormControl) {
    return c.value > 0 ? null : {category: true};
  }

  amountValidator(c: FormControl) {
    if (this.currentType.id >= 0) {
      return c.value > 0 && c.value <= this.currentType.inventory ? null : {amount: true};
    }
    return null;
  }

  onAddToCart() {
    if (this.purchaseForm.invalid) {
      return;
    }

    const cartItem = new CartItem();
    cartItem.amount = this.amount.value;
    cartItem.itemTypeID = this.currentType.id;
    cartItem.productID = this.currentItem.id;

    this.authService.getCurrentUser()
      .toPromise()
      .then(data => {
        console.log(data);
        if (data.result == true) {
          this.addToCart(cartItem);
        }
        else {
          this.authService.logout()
            .toPromise()
            .then(data => {
              if (data == 200) {
                this.router.navigate(["/auth/login"], {queryParams: {url: this.route.url}});
              }
            });
        }
      });

  }

  addToCart(cartItem) {
    this.cartService.addToCart(cartItem)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.router.navigateByUrl("/products/cart");
        }
        else {
          alert("Add to cart failed! Please try again.");
        }
      });
  }

  onAddToWishList() {
    const cartItem = new CartItem();
    cartItem.itemTypeID = this.currentType.id;
    cartItem.productID = this.currentItem.id;
    cartItem.amount = this.amount.value;
    this.authService.getCurrentUser()
      .toPromise()
      .then(data => {
        console.log(data);
        if (data.result == true) {
          this.addToWishList(cartItem);
        }
        else {
          this.authService.logout()
            .toPromise()
            .then(data => {
              if (data == 200) {
                this.router.navigate(["/auth/login", {url: this.route.url}]);
              }
            });
        }
      });

  }

  addToWishList(cartItem) {
    this.cartService.addToWishList(cartItem)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.router.navigateByUrl("/auth/account/wish-list");
        }
        else {
          alert("Add to wish list failed! Please try again.");
        }
      });
  }

}
