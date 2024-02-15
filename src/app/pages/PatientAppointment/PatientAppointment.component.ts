// Angular component code

import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookingDataService } from 'src/app/services/booking.service';
import { DoctorsDataService } from 'src/app/services/doctors.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TimeSlotService } from 'src/app/services/time.service';
import { environment } from 'src/environments/environment';

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
  customerForm!: FormGroup;
  

  constructor(
    private http: HttpClient,
    private service: AuthService,
    private snackbarService: SnackbarService,
    public doctorsData: DoctorsDataService,
    private router: Router,
    public timeSlotService: TimeSlotService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private bookingData: BookingDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(10)]]
    });
    console.log("=-=-=-=form=-=-",this.customerForm.valid)
    
  }
  restrictToNumbers(event: any) {
    const input = event.target;
    const regex = /^[0-9]*$/; // Regular expression to match only numbers
  
    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    }
  
    // Check if the input value length exceeds 10 characters
    if (input.value.length > 10) {
      // Truncate the input value to the first 10 characters
      input.value = input.value.slice(0, 10);
    }
  
    // Update the input value in the form control
    this.customerForm.get('mobile')?.setValue(input.value);
  
    // Clear the errors for 'pattern' and 'minlength' before setting new errors
    this.customerForm.get('mobile')?.setErrors(null);
  
    // Check if the input value is not a valid number
    if (!regex.test(input.value)) {
      // Set pattern error
      this.customerForm.get('mobile')?.setErrors({ pattern: true });
    }
  
    // Check if the input value length is less than 10
    if (input.value.length < 10) {
      // Set minlength error
      this.customerForm.get('mobile')?.setErrors({ minlength: true });
    }
  }
  
  
restrictToAlphabets(event: any) {
  const input = event.target;
  const regex = /^[a-zA-Z ]*$/; // Regular expression to match only alphabets and spaces

  if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z ]/g, ''); // Remove non-alphabetic characters
  }
}

  validateForm() {
    console.log("Form value:", this.customerForm.value);
    console.log("Form status:", this.customerForm.status);
        if (this.customerForm.valid) {

      const formValue = {
        doctorId: this.doctorsData.doctorsData.doctor_id,
        appointmentDate: this.timeSlotService.timeSlotService.selectedDate,
        timeSlot: this.timeSlotService.timeSlotService.selectedTimeSlot.time_slot,
        customerName: this.customerForm.get('username')?.value,
        customerPhone: this.customerForm.get('mobile')?.value.slice(0, 10),
        amount: this.amount,
      };

      this.service.post(formValue, '/api/v1/booking/bookAppointment').subscribe(
        (response) => {
          if (response.statusCode === '200') {
            // this.snackbarService.showCustomSnackBarSuccess(response.message);
            this.bookingData.bookingData = response.data;
            this.initiateRazorpay(response.data.orderId, response.data.amount);
          } else {
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
      key: environment.razorpayKey,
      amount: amount * 100,
      currency: 'INR',
      name: this.doctorsData.doctorsData.doctor_name,
      description: 'Appointment Booking',
      image: '',
      order_id: orderId,
      handler: (response: any) => {
        console.log('payemnt responseeeeeeeee',response);
        this.ngZone.run(() => {
          if (response.razorpay_payment_id) {
            console.log('Payment successful');
            const paymentvalue = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id
            };
      
            this.service.post(paymentvalue, '/api/v1/payment/payment-update').subscribe(
              (response) => {
                if (response.statusCode === 200) {
                  // this.snackbarService.showCustomSnackBarSuccess(response.message);
                  this.router.navigate(['/AppointmentConfirmed']);
                } else {
                  this.snackbarService.showCustomSnackBarError(response.message);
                }
              },
              (error) => {
                console.error('API call failed:', error);
                this.snackbarService.showCustomSnackBarError(error);
              }
            );
          

            
          } else {
            console.log('Payment failed or was canceled');
          }
        });
      },
      prefill: {
        name: this.username,
        contact: this.customerForm.get('mobile')?.value.slice(0, 10),
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
