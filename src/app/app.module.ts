import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./components/profile-edit/profile.component";
import { RoomComponent } from "./components/room/room.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PersonComponent } from "./components/person/person.component";
import { MainComponent } from "./components/main/main.component";
import { HeaderComponent } from "./components/header/header.component";
import { BottomNavComponent } from "./components/bottom-nav/bottom-nav.component";
import { EventComponent } from './components/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RoomComponent,
    PersonComponent,
    MainComponent,
    HeaderComponent,
    BottomNavComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
