import { UserService } from './../services/user.service';
import { User } from './../model/user';
import { PasswordValidation } from './../utils/PasswordValidation';
import { Router } from '@angular/router';
import { AccessService } from './../services/AccessService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'register-component',
    templateUrl: 'register.component.html',
    styleUrls: ['./userManagement.css']
})

export class RegisterComponent implements OnInit {
    constructor(fb: FormBuilder, private accessService: AccessService, private router: Router, private userService: UserService) {
        this.user = new User();
        this.form = fb.group({
            firstName: [this.user.firstName, [Validators.minLength(6), Validators.required]],
            lastName: [this.user.lastName, [Validators.minLength(6), Validators.required]],
            username: [this.user.username, [Validators.minLength(4), Validators.required]],
            email: [this.user.email, [Validators.required]],
            password: [this.user.password, [Validators.minLength(6), Validators.required]],
            repeatPassword: ['', [Validators.minLength(6), Validators.required]]
        }, {
                validator: PasswordValidation.MatchPassword // your validation method
            });
    }

    form: FormGroup;
    user: User;

    ngOnInit() { }

    register() {
        this.validateAllFormFields(this.form);
        if (this.form.valid) {
            this.userService.createUser(this.form.value);
        }
    }

    login() {
        this.router.navigate(['/login']);
    }

    validateAllFormFields(formGroup: FormGroup) {         // {1}
        Object.keys(formGroup.controls).forEach(field => {  // {2}
            const control = formGroup.get(field);             // {3}
            if (control instanceof FormControl) {             // {4}
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        // {5}
                this.validateAllFormFields(control);            // {6}
            }
        });
    }
}
