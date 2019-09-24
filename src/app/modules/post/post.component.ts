import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from './post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	myform: FormGroup;
	fileToUpload: File = null;
	selectedValue: any
	apiError: any = {err:false, message:''};

	mediaTypes = [
		{id:1, name: 'Image'},
		{id:2, name: 'Video'},
		{id:3, name: 'Audio'}
	]
	
	constructor(private postService: PostService, private router: Router) { }

	ngOnInit() {
		this.selectedValue = this.mediaTypes[0];
		this.myform = new FormGroup({
	      	title: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
	      	description: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(250)]),
	      	media_type: new FormControl('', []),
	      	offender_social_info: new FormControl('phone', [Validators.required]),
	      	offender_user_info: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(50)])
	    });
	    this.myform.controls['media_type'].setValue(this.selectedValue);
	}

	MediaTypeChange(e) {
		let val = this.myform.controls['media_type'].value;
		this.selectedValue = this.mediaTypes[val.id - 1];
		this.fileToUpload = null;
	}

	handleFileInput(files: FileList) {
	    this.fileToUpload = files.item(0);
	    this.apiError = {err: false, message: ''};
	}

	AddPost(value: any): any {
	    if (this.fileToUpload === null || this.fileToUpload === undefined) {
	        this.apiError = {err: true, message: 'Please select medial file'};
	        return false;
	    }
	    const postObj = {
	      	image: this.fileToUpload,
	      	title: value.title,
	      	description: value.description,
	      	fk_user_id: localStorage.getItem('id'),
	      	media_type: value.media_type.name,
	      	offender_social_info: value.offender_social_info,
	      	offender_user_info: value.offender_user_info
	    };
	    if (value.title.trim().length === 0) {
	      	this.myform.controls['title'].setErrors({"titleNotEmpty": true});
	      	return false;
	    };
	    if (value.description.trim().length === 0) {
	        this.myform.controls['description'].setErrors({"descriptionArNotEmpty": true});
	        return false;
	    };
	    if (value.offender_user_info.trim().length === 0) {
	        this.myform.controls['offender_user_info'].setErrors({"offender_user_infoNotEmpty": true});
	        return false;
	    };
	    this.postService.addPost(postObj).then(res => {
	    	console.log(res);
	    	this.apiError = {err: false, message: ''};
		    this.router.navigate(['/listPost', 1]);
	    }).catch(err => {
		    console.log( 'err============>', err );
		    this.apiError = {err: true, message: err.error.message};
	    });
  	}
}
