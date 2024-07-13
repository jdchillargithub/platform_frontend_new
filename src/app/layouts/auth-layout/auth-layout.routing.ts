import { Routes } from "@angular/router";

import { HomeComponent } from "../../pages/Home/home.component";
import { PatientAppointmentComponent } from "src/app/pages/PatientAppointment/PatientAppointment.component";
import { AppointmentConfirmedComponent } from "src/app/pages/AppointmentConfirmed/AppointmentConfirmed.component";
import { ProfessionalListComponent } from "src/app/pages/Professional-list/professional-list.component";
import { BusinessListComponent } from "src/app/pages/business-list/business-list.component";
import { ClinicDetailComponent } from "src/app/pages/clinic-detail/clinic-detail.component";
import { DoctorsListNewComponent } from "src/app/pages/doctors-list-new/doctors-list-new.component";
import { PendingPaymentVerificationComponent } from "src/app/pages/PatientAppointment/pending-payment-verification/pending-payment-verification.component";
import { PaymentfailedComponent } from "src/app/pages/paymentfailed/paymentfailed.component";

export const AuthLayoutRoutes: Routes = [
  { path: "home", component: BusinessListComponent },
  { path: "professional", component: ProfessionalListComponent },
  { path: "doctor", component: HomeComponent },
  { path: "patientAppointment", component: PatientAppointmentComponent },
  { path: "AppointmentConfirmed", component: AppointmentConfirmedComponent },
  { path: "payment-failed", component: PaymentfailedComponent },
  { path: "business", component: BusinessListComponent },
  { path: "clinic", component: ClinicDetailComponent },
  { path: "doctors-list", component: DoctorsListNewComponent },
  { path: "verify-payment", component: PendingPaymentVerificationComponent },
  // {path: 'EmailOtp', component: EmailOtpComponent},
  // {path: 'AdhaarVerification',component:AdhaarVerificationComponent},
  // {path : 'Offer', component:OfferComponent},
  // {path : 'Confirmation', component:ConfirmationComponent},
  // {path : 'VideoKyc', component:VideoKycComponent},
  // {path : 'AddBank', component:AddBankComponent},
  // {path: 'LoanAgreement', component:LoanAgreementComponent},
  // {path:'eSign',component:eSignComponent},
  // {path: 'eMandate', component:eMandateComponent},
  // {path : 'Disbursed', component:DisbursedComponent},
  // { path: 'register',       component: RegisterComponent }
];
