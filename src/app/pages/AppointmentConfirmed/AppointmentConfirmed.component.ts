import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  ID: number;


}
const ELEMENT_DATA: PeriodicElement[] = []; // Your initial data goes here

@Component({
  selector: 'app-appointment-confirmed',
  templateUrl: './AppointmentConfirmed.component.html',
  styleUrls: ['./AppointmentConfirmed.component.scss'],
  providers: [DatePipe]
})

export class AppointmentConfirmedComponent implements OnInit, OnDestroy {

    booking_details : any


  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private snackbarService: SnackbarService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAppointment();
    
    
  }

  ngOnDestroy() { }
  // Call this function when the filter input changes
  getAppointment() {
    const data = {
    //   orderId: this.orderID.OrderID
    bookingId: 2
    }

    this.service.post(data, '/api/v1/booking/booking-confirmation-data').subscribe(
      (response) => {
        // console.log(`order details`, response);
        if (response.statusCode === 200) {
        //   this.orderDetails = response.data.orderData
        this.booking_details = response.data
        console.log('success')
        } else if(response.statusCode === 400){
            this.snackbarService.showCustomSnackBarError(response.message);
        }
        },
        (error) => {
        

        // Handle the error response
        console.error('API call failed:', error);
        this.snackbarService.showCustomSnackBarError(error);
        
      });
  }

  
}
