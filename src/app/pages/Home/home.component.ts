import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EmailService } from "src/app/services/email.service";
import Swal from "sweetalert2";
import { SnackbarService } from "src/app/services/snackbar.service";
import { DoctorsDataService } from "src/app/services/doctors.service";
import { TimeSlotService } from "src/app/services/time.service";
import { formatDate } from "@angular/common";
import { DateAdapter } from "@angular/material/core";

export interface PeriodicElement {
  time_slot: string;
  booking_status: number;
}
const ELEMENT_DATA: PeriodicElement[] = []; // Your initial data goes here

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild("fecha1", { static: false }) dateInput: ElementRef;

  isLoading: boolean = false;
  doctor_details: any;
  CurrentDocId: any;
  businessId: any;
  bookingType: any;
  timeSlots: string[] = [];
  selectedDate: Date = new Date();
  selectedDateString: string; // Initializes selectedDate with the current date and time
  selectedTimeSlot: any; // Property to store the selected time slot
  slot: boolean = false;
  minDate: Date;
  maxDate: Date;
  isTruncated: boolean = true; // Initially set to truncated

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private doctorsData: DoctorsDataService,
    private snackbarService: SnackbarService,
    private timeSlotService: TimeSlotService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale("en-GB"); //dd/MM/yyyy
  }
  ngOnInit() {
    // this.businessId = localStorage.getItem("businessId");
    // this.CurrentDocId = localStorage.getItem("DoctorId");
    this.businessId = this.getQueryParam("entity");
    this.CurrentDocId = this.getQueryParam("id");
    localStorage.setItem("businessId", this.businessId);
    localStorage.setItem("DoctorId", this.CurrentDocId);
    this.getProfile();
    this.selectedDate = new Date();
    // Initialize with today's date
    this.minDate = this.calculateMinDate();
    this.maxDate = this.calculateMaxDate();
    this.selectedDateString = this.formatDate(this.minDate);

    // Set the initial minDate to today
    // this.minDate = this.formatDate(new Date());

    // Calculate and set the initial maxDate
    // this.calculateMaxDate();
    // this.getWorkSlots();
  }
  ngOnDestroy() {}
  toggleDescription() {
    this.isTruncated = !this.isTruncated;
  }

  getQueryParam(param) {
    let key;
    this.route.queryParams.subscribe((params) => {
      key = params[param];
    });
    return key;
  }
  // openDatePicker() {
  //   this.dateInput.nativeElement.focus();
  // }

  getProfile() {
    // const data = {
    //   phone: "8585858585"
    // }
    this.service
      .post(
        {
          // phone: "8585858585",
          encryptedPhone: this.CurrentDocId,
          entityId: this.businessId,
        },
        "/api/v1/auth/profile"
      )
      .subscribe(
        (response) => {
          console.log(` success onlog`, response);
          if (response.statusCode === 200) {
            this.doctorsData.doctorsData = response.data;
            this.doctor_details = response.data;
            console.log("hellllloooooooooooooo", this.doctor_details);
            this.getWorkSlots();
          } else if (response.statusCode === 403) {
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
  getWorkSlots() {
    const formattedDate = this.selectedDateString;
    // const data = {
    //   phone: "8585858585",
    //   date: formattedDate
    // };
    const data = {
      encryptedPhone: this.CurrentDocId,
      date: formattedDate,
      entityId: this.businessId,
    };
    this.service.post(data, "/api/v1/work/get-work-slots").subscribe(
      (response) => {
        console.log(` work slots success onlog`, response);
        if (response.statusCode === 200) {
          if (response.data.workSlots.length === 0) {
            this.slot = true;
            console.log("=-=-=-slot=-=-=", this.slot);
          } else {
            this.slot = false;
            console.log("=-=-=-slot=-=-=", this.slot);
          }
          this.bookingType = response.data.type;
          this.timeSlots = response.data.workSlots.map((slot: any) => ({
            time_slot: slot.time_slot,
            booking_status: slot.booking_status,
            token_number: slot.token_number,
          }));
        } else if (response.statusCode === 403) {
          this.slot = true;
          this.snackbarService.showCustomSnackBarError(response.message);
        } else if (response.statusCode === 422) {
          this.slot = true;
          this.snackbarService.showCustomSnackBarError(response.message);
        } else {
          this.slot = true;
        }
      },
      (error) => {
        // Handle the error response
        console.error("API call failed:", error);
        this.snackbarService.showCustomSnackBarError(error);
      }
    );
  }
  onSubmit() {
    // Access the selected date and time slot
    console.log("Selected Date:", this.selectedDateString);
    console.log("Selected Time Slot:", this.selectedTimeSlot);
    // Retrieve the current state from timeSlotService
    const currentTimeSlotService = this.timeSlotService.timeSlotService || {};

    // Update the current state with selectedDate and selectedTimeSlot
    const updatedTimeSlotService = {
      ...currentTimeSlotService,
      selectedDate: this.selectedDateString,
      selectedTimeSlot: this.selectedTimeSlot,
    };

    // Store the updated state in timeSlotService
    this.timeSlotService.timeSlotService = updatedTimeSlotService;

    console.log(
      "Updated timeSlotService:",
      this.timeSlotService.timeSlotService
    );
    // const timeSlotSelected = this.selectedTimeSlot
    this.service
      .post(
        {
          encryptedPhone: this.CurrentDocId,
          entityId: this.businessId,
          timeSlot: this.selectedTimeSlot.time_slot,
          appointmentDate: this.selectedDateString,
        },
        "/api/v1/booking/slot-on-hold"
      )
      .subscribe(
        (response) => {
          if (response.statusCode === 200) {
            this.router.navigate(["/patientAppointment"]);
          } else {
            this.snackbarService.showCustomSnackBarError(response.message);
          }
        },
        (error) => {
          // Handle the error response
          console.error("API call failed:", error);
          this.snackbarService.showCustomSnackBarError(error);
        }
      );

    // Perform further actions here, such as navigating to a different page or making API calls
  }
  // Method to handle selection of a time slot
  selectTimeSlot(slot: string) {
    this.selectedTimeSlot = slot;
  }
  calculateMinDate(): Date {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Tomorrow
    return today;
  }

  calculateMaxDate(): Date {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7); // 7 days from today
    return maxDate;
  }
  // Date filter function
  //  filterDate = (date: Date | null): boolean => {
  //   const day = (date || new Date()).getDay();
  //   return day !== 0 && day !== 6 && // Disable weekends
  //     (date >= this.minDate && date <= this.maxDate); // Disable dates outside of min and max range
  // }

  onDateChange(event: any) {
    // Set the minimum date to today
    // this.minDate = this.formatDate(new Date());
    // this.calculateMaxDate();
    this.selectedDateString = this.formatDate(event.value);
    if (this.selectedDateString) {
      this.getWorkSlots();
    }
  }

  // calculateMaxDate(): string {
  //   const currentDate = new Date();
  //   const maxDate = new Date(currentDate);
  //   maxDate.setDate(currentDate.getDate() + 7);

  //   // Return the formatted maxDate
  //   return this.formatDate(maxDate);
  // }

  formatDate(date: Date): string {
    return formatDate(date, "yyyy-MM-dd", "en-US");
  }
}
