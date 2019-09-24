import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class PostService {
  constructor(private http: HttpClient, private router: Router) { }
  addPost(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/user/addPost';
      const formData: FormData = new FormData();
      formData.append('media', data.image, data.image.name);
      formData.append('fk_user_id', data.fk_user_id);
      formData.append('media_type', data.media_type);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('offender_social_info', data.offender_social_info);
      formData.append('offender_user_info', data.offender_user_info);
      this.http.post(apiURL, formData)
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

  getPosts(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/user/listPosts/' + data.id + '/' + data.status;
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

  getPost(id) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/user/getPost/' + id;
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

  setPost(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/user/setPost';
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

  getOffender(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/user/getTopAffendedPost/' + data.media_type;
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
