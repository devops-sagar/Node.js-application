import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient, private router: Router) { }
    getTotalPosts(id) {
        const promise = new Promise((resolve, reject) => {
            const apiURL = environment.baseUrl + '/user/totalPosts/' + id;
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
                    if (err.error.code === 401 && err.error.message === 'Invalid admin request') {
                        delete localStorage.email;
                        delete localStorage.role;
                        delete localStorage.id;
                        this.router.navigate(['/login']);
                        reject(err);
                    }
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
