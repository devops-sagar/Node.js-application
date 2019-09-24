// Set headers at every request call;
import { Injectable } from '@angular/core';
import { BaseRequestOptions, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers = new Headers({
        'Authorization': localStorage.getItem('name')
    });
}
export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };
