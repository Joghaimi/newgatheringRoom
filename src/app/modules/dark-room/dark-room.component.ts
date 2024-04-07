import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-dark-room',
  templateUrl: './dark-room.component.html',
  styleUrls: ['./dark-room.component.css']
})
export class DarkRoomComponent {

  showStartGame = false;
  showTimerandScore = true;
  goToTheNextRoom = false;
  showLoading =false;
  teamName = "FromTheRoom"
  gameName = "Dark Room"
  gameUrl1 = "dark";
  gameUrl = "darkRoom";
  nextGame = "floor";
  nextGame2 = "floorislava";
  score = 0;
  gameTotalTime = 360;
  team: Team = { name: "Team Name" };
  countdownSubscription!: Subscription;

  constructor(private teamService: TeamService) {

  }
  startTheGame() {
    // Get Team Info
    this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
      e => {
        this.team = e;
        this.showStartGame = false;
        this.teamService.startTheGame(this.gameUrl1, this.gameUrl).subscribe(
          e=>{
            this.startTimer();
          }
        );
      }
    );
  }
  GoToTheNextRoom() {
    // Restart The Game
    this.gameTotalTime = 360;
    this.goToTheNextRoom = false;
    this.showLoading=true;
    let interval = setInterval(() => {
      this.teamService.isOccupiedByName2(this.nextGame,this.nextGame2).subscribe(
        response => {
          if (!response) {
            this.teamService.sendScoreToNextRoomByName2(this.nextGame,this.nextGame2,this.team).subscribe(
              e => {
                this.showLoading=false;
                this.showStartGame=true;
                clearInterval(interval);
              }
            );
          }
        }
      );
    }, 3000);
  }
  startTimer() {
    this.showTimerandScore =true
    let interval = setInterval(() => {
      this.teamService.getScore(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          this.score = e;
        }
      );
      this.gameTotalTime--;
      if (this.gameTotalTime == 0) {
        this.showTimerandScore = false;
        this.goToTheNextRoom =true;
        clearInterval(interval);
      }
    }, 1000);
  }
}
