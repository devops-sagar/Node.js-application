import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient, private router: Router) { }
    login(data) {
        const promise = new Promise((resolve, reject) => {
            const apiURL = environment.baseUrl + '/user/login';
            this.http.post(apiURL, data)
                .toPromise()
                .then(
                    res => { // Success
                        console.log(res);
                        resolve(res);
                    }
                ).catch(
                err => {
                    console.log(err);
                    reject(err);
                }
            );
        });
        return promise;
    }

    logOut(data) {
        const promise = new Promise((resolve, reject) => {
            const apiURL = environment.baseUrl + '/user/logOut';
            this.http.post(apiURL, data)
                .toPromise()
                .then(
                    res => { // Success
                        console.log(res);
                        resolve(res);
                    }
                ).catch(
                err => {
                    console.log(err);
                    reject(err);
                }
            );
        });
        return promise;
    }

    private handleError(error: any) {
        console.error('An error occurred', error); // for demo purposes only
        // return Promise.reject(error.message || error);
    }
}
