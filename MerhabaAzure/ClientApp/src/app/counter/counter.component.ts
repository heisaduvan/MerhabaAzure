import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-counter-component",
  templateUrl: "./counter.component.html",
})
export class CounterComponent {
  public currentCount = 0;
  public incrementCounter() {
    this.currentCount++;
  }
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }
}
