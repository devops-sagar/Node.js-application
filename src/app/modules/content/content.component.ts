import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
      const userAuth = localStorage.getItem('email');
      if ( !userAuth || userAuth === undefined || userAuth === null ) {
          this.router.navigate(['/login']);
      } else {
          if (this.router.url === '/') {
              this.router.navigate(['/home']);
          }
      }
  }

}
