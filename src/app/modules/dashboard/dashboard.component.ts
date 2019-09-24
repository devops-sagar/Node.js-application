import { Component, OnInit } from '@angular/core';
import {DashboardService} from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    totalPosts = 0;
    totalPendingPosts = 0;
    totalApprovedPosts = 0;
    totalRejectPosts = 0;
    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
    	if (localStorage.getItem('user_type') === 'user') {
			this.getTotalPosts(localStorage.getItem('id'));
    	} else {
            this.getTotalPosts(0);
        }
    }

    getTotalPosts(id) {
        this.dashboardService.getTotalPosts(id).then(res => {
            this.totalPosts = res['data']['totalPosts'];
            this.totalPendingPosts = res['data']['totalPendingPosts'];
            this.totalApprovedPosts = res['data']['totalApprovedPosts'];
            this.totalRejectPosts = res['data']['totalRejectPosts'];
        }).catch(function (error) {
            console.log(error.error);
        });
    }
}
