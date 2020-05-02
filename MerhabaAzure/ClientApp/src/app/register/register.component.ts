import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/_service/authentication.service";
import { User } from "../_models/User";
import { AlertifyService } from "../_service/alertify.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  user: User;
  error;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertifyService: AlertifyService
  ) {}

  signUp() {}
  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      Email: ["", Validators.required],
      Password: ["", Validators.required],
      FirstName: ["", Validators.required],
      LastName: ["", Validators.required],
    });
  }

  get f() {
    return this.signUpForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .signUp(
        this.f.Email.value,
        this.f.Password.value,
        this.f.FirstName.value,
        this.f.LastName.value,
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(["/login"]);
          this.user = data;
          this.alertifyService.success("You have successfully registered!");
          this.alertifyService.warning("You can sign in now.");
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
