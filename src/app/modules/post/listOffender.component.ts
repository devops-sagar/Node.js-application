import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from './post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postlist',
  templateUrl: './listOffender.component.html',
  styleUrls: []
})
export class ListOffenderComponent implements OnInit {
  private posts: any;
  p: number = 1;
  constructor(private postService: PostService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
        let postObj = {media_type: this.route.snapshot.params.social_type}
        this.getPosts(postObj);
    });
  }

  ngOnInit() {
    
  }

  getPostByMedia(media_type) {

    let postObj = {media_type: media_type}
    console.log("get post called",postObj)
    this.getPosts(postObj);
  }

  getPosts(data): void {
    this.postService.getOffender(data).then(res => {
      console.log(res);
      this.posts = res['data'];
    }).catch(err => {
      this.posts = [];
      console.log( 'err============>', err );
    });
  }

}