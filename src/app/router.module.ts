import { ProfileComponent } from './userManagement/profile.component';
import { ResetPasswordComponent } from './userManagement/resetPassword.component';
import { RequestResetPasswordComponent } from './userManagement/requestResetPassword.component';
import { ConfirmComponent } from './userManagement/confirm.component';
import { RegisterComponent } from './userManagement/register.component';
import { HomeComponent } from './homeComponent/home.component';
import { LoginComponent } from './userManagement/login.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: '',
            component: HomeComponent
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'register',
            component: RegisterComponent
        },
        {
            path: 'confirmUser',
            component: ConfirmComponent
        },
        {
            path: 'requestResetPassword',
            component: RequestResetPasswordComponent
        },
        {
            path: 'resetPassword',
            component: ResetPasswordComponent
        },
        {
            path: 'profile',
            component: ProfileComponent
        }
    ])],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRouterModule { }
