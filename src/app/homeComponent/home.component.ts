import { UserService } from './../services/user.service';
import { User } from './../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    users: User[] = [];
    constructor(private userService: UserService) {
        this.userService.getAllUsers().subscribe(
            result => this.users = result
        )
    }

    ngOnInit() { }
}