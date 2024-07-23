import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { PageEvent } from "@angular/material/paginator";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { BookingDataService } from "src/app/services/booking.service";
import { ModalService } from "src/app/services/modal.service";
import html2canvas from "html2canvas";

export interface PeriodicElement {
  ID: number;
}
const ELEMENT_DATA: PeriodicElement[] = []; // Your initial data goes here

@Component({
  selector: "app-appointment-confirmed",
  templateUrl: "./AppointmentConfirmed.component.html",
  styleUrls: ["./AppointmentConfirmed.component.scss"],
  providers: [DatePipe],
})
export class AppointmentConfirmedComponent implements OnInit, OnDestroy {
  booking_details: any;
  whatsapp_message_1: string;
  whatsapp_message_2: string;
  DocId: any;
  businessId: any;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private snackbarService: SnackbarService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private bookingData: BookingDataService
  ) {}

  ngOnInit() {
    this.getAppointment();
    this.DocId = localStorage.getItem("DoctorId");
    this.businessId = localStorage.getItem("businessId");
  }

  ngOnDestroy() {}
  // Call this function when the filter input changes
  getAppointment() {
    const data = {
      bookingId: this.bookingData.bookingData.bookingId,
      // bookingId: 2
    };

    this.service
      .post(data, "/api/v1/booking/booking-confirmation-data")
      .subscribe(
        (response) => {
          // console.log(`order details`, response);
          if (response.statusCode === 200) {
            //   this.orderDetails = response.data.orderData
            this.booking_details = response.data;
            this.whatsapp_message_1 =
              "Dear \n" + this.booking_details.customerName + ",";
            this.whatsapp_message_2 =
              " We are pleased to confirm your appointment with " +
              this.booking_details.doctorName +
              " on " +
              this.booking_details.appointmentDate +
              " at " +
              this.booking_details.appointmentTimeSlot +
              ".";
            console.log("success");
          } else if (response.statusCode === 400) {
            this.snackbarService.showCustomSnackBarError(response.message);
          }
        },
        (error) => {
          // Handle the error response
          console.error("API call failed:", error);
          this.snackbarService.showCustomSnackBarError(error);
        }
      );
  }

  share() {
    Swal.fire({
      title: "Share",
      html: ` <a href='https://wa.me/+91${
        this.booking_details.bookedPhoneNo
      }?text=${encodeURIComponent(
        this.whatsapp_message_1 + this.whatsapp_message_2
      )}'><i class="fa-brands fa-whatsapp" style='font-size:80px;color:green;padding:8px;'></i></a> `,

      // showCancelButton: true,
      // confirmButtonText: 'Confirm',
      // cancelButtonText: 'Cancel',
    });
  }

  // captureEntirePage() {
  //   // Capture the screenshot of the entire HTML body
  //   const cardElement = document.getElementById("cardToCapture");

  //   html2canvas(cardElement).then((canvas) => {
  //     // Convert the canvas to a data URL
  //     const imgData = canvas.toDataURL("image/png");
  //     // Create a link element to trigger the download of the image
  //     const a = document.createElement("a");
  //     a.href = imgData;
  //     a.download = "appointment_booking.png";
  //     a.click();
  //   });
  // }

  captureEntirePage() {
    const cardElement = document.getElementById("cardToCapture");

    // Check if html2canvas is supported
    if (!html2canvas) {
      console.error("html2canvas is not available.");
      return;
    }

    // Check if iOS device
    // const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Use options to handle CORS issues on iOS
    const options = {
      useCORS: true,
      allowTaint: true,
    };

    // Capture screenshot
    html2canvas(cardElement, options)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Create a link element to trigger the download of the image
        const a = document.createElement("a");
        a.href = imgData;
        a.download = "appointment_booking.png";
        a.click();
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
        // Handle errors or provide feedback to the user
      });
  }

  close() {
    // this.router.navigate(['/home']); // Assuming '/' is the route for the home page
    this.router.navigate(["/doctor"], {
      queryParams: { id: this.DocId, entity: this.businessId },
    });
  }
}
