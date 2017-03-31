import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'app works!';

  constructor(private authService: AuthService) {
  }

  ngOnDestroy() {
    this.authService.unsub();
  }
}
