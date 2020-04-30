import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/service/authentication.service";
import { User } from "./models/User";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "app";
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(["/login"]);
    }
  }
}
