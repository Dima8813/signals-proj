import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from '@shared/interceptors';
import { HomeModule } from '@pages/home/home.module';
import { SignupComponent } from '@pages/signup/signup.component';
import { LoginComponent } from '@pages/login/login.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { HeaderComponent } from '@layout/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    HomeModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
