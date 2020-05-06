import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { ChatComponent } from "./chat/chat.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AlertifyService } from "src/app/_service/alertify.service";
import { JwtInterceptor, AuthGuard } from "./_helpers";
import { UsersComponent } from './users/users.component';
import { Role } from "./_models/Role";
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    TopbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.User] } },
      { path: "fetch-data", component: FetchDataComponent ,canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.User] } },
      { path: "chat", component: ChatComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.User] } },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
    ]),
  ],
  providers: [
    AlertifyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
