import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'confirm-component',
    templateUrl: 'confirm.component.html'
})

export class ConfirmComponent implements OnInit {
    error;

    confirmed = false;
    constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            const username = params['username'];
            const confirmationCode = params['code'];
            this.userService.confirmUser(username, confirmationCode)
                .subscribe(res => this.confirmed = true, error => { this.error = error; console.log(error); });
        });
    }
}