import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-room-senario',
  templateUrl: './room-senario.component.html',
  styleUrls: ['./room-senario.component.css']
})
export class RoomSenarioComponent {
  showStartGame = true;
  showTimerandScore = false;
  goToTheNextRoom = false;
  showLoading = false;
  teamName = "FromTheRoom"
  gameName = "Game Name"
  gameUrl1 = "fort";
  gameUrl = "fortRoom";
  score = 0;
  gameTotalTime = 3;
  // team: Team = { name: "Team Name" };
  team: Team = { name: "-----", darkRoomScore: 0, divingRoomScore: 0, floorIsLavaRoomScore: 0, fortRoomScore: 0, shootingRoomScore: 0, isAdult: true };

  countdownSubscription!: Subscription;

  constructor(private teamService: TeamService) {

  }
  startTheGame() {
    // Get Team Info
    this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
      e => {
        // this.team = e;
        this.showStartGame = false;
        this.teamService.startTheGame(this.gameUrl1, this.gameUrl).subscribe(
          e => {
            this.startTimer();
          }
        );
      }
    );
  }
  GoToTheNextRoom() {
    // Restart The Game
    this.gameTotalTime = 90;
    this.goToTheNextRoom = false;
    this.showLoading = true;
    let interval = setInterval(() => {
      this.teamService.isOccupiedByName("shooting").subscribe(
        response => {
          if (!response) {
            // this.teamService.sendScoreToNextRoomByName("shooting",this.team).subscribe(
            //   e => {
            //     this.showLoading=false;
            //     this.showStartGame=true;
            //     clearInterval(interval);
            //   }
            // );
          }
        }
      );
    }, 3000);
  }
  startTimer() {
    this.showTimerandScore = true
    let interval = setInterval(() => {
      this.gameTotalTime--;
      if (this.gameTotalTime == 0) {
        this.showTimerandScore = false;
        this.goToTheNextRoom = true;
        clearInterval(interval);
      }
    }, 1000);
  }

}

