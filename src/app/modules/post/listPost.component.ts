import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from './post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postlist',
  templateUrl: './listPost.component.html',
  styleUrls: ['./listPost.component.css']
})
export class ListPostComponent implements OnInit {
  private posts: any;
  p: number = 1;
  user_type = localStorage.getItem('user_type');
  constructor(private postService: PostService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
        console.log('list post called');
        let postObj = {}
        if (localStorage.getItem('user_type') === 'user') {
          postObj = {
            id: localStorage.getItem('id'),
            status: this.route.snapshot.params.status
          };
        } else {
          postObj = {
            id: 0,
            status: this.route.snapshot.params.status
          };
        }
        this.getPosts(postObj);
    });
  }

  ngOnInit() {
    
  }

  getPostByStatus(status) {
    let postObj = {}
    if (localStorage.getItem('user_type') === 'user') {
      postObj = {
        id: localStorage.getItem('id'),
        status: status
      };
    } else {
      postObj = {
        id: 0,
        status: status
      };
    }
    console.log(postObj)
    this.getPosts(postObj);
  }

  getPosts(data): void {
    this.postService.getPosts(data).then(res => {
      console.log(res);
      this.posts = res['data'];
    }).catch(err => {
      this.posts = [];
      console.log( 'err============>', err );
    });
  }

  SetPostStatus(id, status) {
    let data = {
      id: id,
      status: status
    }
    this.postService.setPost(data).then(res => {
      console.log(res);
      let postObj = {
        id: 0,
        status: 1
      };
      this.getPosts(postObj);
    }).catch(err => {
      this.posts = [];
      console.log( 'err============>', err );
    });
  }

}