import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';
import { SnackbarService } from 'src/app/services/snackbar.service';


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

  myForm: FormGroup;
  isLoading: boolean = false;
  selectedDate: Date;

  profileDetails: any = {};
  workSlotDetails: any = {};
  // phoneNumber: string;
  originalData: PeriodicElement[] = ELEMENT_DATA; // Store the original data
  timeOptions: string[] = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM']; // Add your dynamic time options here


  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {

    this.getProfile();
    this.getWorkSlots();
  }

  ngOnDestroy() {
  }

  getProfile() {
    const data = {
      phone: "7025791212"
    }

    this.service.post(data, '/api/v1/auth/profile').subscribe(
      (response) => {
        console.log(` success onlog`, response);
        if (response.statusCode === 200) {
          this.profileDetails = response.data
          
        }
        else if (response.status === 403) {
          console.log("--------sdfsfdsfdsfsdfdsfdsfsdfsfsd")
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
    const data = {
      phone: "7025791212",
      date: "2024-02-12"
    }

    this.service.post(data, '/api/v1/work/get-work-slots').subscribe(
      (response) => {
        console.log(` work slots success onlog`, response);
        if (response.statusCode === 200) {
          // this.workSlotDetails = response.data.workSlots
          this.originalData = response.data.workSlots.map((slot: any, index: number) => ({
            time_slot: slot.time_slot,
            booking_status: slot.booking_status
          }));
          
        }
        else if (response.status === 403) {
          console.log("--------sdfsfdsfdsfsdfdsfdsfsdfsfsd")
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

  

 
Onsubmit(){
  this.router.navigate(['login-otp']);
}
}
