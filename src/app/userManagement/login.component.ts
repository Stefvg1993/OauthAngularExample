import { Router } from '@angular/router';
import { AccessService } from './../services/AccessService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['./userManagement.css']
})

export class LoginComponent implements OnInit {
    constructor(fb: FormBuilder, private accessService: AccessService, private router: Router) {
        this.form = fb.group({
            username: ['', [Validators.minLength(4), Validators.required]],
            password: ['', [Validators.minLength(6), Validators.required]],
        });
    }

    form: FormGroup;

    ngOnInit() { }

    login() {
        this.validateAllFormFields(this.form);
        if (this.form.valid) {
            this.accessService.obtainAccessToken(this.form);
        }
    }

    register() {
        this.router.navigate(['/register']);
    }

    resetPassword() {
        this.router.navigate(['requestResetPassword']);
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}
