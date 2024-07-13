import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { HomeComponent } from "../../pages/Home/home.component";
import { PatientAppointmentComponent } from "src/app/pages/PatientAppointment/PatientAppointment.component";
import { AppointmentConfirmedComponent } from "src/app/pages/AppointmentConfirmed/AppointmentConfirmed.component";
import { MyModalComponent } from "src/app/pages/my-modal/my-modal.component";
import { ProfessionalListComponent } from "src/app/pages/Professional-list/professional-list.component";
import { BusinessListComponent } from "src/app/pages/business-list/business-list.component";
import { ClinicDetailComponent } from "src/app/pages/clinic-detail/clinic-detail.component";
import { DoctorsListNewComponent } from "src/app/pages/doctors-list-new/doctors-list-new.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { PendingPaymentVerificationComponent } from "src/app/pages/PatientAppointment/pending-payment-verification/pending-payment-verification.component";
import { PaymentfailedComponent } from "src/app/pages/paymentfailed/paymentfailed.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    // NgbModule
  ],
  declarations: [
    HomeComponent,
    PatientAppointmentComponent,
    AppointmentConfirmedComponent,
    MyModalComponent,
    ProfessionalListComponent,
    BusinessListComponent,
    ClinicDetailComponent,
    DoctorsListNewComponent,
    PendingPaymentVerificationComponent,
    PaymentfailedComponent
  ],
})
export class AuthLayoutModule {}
