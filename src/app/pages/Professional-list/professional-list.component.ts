import { Component } from "@angular/core";
import { NavigationEnd, NavigationStart, Route } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";
import Swal from "sweetalert2";

// import { stringify } from "querystring";

@Component({
  selector: "app-professional-list",
  templateUrl: "./professional-list.component.html",
  styleUrls: ["./professional-list.component.scss"],
})
export class ProfessionalListComponent {
  professionals: any[] = [];
  clinicData: any;
  doc: boolean;
  isClinicOpen: boolean = true;

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
    this.getClinicData();
  }

  fetchProfessionalList() {
    const businessId = localStorage.getItem("businessId");

    this.service
      .post(
        { entityId: businessId, statusCheck: true },
        "/api/v1/customer/list-doctors"
      )
      .subscribe((data) => {
        // console.log("Professional==>", data);
        if (data.statusCode == 200) {
          console.log("Professional==>", data);
          this.professionals = data.data.response;
          if (this.professionals.length === 0) {
            this.doc = false;
          } else {
            this.doc = true;
          }
        } else if (data.statusCode == 400 || data.statusCode == 500) {
          this.snackbarService.showCustomSnackBarError(data.message);
        }
      });
  }

  getClinicData() {
    const businessId = localStorage.getItem("businessId");

    this.service
      .post({ entityId: businessId }, "/api/v1/customer/entity-details")
      .subscribe((data) => {
        if (data.statusCode == 200) {
          if (data.data.entityResponse.status === 0) {
            this.isClinicOpen = false;
          }
          console.log("entityDetails==>", data.data.entityReysponse);
          this.clinicData = data.data.entityResponse;
        } else if (data.statusCode == 400 || data.statusCode == 500) {
          this.snackbarService.showCustomSnackBarError(data.message);
        }
      });
  }

  routeClick(DocId: string) {
    const businessId = localStorage.getItem("businessId");
    console.log("FN call==>", DocId);
    if (this.isClinicOpen === false) {
      Swal.fire({
        text: `${this.clinicData.entityName} is currently not accepting booking. Please check back in a few minutes or contact ${this.clinicData.phone}`,
        icon: "error",
      });
    } else {
      if (DocId) {
        localStorage.setItem("DoctorId", DocId);
        this.router.navigate(["/doctor"], { queryParams: { id: DocId,entity:businessId } });
      }
    }
  }
}
