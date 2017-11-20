import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { AccessService } from './../services/AccessService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'request-reset-password-component',
    templateUrl: 'requestResetPassword.component.html',
    styleUrls: ['./userManagement.css']
})

export class RequestResetPasswordComponent implements OnInit {
    constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
        this.form = fb.group({
            username: ['', [Validators.minLength(4), Validators.required]],
        });
    }

    form: FormGroup;

    ngOnInit() { }

    resetPassword() {
        this.validateAllFormFields(this.form);
        if (this.form.valid) {
            this.userService.requestResetPassword(this.form.get('username').value).subscribe();
        }
    }

    login() {
        this.router.navigate(['/login']);
    }

    validateAllFormFields(formGroup: FormGroup) {         //{1}
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {             //{4}
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
    }
}
