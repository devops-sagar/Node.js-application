import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './viewPost.component.html',
  styleUrls: []
})
export class ViewPostComponent implements OnInit {

	post = [];
	
	constructor(private postService: PostService, private route: ActivatedRoute) { 
		route.params.subscribe(val => {
	        const postObj = {
	            id: this.route.snapshot.params.id
	        };
	        this.GetPost(postObj.id);
	    });
	}

	ngOnInit() {
		
	}

	GetPost(id: any): any {
	    this.postService.getPost(id).then(res => {
	    	console.log(res);
		    this.post = res['data'];
	    }).catch(err => {
		    console.log( 'err============>', err );
	    });
  	}

}
