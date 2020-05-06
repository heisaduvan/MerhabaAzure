import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { ChatService } from "../_service/chat.service";
@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.css"],
})
export class TopbarComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private chatService: ChatService
    ) { }

  get getCurrentUserName() {
    return this.authenticationService.getCurrentUserName();
  }
  get isAuthenticated() {
    return this.authenticationService.currentUserValue;
  }
  LogOut() {

      this.chatService.closeConnection(
      this.authenticationService.getCurrentUserName(),
      this.authenticationService.getCurrentUserEmail());

      this.authenticationService.logout();
    
  }
  get f() {
    return this.searchForm.controls;
  }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchValue: ["", Validators.required],
    });
  }
  onSubmitSearchForm() {
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
  }
}
