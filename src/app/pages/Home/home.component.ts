import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  myForm: FormGroup;
  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private emailService: EmailService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
  }

 
Onsubmit(){
  this.router.navigate(['login-otp']);
}
}
