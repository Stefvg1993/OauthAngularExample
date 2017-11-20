import { Observable } from 'rxjs/Observable';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
    userObject: User;
    user: Observable<User>;
    private userSubject = new Subject<User>();

    constructor(private httpClient: HttpClient) {
        this.user = this.userSubject.asObservable();
        this.user.subscribe(result => this.userObject = result);
    }

    getUser() {
        this.httpClient.get<User>('/api/secured/user').subscribe(
            result => {
                this.userSubject.next(result);
            });
    }

    getAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>('/api/secured/user/all');
    }

    createUser(formData) {
        delete formData['repeatPassword'];
        this.httpClient.post('/api/secured/user/unsecured/create', formData, { responseType: 'text' })
            .subscribe();
    }

    updateUser(formData) {
        delete formData['repeatPassword'];
        console.log(formData);
        if (formData['password'] === '') {
            delete formData['password'];
        }
        console.log(formData);
        this.httpClient.post<User>('/api/secured/user', formData)
            .subscribe(result => {
                this.userSubject.next(result);
            });
    }

    confirmUser(username: String, confirmationCode: String): Observable<any> {
        return this.httpClient.post('/api/secured/user/unsecured/confirm',
            { 'username': username, 'confirmationCode': confirmationCode }, { responseType: 'text' });

    }

    requestResetPassword(username: String): Observable<any> {
        console.log(username);
        return this.httpClient.post('/api/secured/user/unsecured/requestResetPassword', username, { responseType: 'text' });
    }

    resetPassword(username: String, confirmationCode: String, newPassword: String) {
        const data = { 'username': username, 'confirmationCode': confirmationCode, 'newPassword': newPassword };
        return this.httpClient.post('/api/secured/user/unsecured/resetPassword', data, { responseType: 'text' });
    }

    setUser(user) {
        this.userSubject.next(user);
    }
}
