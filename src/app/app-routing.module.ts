import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile-edit/profile.component';
import {RoomComponent} from './components/room/room.component';
import {PersonComponent} from './components/person/person.component';
import {MainComponent} from './components/main/main.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'person/:id',
    component: PersonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'room',
    component: RoomComponent
  },
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
