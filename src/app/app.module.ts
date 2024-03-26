import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JoinningPageComponent } from './modules/joinning-page/joinning-page.component';
import { CreateTeamComponent } from './modules/create-team/create-team.component';
import { CircularCountdownComponent } from './circular-countdown/circular-countdown.component';
import { NextRoomComponent } from './modules/next-room/next-room.component';
import { RoomSenarioComponent } from './modules/room-senario/room-senario.component';
import { TimeFormatPipe } from './time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoinningPageComponent,
    CreateTeamComponent,
    CircularCountdownComponent,
    NextRoomComponent,
    RoomSenarioComponent,
    TimeFormatPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
