import { User } from './model/user';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { AccessService } from './services/AccessService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: User;

  constructor(private accessService: AccessService, private router: Router, private userService: UserService) {
    this.userService.user.subscribe(
      (newVal) => {
        this.user = newVal;
      }
    );
  }

  ngOnInit() {
    if (this.user == null) {
      this.userService.getUser();
    }
  }

  logout() {
    this.accessService.logout();
    this.router.navigate(['/login']);
  }

  openProfile() {
    this.router.navigate(['/profile']);
  }

}
