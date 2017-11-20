import { ProfileComponent } from './profile.component';
import { ResetPasswordComponent } from './resetPassword.component';
import { RequestResetPasswordComponent } from './requestResetPassword.component';
import { ConfirmComponent } from './confirm.component';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    exports: [],
    declarations: [LoginComponent, RegisterComponent,
        ConfirmComponent, RequestResetPasswordComponent,
        ResetPasswordComponent, ProfileComponent],
    providers: [],
})
export class UserManagementModule { }
