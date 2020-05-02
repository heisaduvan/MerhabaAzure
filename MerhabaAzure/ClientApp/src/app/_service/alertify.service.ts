import { Injectable } from "@angular/core";
// import alertifyjs from "alertifyjs";
declare let alertify: any;
@Injectable({
  providedIn: "root",
})
export class AlertifyService {
  constructor() {}
  success(message: string) {
    alertify.success(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  error(message: string) {
    alertify.error(message);
  }
}
