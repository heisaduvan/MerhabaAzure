import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/service/authentication.service";
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
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(["/login"]);
    }
    console.log(this.authenticationService.currentUserValue);
    console.log(this.authenticationService.currentUser);
    console.log(this.authenticationService.currentUserDecode);
  }
}
