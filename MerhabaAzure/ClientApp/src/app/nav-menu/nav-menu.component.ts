import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { ChatService } from "../_service/chat.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(
    private authenticationService: AuthenticationService,
    private chatService: ChatService
  ) {}

  get isAuthenticated() {
    return this.authenticationService.currentUserValue;
  }
  LogOut() {
    this.chatService.closeConnection(
      this.authenticationService.getCurrentUserName(),
      this.authenticationService.getCurrentUserEmail()
    );
    this.authenticationService.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
