import { Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PasswordValidation } from './../utils/PasswordValidation';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { AccessService } from './../services/AccessService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'reset-password-component',
    templateUrl: 'resetPassword.component.html',
    styleUrls: ['./userManagement.css']
})

export class ResetPasswordComponent implements OnInit {
    username: String;
    confirmationCode: String;

    constructor(fb: FormBuilder, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.form = fb.group({
            password: ['', [Validators.minLength(6), Validators.required]],
            repeatPassword: ['', [Validators.minLength(6), Validators.required]]
        }, {
                validator: PasswordValidation.MatchPassword // your validation method
            });
    }

    form: FormGroup;

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.username = params['username'];
            this.confirmationCode = params['code'];
        });
    }

    resetPassword() {
        this.validateAllFormFields(this.form);
        if (this.form.valid) {
            this.userService.resetPassword(this.username, this.confirmationCode, this.form.get('password').value).subscribe();
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
