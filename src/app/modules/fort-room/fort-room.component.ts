import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-fort-room',
  templateUrl: './fort-room.component.html',
  styleUrls: ['./fort-room.component.css']
})
export class FortRoomComponent {
  
  showStartGame = true;
  showTimerandScore = false;
  goToTheNextRoom = false;
  showLoading =false;
  teamName = "FromTheRoom"
  gameName = "Fort Room"
  gameUrl1 = "fort";
  gameUrl = "fortRoom";
  nextGame = "shooting";
  score = 0;
  gameTotalTime = 120;
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
    this.gameTotalTime = 120;
    this.goToTheNextRoom = false;
    this.showLoading=true;
    let interval = setInterval(() => {
      this.teamService.isOccupiedByName(this.nextGame).subscribe(
        response => {
          if (!response) {
            this.teamService.sendScoreToNextRoomByName(this.nextGame,this.team).subscribe(
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
      this.gameTotalTime--;
      if (this.gameTotalTime == 0) {
        this.showTimerandScore = false;
        this.goToTheNextRoom =true;
        clearInterval(interval);
      }
    }, 1000);
  }
}
