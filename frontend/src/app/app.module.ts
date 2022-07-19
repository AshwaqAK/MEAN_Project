import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './component/task/task.component';
import { ProjectComponent } from './component/project/project.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NetworkInterceptor } from './interceptors/network.interceptor';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ProjectComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
