import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
	user_type = localStorage.getItem('user_type');
	
  	constructor() { }

  	ngOnInit() {
  	}

}
