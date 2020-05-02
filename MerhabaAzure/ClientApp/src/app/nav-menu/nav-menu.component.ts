import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { AlertifyService } from "../_service/alertify.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  get getCurrentUserName() {
    return this.authenticationService.getCurrentUserName();
  }
  get isAuthenticated() {
    return this.authenticationService.loggedIn();
  }
  LogOut() {
    this.authenticationService.logout();
    this.alertifyService.warning("See you later, good bye!");
    this.router.navigate(["/login"]);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
