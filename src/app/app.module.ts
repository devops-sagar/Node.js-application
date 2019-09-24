
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { TokenInterceptor } from './modules/login/token.interceptor';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/blocks/footer.component';
import {HeaderComponent} from './layout/blocks/header.component';
import { SidebarComponent } from './layout/blocks/sidebar.component';
import { ContentComponent } from './modules/content/content.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import {LoginComponent} from './modules/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccessGuard} from './modules/login/authentication.service';
import {DashboardService} from './modules/dashboard/dashboard.service';
import {LoginService} from './modules/login/login.service';
import {routing} from './app.routing';
import {requestOptionsProvider} from './default.request.header';
import { RegisterComponent } from './modules/register/register.component';
import {RegisterService} from './modules/register/register.service';
import {PostService} from './modules/post/post.service';
import { PostComponent } from './modules/post/post.component';
import { ListPostComponent } from './modules/post/listPost.component';
import { ViewPostComponent } from './modules/post/viewPost.component';
import { ListOffenderComponent } from './modules/post/listOffender.component';
import { UserComponent } from './modules/user/user.component';
import {UserService} from './modules/user/user.service';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    ListPostComponent,
    ViewPostComponent,
    ListOffenderComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [
    AccessGuard,
    DashboardService,
    LoginService,
    RegisterService,
    PostService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    requestOptionsProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
