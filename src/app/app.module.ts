import { MaterialModule } from './shared/material.module';
import { HomeModule } from './homeComponent/home.module';
import { UserManagementModule } from './userManagement/userManagement.module';
import { AppRouterModule } from './router.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HTTPInterceptor } from './utils/HTTPInterceptor';
import { AccessService } from './services/AccessService';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouterModule,
    UserManagementModule,
    HomeModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [UserService, AccessService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
