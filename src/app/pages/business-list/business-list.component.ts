import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-business-list",
  templateUrl: "./business-list.component.html",
  styleUrls: ["./business-list.component.scss"],
})
export class BusinessListComponent {
  businessListData: any[] = [];

  constructor(
    private service: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

ngOnInit(){
  this.fetchBusinessList()
}

  fetchBusinessList() {
    this.service.post({}, "/api/v1/admin/list-entity?businessType=1").subscribe((data) => {
      if (data.statusCode == 200) {
        console.log("businessListData==>", data.data.data);
        this.businessListData = data.data.data;
      } else if (data.statusCode == 400 || data.statusCode == 500) {
        this.snackbarService.showCustomSnackBarError(data.message);
      }
    });
  }


  routeClick(businessId: string,encryptedId:string) {
    if (businessId) {
      localStorage.setItem("businessId", businessId);
       this.router.navigate(["/professional"],{ queryParams: {entity: encryptedId }});
    }
  }


}


