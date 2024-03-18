import { Component } from "@angular/core";
import { NavigationEnd, NavigationStart, Route } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";

// import { stringify } from "querystring";

@Component({
  selector: "app-professional-list",
  templateUrl: "./professional-list.component.html",
  styleUrls: ["./professional-list.component.scss"],
})
export class ProfessionalListComponent {
  professionals: any[] = [];

  constructor(
    private service: AuthService,
    private snackbarService: SnackbarService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log("Navigation started");
      }
      if (event instanceof NavigationEnd) {
        console.log("Navigation ended");
      }
    });
  }

  ngOnInit(): void {
    this.fetchProfessionalList();
  }

  fetchProfessionalList() {
    this.service.post({}, "/api/v1/customer/list-doctors").subscribe((data) => {
      // console.log("Professional==>", data);
      if (data.statusCode == 200) {
        console.log("Professional==>", data);
        this.professionals = data.data.response;
      } else if (data.statusCode == 400 || data.statusCode == 500) {
        this.snackbarService.showCustomSnackBarError(data.message);
      }
    });
  }
   routeClick(DocId: string) {
    console.log("FN call==>",DocId);
    if (DocId) {
      localStorage.setItem("DoctorId", DocId);
       this.router.navigate(["/doctor"],{ queryParams: {id: DocId }});
    }
  }
  // routeClick(DocId: string) {
  //   console.log("FN call==>", DocId);
  //   if (DocId) {
  //     localStorage.setItem("DoctorId", DocId);
  //     this.router
  //       .navigate(["/doctor"],{ queryParams: {ID: DocId }})
  //       .then(() => {
  //         console.log("Navigation successful");
  //         this.cdr.detectChanges(); // Manually trigger change detection
  //       })
  //       .catch((error) => {
  //         console.error("Navigation failed:", error);
  //       });
  //   }
  // }
}
