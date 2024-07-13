import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-paymentfailed",
  templateUrl: "./paymentfailed.component.html",
  styleUrls: ["./paymentfailed.component.scss"],
})
export class PaymentfailedComponent implements OnInit {
  DocId: any;
  businessId: any;

  constructor(private router: Router) {
    this.DocId = localStorage.getItem("DoctorId");
    this.businessId = localStorage.getItem("businessId");
  }

  ngOnInit(): void {}

  close() {
    // this.router.navigate(['/home']); // Assuming '/' is the route for the home page
    this.router.navigate(["/doctor"], {
      queryParams: { id: this.DocId, entity: this.businessId },
    });
  }
}
