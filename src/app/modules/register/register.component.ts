import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myform: FormGroup;
  apiError: any = {err:false,message:''};
  
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit() {
  	this.myform = new FormGroup({
  		name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
	    email: new FormControl('', [Validators.required, Validators.email]),
	    password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
	    phone: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
	    gender: new FormControl('Male', [Validators.required])
    });
    let ele = document.getElementById('myVideo');
    ele.click();
  }

  doSomething(event: any) {
    console.log('called event========', event);
    this.videoplayer.nativeElement.play();

  }

  Register(value: any): void {
    const userObj = {
      name: value.name,
      email: value.email,
      password: value.password,
      phone: value.phone,
      gender: value.gender
    };
    console.log(userObj)
    this.registerService.register(userObj).then(res => {
      console.log(res);
      localStorage.setItem('email', res['data']['email']);
      localStorage.setItem('access_token', res['data']['access_token']);
      localStorage.setItem('id', res['data']['id']);
      localStorage.setItem('user_type', res['data']['user_type']);
      localStorage.setItem('headerName', res['data']['name']+' ('+res['data']['user_type']+')');
      this.router.navigate(['/home']);
    }).catch(err => {
      console.log( 'err============>', err );
      this.apiError = {err: true, message: err.error.message};
    });
  }

}
