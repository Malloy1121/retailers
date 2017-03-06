import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private currentCategory: string = "All";
  private searchBarGetFocus: boolean = false;
  private isAuthenticated: boolean;
  private categories=["alfkjdalf","sd","a","fdaf","fsadf"];

  @ViewChild("categoryMenu") select: ElementRef;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.currentCategory = this.select.nativeElement.options[this.select.nativeElement.selectedIndex].text;

    this.isAuthenticated = this.authService.getIsAuthenticated();
  }

  searchBarOnFocus() {
    this.searchBarGetFocus = true;
  }

  searchBarOnBlur() {
    this.searchBarGetFocus = false;
  }

  login() {
    this.isAuthenticated = this.authService.login();
  }

  logout() {
    this.isAuthenticated = this.authService.logout();
  }

  categoryOnClick(category){
    console.log(category);
    this.currentCategory=category;
  }
}
