import { Routes } from '@angular/router';

import { HomeComponent } from '../../pages/Home/home.component';
import { PatientAppointmentComponent } from 'src/app/pages/PatientAppointment/PatientAppointment.component';
import { AppointmentConfirmedComponent } from 'src/app/pages/AppointmentConfirmed/AppointmentConfirmed.component';


export const AuthLayoutRoutes: Routes = [
    { path: 'home',          component: HomeComponent },
    { path: 'patientAppointment',          component: PatientAppointmentComponent },
    {path : 'AppointmentConfirmed', component: AppointmentConfirmedComponent},
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
