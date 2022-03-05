import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MembersComponent } from './components/members/members.component';
import { HomeComponent } from './components/home/home.component';
import { FriendsComponent } from './components/friends/friends.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MembersComponent,
    HomeComponent,
    FriendsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
