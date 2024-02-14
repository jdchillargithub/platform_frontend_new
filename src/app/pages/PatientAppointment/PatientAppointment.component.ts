// Angular component code

import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookingDataService } from 'src/app/services/booking.service';
import { DoctorsDataService } from 'src/app/services/doctors.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TimeSlotService } from 'src/app/services/time.service';

declare var Razorpay: any;
declare var Swal: any;

@Component({
  selector: 'app-customers-add-augmont',
  templateUrl: './PatientAppointment.component.html',
  styleUrls: ['./PatientAppointment.component.scss'],
})
export class PatientAppointmentComponent {
  username: string = '';
  mobile: string = '';
  booking_details: any;
  modal = false;
  data : string;
  amount: number = 10;

  constructor(
    private http: HttpClient,
    private service: AuthService,
    private snackbarService: SnackbarService,
    public doctorsData: DoctorsDataService,
    private router: Router,
    public timeSlotService: TimeSlotService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private bookingData: BookingDataService
  ) {}

  validateForm() {
    if (!this.username || !this.mobile) {
      this.data = 'Please fill in all fields';
      // alert('Please fill in all fields');
    } else if (!/^\d{10}$/.test(this.mobile)) {
      this.data = 'Mobile number must be 10 digits and contain only numbers';

    } else {
      const formValue = {
        doctorId: this.doctorsData.doctorsData.doctor_id,
        appointmentDate: this.timeSlotService.timeSlotService.selectedDate,
        timeSlot: this.timeSlotService.timeSlotService.selectedTimeSlot.time_slot,
        customerName: this.username,
        customerPhone: this.mobile,
        amount: this.amount,
      };

      this.service.post(formValue, '/api/v1/booking/bookAppointment').subscribe(
        (response) => {
          if (response.statusCode === '200') {
            this.snackbarService.showCustomSnackBarSuccess(response.message);
            this.bookingData.bookingData = response.data;
            this.initiateRazorpay(response.data.orderId, response.data.amount);
          } else if (response.statusCode === 400) {
            this.snackbarService.showCustomSnackBarError(response.message);
          }
        },
        (error) => {
          console.error('API call failed:', error);
          this.snackbarService.showCustomSnackBarError(error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/home']); // Assuming '/' is the route for the home page
  }
  

  initiateRazorpay(orderId: string, amount: number) {
    const options = {
      key: 'rzp_test_IpwktzfouNqxy7',
      amount: amount * 100,
      currency: 'INR',
      name: 'Your Clinic Name',
      description: 'Appointment Booking',
      image: '',
      order_id: orderId,
      handler: (response: any) => {
        console.log(response);
        this.ngZone.run(() => {
          if (response.razorpay_payment_id) {
            console.log('Payment successful');
            this.router.navigate(['/AppointmentConfirmed']);
          } else {
            console.log('Payment failed or was canceled');
          }
        });
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
    script.async = false;
    document.head.appendChild(script);

    script.onload = () => {
      const rzp = new Razorpay(options);
      rzp.open();
    };
  }
}
