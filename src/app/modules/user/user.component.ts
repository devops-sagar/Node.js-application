import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	myform: FormGroup;
  	apiError: any = {err:false,message:''};
  	updateProfile = false;
  	userData = {};

  	constructor(private userService: UserService) {}

  	ngOnInit() {
	  	this.myform = new FormGroup({
	  		name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
		    email: new FormControl('', [Validators.required, Validators.email]),
		    phone: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)])
	    });
	    let user_id = localStorage.getItem('id');
	    this.getProfile(user_id);
  	}

  	getProfile(user_id) {
  		this.userService.getProfile(user_id).then(res => {
  			this.userData = res['data'];
	    }).catch(err => {
	      console.log( 'err============>', err );
	    });
  	}

  	UpdateProfile(value: any): void {
	    const userObj = {
	      id: localStorage.getItem('id'),
	      name: value.name,
	      email: value.email,
	      phone: value.phone
	    };
	    console.log(userObj)
	    this.userService.editProfile(userObj).then(res => {
	      console.log(res);
	      this.updateProfile = true;
	    }).catch(err => {
	      console.log( 'err============>', err );
	      this.apiError = {err: true, message: err.error.message};
	    });
	 }

}
