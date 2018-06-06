import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { SocialFeedComponent } from './social-feed/social-feed.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { NetworkService } from './_services/network.service';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';

const appRoutes : Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'feed',
    component: SocialFeedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UserFriendsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SocialFeedComponent,
    AddEntryComponent,
    UserFriendsComponent
],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    NetworkService,
    AuthGuard,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
