import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private router: Router) { }
    editProfile(data) {
        const promise = new Promise((resolve, reject) => {
            const apiURL = environment.baseUrl + '/user/editProfile';
            this.http.put(apiURL, data)
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

    getProfile(id) {
        const promise = new Promise((resolve, reject) => {
            const apiURL = environment.baseUrl + '/user/getProfile/' + id;
            this.http.get(apiURL)
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
