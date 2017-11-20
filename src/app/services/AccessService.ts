import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AccessService {

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) { }

  obtainAccessToken(loginData) {
    const params = new FormData();
    params.append('username', loginData.get('username').value);
    params.append('password', loginData.get('password').value);
    params.append('grant_type', 'password');

    console.log(loginData.get('username'));
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa('oauthExample:password'));

    this.httpClient.post('/api/oauth/token', params, { headers: headers, observe: 'response', withCredentials: true })
      .subscribe(
      data => { this.saveToken(data.body); this.userService.getUser(); },
      err => console.log(err));
  }

  saveToken(token) {
    localStorage.setItem('access_token', token.access_token);
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userService.setUser(null);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
}
