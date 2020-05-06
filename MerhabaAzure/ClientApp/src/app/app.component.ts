import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { User } from "./_models/User";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "app";
  currentUser: User;

  constructor( ) {
  }
}
