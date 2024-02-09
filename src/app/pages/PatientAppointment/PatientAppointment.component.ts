// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-customers-add-augmont',
  templateUrl: './PatientAppointment.component.html',
  styleUrls: ['./PatientAppointment.component.scss']
})

export class PatientAppointmentComponent implements OnInit {
    ngOnInit() {
        this.initializeForm()
    }
    myForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private service: AuthService,
        private snackbarService: SnackbarService
      ) {}
      restrictToNumbers(event: any) {
        const input = event.target;
        const regex = /^[0-9]*$/; // Regular expression to match only numbers
    
        if (!regex.test(input.value)) {
            input.value = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
            this.myForm.get('userPhone')?.setValue(input.value)
        }
    }
      initializeForm(){
        this.myForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            stateName: ['', Validators.required],
            cityName: ['', Validators.required],
            // location: [this.userDataAugmontService.userAugmontData.ownerAddress, Validators.required],
            pinCode: ['', Validators.required],
            // address: [this.userDataAugmontService.userAugmontData.ownerAddress, Validators.required],
          });
         
      }
      onSubmit(){
        if (this.myForm.valid) {
            const formValue = {
                panCardNumber : this.myForm.get('panCardNumber')?.value,
                nameOnPanCard : this.myForm.get('nameOnPanCard')?.value,
                firstName : this.myForm.get('firstName')?.value,
                lastName : this.myForm.get('lastName')?.value,
                stateName : this.myForm.get('stateName')?.value,
                cityName : this.myForm.get('cityName')?.value,
                location : this.myForm.get('location')?.value,
                pinCode : this.myForm.get('pinCode')?.value,
                address : this.myForm.get('address')?.value,
            }
            this.service.post(formValue, '/v1/augmont/create_broker/').subscribe(
                (response) => {
                    if (response.code === '200') {
                        this.router.navigate(['AugmontUserDashBoard']);

                        this.snackbarService.showCustomSnackBarSuccess(response.create_broker);
                    }
                    else if(response.code === '400'){
                        this.snackbarService.showCustomSnackBarError(response.data.message);

                    }
                    else if(response.code === '404'){
                        this.snackbarService.showCustomSnackBarError(response.create_broker);

                    }
                    else{
                        this.snackbarService.showCustomSnackBarError(response.create_broker);

                    }
                },
                (error) => {
                  console.error('broker creation failed:', error);
                  this.snackbarService.showCustomSnackBarError(error);
                }
              );
        }
      }
}