import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JoinningPageComponent } from './modules/joinning-page/joinning-page.component';
import { CircularCountdownComponent } from './circular-countdown/circular-countdown.component';
import { RoomSenarioComponent } from './modules/room-senario/room-senario.component';
import { TimeFormatPipe } from './time-format.pipe';
import { FortRoomComponent } from './modules/fort-room/fort-room.component';
import { ShootingRoomComponent } from './modules/shooting-room/shooting-room.component';
import { DivingRoomComponent } from './modules/diving-room/diving-room.component';
import { DarkRoomComponent } from './modules/dark-room/dark-room.component';
import { FloorIsLavaComponent } from './modules/floor-is-lava/floor-is-lava.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinningPageComponent,
    CircularCountdownComponent,
    RoomSenarioComponent,
    TimeFormatPipe,
    FortRoomComponent,
    ShootingRoomComponent,
    DivingRoomComponent,
    DarkRoomComponent,
    FloorIsLavaComponent

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
