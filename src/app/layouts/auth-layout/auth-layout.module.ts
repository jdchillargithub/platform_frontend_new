import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from '../../pages/Home/home.component';
import { PatientAppointmentComponent } from 'src/app/pages/PatientAppointment/PatientAppointment.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
    // NgbModule
  ],
  declarations: [
    HomeComponent,
    PatientAppointmentComponent
  ]
})
export class AuthLayoutModule { }
