import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private currentCategory:string="ALL";
  private searchBarGetFocus:boolean=false;
  constructor() {
  }

  ngOnInit() {
  }

  searchBarOnFocus(){
    this.searchBarGetFocus=true;
  }

  searchBarOnBlur(){
    this.searchBarGetFocus=false;
  }
}
