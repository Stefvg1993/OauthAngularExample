import { UserService } from './../services/user.service';
import { User } from './../model/user';
import { PasswordValidation } from './../utils/PasswordValidation';
import { Router } from '@angular/router';
import { AccessService } from './../services/AccessService';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'profile-component',
    templateUrl: 'profile.component.html',
    styleUrls: ['./userManagement.css']
})

export class ProfileComponent {
    user: User;
    constructor(fb: FormBuilder, private accessService: AccessService, private router: Router, private userService: UserService) {
        this.form = fb.group({
            firstName: ['', [Validators.minLength(6), Validators.required]],
            lastName: ['', [Validators.minLength(6), Validators.required]],
            username: ['', [Validators.minLength(4), Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.minLength(6)]],
            repeatPassword: ['', [Validators.minLength(6)]]
        }, {
                validator: PasswordValidation.MatchPassword // your validation method
            });
        this.user = userService.userObject;
        this.updateUser(this.user);
        this.userService.user.subscribe(
            (newVal) => {
                this.user = newVal;
                this.updateUser(newVal);
            }
        );
    }

    form: FormGroup;

    register() {
        this.validateAllFormFields(this.form);
        if (this.form.valid) {
            this.userService.updateUser(this.form.value);
        }
    }

    login() {
        this.router.navigate(['/login']);
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

    updateUser(user: User) {
        if (user) {
            this.form.controls['firstName'].setValue(this.user.firstName);
            this.form.controls['lastName'].setValue(this.user.lastName);
            this.form.controls['username'].setValue(this.user.username);
            this.form.controls['email'].setValue(this.user.email);
        }
    }
}
