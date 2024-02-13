import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { BookingDataService } from 'src/app/services/booking.service';

@Component({
    selector: 'app-modal',
    templateUrl: './my-modal.component.html',
    styleUrls: ['./my-modal.component.scss'],
    providers: [DatePipe]
  })
  export class MyModalComponent implements OnInit, OnDestroy {
    ngOnInit(){
    }
    ngOnDestroy() {
    }
  }