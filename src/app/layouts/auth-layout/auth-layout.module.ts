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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
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
  ],
})
export class AuthLayoutModule {}
