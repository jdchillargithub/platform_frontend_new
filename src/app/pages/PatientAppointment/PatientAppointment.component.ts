import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookingDataService } from 'src/app/services/booking.service';
import { DoctorsDataService } from 'src/app/services/doctors.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TimeSlotService } from 'src/app/services/time.service';

declare var Razorpay: any; // Declare Razorpay variable
declare var Swal: any;

@Component({
  selector: 'app-customers-add-augmont',
  templateUrl: './PatientAppointment.component.html',
  styleUrls: ['./PatientAppointment.component.scss'],
})
export class PatientAppointmentComponent {
  username: string = '';
  mobile: string = '';
  booking_details : any
  modal = false


  constructor(
    private http: HttpClient,
    private service: AuthService,
    private snackbarService: SnackbarService,
    private doctorsData: DoctorsDataService,
    private router: Router,
    private timeSlotService: TimeSlotService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private bookingData: BookingDataService,
  ) {}

  validateForm() {
    console.log('=-=-=-loop');

    if (!this.username || !this.mobile) {
      alert('Please fill in all fields');
    } else {
      // Make an API call using HttpClient
      const formValue = {
        doctorId: this.doctorsData.doctorsData.doctor_id,
        appointmentDate: this.timeSlotService.timeSlotService.selectedDate,
        timeSlot: this.timeSlotService.timeSlotService.selectedTimeSlot.time_slot,
        customerName: this.username,
        customerPhone: this.mobile,
        amount: 10,
      };

      console.log('doctor idd', formValue.doctorId);

      this.service
        .post(formValue, '/api/v1/booking/bookAppointment')
        .subscribe(
          (response) => {
            console.log(`services success`, response);
            if (response.statusCode === '200') {
              console.log('success');
              this.snackbarService.showCustomSnackBarSuccess(
                response.message
              );
              this.bookingData.bookingData = response.data
              // Call Razorpay function with orderId and amount
              this.initiateRazorpay(
                response.data.orderId,
                response.data.amount
              );
            } else if (response.statusCode === 400) {
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
  }

  initiateRazorpay(orderId: string, amount: number) {
    const options = {
      key: 'rzp_test_IpwktzfouNqxy7', // Replace with your Razorpay Key
      amount: amount * 100, // Amount is in currency subunits (paise), so multiply by 100
      currency: 'INR', // Replace with your currency code
      name: 'Your Clinic Name',
      description: 'Appointment Booking',
      image: '',
      order_id: orderId,
      handler: (response: any) => {
        console.log(response);
        this.ngZone.run(() => {
        debugger
        if (response.razorpay_payment_id) {
          console.log('Payment successful');
        this.router.navigate(['/AppointmentConfirmed']);

         
        } else {
          console.log('Payment failed or was canceled');
        }
    })
      },
      prefill: {
        name: this.username,
        contact: this.mobile,
        email: 'your@email.com',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = false; // Ensure synchronous loading
    document.head.appendChild(script);

    // Execute the Razorpay code after the script is loaded
    script.onload = () => {
      const rzp = new Razorpay(options);
      rzp.open();
    };
  }

}
