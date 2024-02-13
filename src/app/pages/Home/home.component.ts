import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DoctorsDataService } from 'src/app/services/doctors.service';
import { TimeSlotService } from 'src/app/services/time.service';
import { formatDate } from '@angular/common';


export interface PeriodicElement {
  time_slot: string;
  booking_status: number;
}
const ELEMENT_DATA: PeriodicElement[] = []; // Your initial data goes here


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  doctor_details : any
  timeSlots: string[] = [];
  selectedDate: Date = new Date();
  selectedDateString : string // Initializes selectedDate with the current date and time
  selectedTimeSlot: string; // Property to store the selected time slot

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router, private route: ActivatedRoute,
    private doctorsData: DoctorsDataService,
    private snackbarService: SnackbarService,
    private timeSlotService : TimeSlotService
  ) { }
  ngOnInit() {
    this.getProfile();
this.selectedDateString = this.formatDate(this.selectedDate)
    // this.getWorkSlots();
    // this.getWorkSlots();
  }
  ngOnDestroy() {
  }
  getProfile() {
    const data = {
      phone: "8585858585"
    }
    this.service.post(data, '/api/v1/auth/profile').subscribe(
      (response) => {
        console.log(` success onlog`, response);
        if (response.statusCode === 200) {
          this.doctorsData.doctorsData = response.data
          this.doctor_details = response.data
          console.log('hellllloooooooooooooo',this.doctor_details)
          this.getWorkSlots();
        }
        else if (response.status === 403) {
          this.snackbarService.showCustomSnackBarError(response.message);
        }
      },
      (error) => {
        // Handle the error response
        console.error('API call failed:', error);
        this.snackbarService.showCustomSnackBarError(error);
      }
    );
  }
  getWorkSlots() {
    const formattedDate = this.selectedDateString;
    const data = {
      phone: "8585858585",
      date: formattedDate
    };
    this.service.post(data, '/api/v1/work/get-work-slots').subscribe(
      (response) => {
        console.log(` work slots success onlog`, response);
        if (response.statusCode === 200) {
          this.timeSlots = response.data.workSlots.map((slot: any) => ({
            time_slot: slot.time_slot,
            booking_status: slot.booking_status
          }));
        } else if (response.status === 403) {
          this.snackbarService.showCustomSnackBarError(response.message);
        }
      },
      (error) => {
        // Handle the error response
        console.error('API call failed:', error);
        this.snackbarService.showCustomSnackBarError(error);
      }
    );
  }
  onSubmit() {
    // Access the selected date and time slot
    console.log('Selected Date:', this.selectedDate);
    console.log('Selected Time Slot:', this.selectedTimeSlot);
    // Retrieve the current state from timeSlotService
    const currentTimeSlotService = this.timeSlotService.timeSlotService || {};

    // Update the current state with selectedDate and selectedTimeSlot
    const updatedTimeSlotService = {
      ...currentTimeSlotService,
      selectedDate: this.selectedDate,
      selectedTimeSlot: this.selectedTimeSlot
    };

    // Store the updated state in timeSlotService
    this.timeSlotService.timeSlotService = updatedTimeSlotService;

    console.log('Updated timeSlotService:', this.timeSlotService.timeSlotService);

    this.router.navigate(['/patientAppointment']);
    // Perform further actions here, such as navigating to a different page or making API calls
  }
  // Method to handle selection of a time slot
  selectTimeSlot(slot: string) {
    this.selectedTimeSlot = slot;
  }

  onDateChange() {
    // Call the getWorkSlots method with the selected date
    console.log('selctected dateeeee',this.selectedDateString)
    if (this.selectedDateString) {
      this.getWorkSlots();
    }
  }

  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
}
