import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/interceptor';
// import { LoadingInterceptor } from './services/loadingInterceptor';
//end
import { AppComponent } from './app.component';
// import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    CommonModule ,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    // AdminLayoutComponent,
    AuthLayoutComponent,
    LoaderComponent,
   
   
  ],
  // providers: [
  //   {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true},
  //   { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true }
  // ],
  
  providers: [
    // Other providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoadingInterceptor,
    //   multi: true
    // }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
