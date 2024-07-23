import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-pending-payment-verification",
  templateUrl: "./pending-payment-verification.component.html",
  styleUrls: ["./pending-payment-verification.component.css"],
})
export class PendingPaymentVerificationComponent implements OnInit {
  constructor(
    private service: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {
    this.getPaymentStatus();
  }

  ngOnInit(): void {}

  getQueryParam(param) {
    let key;
    this.route.queryParams.subscribe((params) => {
      key = params[param];
    });
    return key;
  }

  async getPaymentStatus() {
    const orderId = this.getQueryParam("order_id");
    console.log("orderId=>", orderId);

    // alert(orderId)
    // if (orderId) {
    //   const apiUrl = `https://sandbox.cashfree.com/pg/orders/${orderId}`;
    //   const headers = new HttpHeaders()
    //     .set("accept", "application/json")
    //     .set("x-api-version", "2023-08-01");
    //   this.http.post(apiUrl, { headers }).subscribe(
    //     (response) => {
    //       console.log(` response`, response);
    //       if (response) {
    //       }
    //     },
    //     (error) => {
    //       // Handle the error response
    //       console.error("API call failed:", error);
    //     }
    //   );
    // }
    if (orderId) {
      try {
        const response = await this.service
          .post({ orderId }, "/api/v1/payment/payment-verify")
          .toPromise();
        // console.log("PaymentVerify=>", response);

        if (response.data.order_status === "PAID") {
          await this.paymentUpdateForCashFree(
            response?.data.cf_order_id,
            orderId
          );
          // this.router.navigate(["/AppointmentConfirmed"]);
        } else {
          await this.paymentFailedUpdateForCashFree(
            response?.data.cf_order_id,
            orderId
          );
          // this.router.navigate(["/payment-failed"]);
        }
      } catch (error) {
        console.error("API call failed:", error);
        this.snackbarService.showCustomSnackBarError(error);
      }
    }
  }

  async paymentUpdateForCashFree(payId: string, orderCf: string) {
    const paymentvalue = {
      paymentId: payId,
      orderId: orderCf,
    };
    this.service.post(paymentvalue, "/api/v1/payment/payment-update").subscribe(
      (response) => {
        if (response.statusCode == 200) {
          // this.snackbarService.showCustomSnackBarSuccess(response.message);
          this.router.navigate(["/AppointmentConfirmed"]);
        } else {
          this.snackbarService.showCustomSnackBarError(response.message);
        }
      },
      (error) => {
        console.error("API call failed:", error);
        this.snackbarService.showCustomSnackBarError(error);
      }
    );
  }

  async paymentFailedUpdateForCashFree(payId: string, orderCf: string) {
    const paymentvalue = {
      paymentId: payId,
      orderId: orderCf,
    };
    this.service.post(paymentvalue, "/api/v1/payment/payment-failed").subscribe(
      (response) => {
        if (response.statusCode == 200) {
          // this.snackbarService.showCustomSnackBarSuccess(response.message);
          // this.router.navigate(["/AppointmentConfirmed"]);
          this.router.navigate(["/payment-failed"]);
        } else {
          this.snackbarService.showCustomSnackBarError(response.message);
        }
      },
      (error) => {
        console.error("API call failed:", error);
        this.snackbarService.showCustomSnackBarError(error);
      }
    );
  }
}
