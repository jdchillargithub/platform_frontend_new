import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private cdr: ChangeDetectorRef
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
        if (response.razorpay_payment_id) {
          console.log('Payment successful');
        //   this.cdr.detectChanges(); // Manually trigger change detection
        //   window.location.reload()

        //   // Move to the next page using Angular Router
        //   Swal.fire({
        //     title: 'Appointment Confirmed',
        //     text: `Patient Name: ${this.booking_details.customerName}`,
        //     icon: 'success',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Share',
        //   });
        this.router.navigate(['/AppointmentConfirmed']);

         
        } else {
          console.log('Payment failed or was canceled');
        }
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
        this.cdr.detectChanges(); // Manually trigger change detection

        this.showSuccessModal();


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

  showSuccessModal() {
    Swal.fire({
      title: 'Appointment Confirmed',
      text: `Patient Name: ${this.booking_details.customerName}`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Share',
    });
  }

}
