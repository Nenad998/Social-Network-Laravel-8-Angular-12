import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { HomeComponent } from './components/home/home.component';
import { MembersComponent } from './components/members/members.component';

const routes: Routes =[
  {path: '', component: DashboardComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'members', component: MembersComponent},
      {path: 'friends', component: FriendsComponent},
      {path: '', redirectTo: '/user/home',pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
            ReactiveFormsModule,
            FormsModule,
  ],
  exports: [RouterModule,
            ReactiveFormsModule,
            FormsModule,]
})
export class UserRoutingModule { }
