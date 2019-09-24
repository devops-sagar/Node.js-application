import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	myform: FormGroup;
    apiError: any = {err:false,message:''};
    constructor(private router: Router, private loginService: LoginService) { }

    ngOnInit() {
        this.myform = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(15)])
        });
    }

    submitForm(value: any): void {
        const userObj = {
            email: value.email,
            password: value.password
        };
        this.loginService.login(userObj).then(res => {
            localStorage.setItem('email', res['data']['email']);
            localStorage.setItem('headerName', res['data']['name']+' ('+res['data']['user_type']+')');
            localStorage.setItem('access_token', res['data']['access_token']);
            localStorage.setItem('id', res['data']['id']);
            localStorage.setItem('user_type', res['data']['user_type']);
            this.router.navigate(['/home']);
        }).catch(err => {
            console.log( 'err============>', err );
            this.apiError = {err: true, message: err.error.message};
        });
    }
    
}
