import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../modules/login/login.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    name: string;

    constructor(private router: Router, private loginService: LoginService) { }

    ngOnInit() {
        this.name = localStorage.getItem('headerName')
    }

    signOut(): void {
        const admin_id = { id: localStorage.getItem('id') };
        this.loginService.logOut(admin_id).then(res => {
            delete localStorage.email;
            delete localStorage.headerName;
            delete localStorage.access_token;
            delete localStorage.id;
            delete localStorage.user_type;
            this.router.navigate(['/login']);
        }).catch(err => {
            console.log( 'err============>', err );
            delete localStorage.email;
            delete localStorage.headerName;
            delete localStorage.access_token;
            delete localStorage.id;
            delete localStorage.user_type;
            this.router.navigate(['/login']);
        });
    }
}