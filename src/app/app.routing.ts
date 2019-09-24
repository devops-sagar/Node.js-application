import {Routes, RouterModule} from '@angular/router';
import {AccessGuard} from './modules/login/authentication.service';
import { ContentComponent } from './modules/content/content.component';
import { LoginComponent } from './modules/login/login.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import { RegisterComponent } from './modules/register/register.component';
import { PostComponent } from './modules/post/post.component';
import { ListPostComponent } from './modules/post/listPost.component';
import { ViewPostComponent } from './modules/post/viewPost.component';
import { ListOffenderComponent } from './modules/post/listOffender.component';
import { UserComponent } from './modules/user/user.component';

const appRoutes: Routes = [
    {
        path: '',
        canActivate: [ AccessGuard ],
        component: ContentComponent,
        children: [
            { path: 'home', component: DashboardComponent },
            { path: 'addPost', component: PostComponent },
            { path: 'listPost/:status', component: ListPostComponent},
            { path: 'viewPost/:id', component: ViewPostComponent},
            { path: 'listOffender/:social_type', component: ListOffenderComponent},
            { path: 'profile', component: UserComponent}
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});
