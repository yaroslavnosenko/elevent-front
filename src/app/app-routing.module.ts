import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile-edit/profile.component";
import { RoomComponent } from "./components/room/room.component";
import { PersonComponent } from "./components/person/person.component";
import { MainComponent } from "./components/main/main.component";
import { EventComponent } from "./components/event/event.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "person/:id",
    component: PersonComponent
  },
  {
    path: "room",
    component: RoomComponent
  },
  {
    path: "",
    component: MainComponent
  },
  {
    path: "event/:id",
    component: EventComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
