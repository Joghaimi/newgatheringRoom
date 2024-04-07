import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-shooting-room',
  templateUrl: './shooting-room.component.html',
  styleUrls: ['./shooting-room.component.css']
})
export class ShootingRoomComponent {
  showStartGame = true;
  showTimerandScore = false;
  goToTheNextRoom = false;
  showLoading = false;
  teamName = "FromTheRoom"
  gameName = "Shooting Room"
  gameUrl1 = "Shooting";
  gameUrl = "Shooting";
  nextGame = "diving";
  score = 0;
  gameTotalTime = 360;
  team: Team = { name: "Team Name" };
  countdownSubscription!: Subscription;
  roundNumber = 0;
  requiredScore = 0;
  roundScore = 0;
  constructor(private teamService: TeamService) {

  }
  startTheGame() {
    // Get Team Info
    this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
      e => {
        this.team = e;
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
    this.gameTotalTime = 360;
    this.goToTheNextRoom = false;
    this.showLoading = true;
    let interval = setInterval(() => {
      this.teamService.isOccupiedByName(this.nextGame).subscribe(
        response => {
          if (!response) {
            this.teamService.sendScoreToNextRoomByName(this.nextGame, this.team).subscribe(
              e => {
                this.showLoading = false;
                this.showStartGame = true;
                clearInterval(interval);
              }
            );
          }
        }
      );
    }, 3000);
  }
  startTimer() {
    this.showTimerandScore = true
    let interval = setInterval(() => {
      this.gameTotalTime--;
      this.teamService.getScore(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          this.score = e;
        }
      );
      this.teamService.getRound(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          this.roundNumber = e[0] + 1;
          this.roundScore = e[1];
          this.mapRoundToScore(this.roundNumber);
        }
      );
      if (this.gameTotalTime == 0) {
        this.showTimerandScore = false;
        this.goToTheNextRoom = true;
        clearInterval(interval);
      }
    }, 1000);
  }


  mapRoundToScore(round: number) {
    if (round == 0) {
      this.requiredScore = 5
    }
    else if (round == 1) {
      this.requiredScore = 75
    } else if (round == 2) {
      this.requiredScore = 100
    } else if (round == 3) {
      this.requiredScore = 125
    } else if (round == 4) {
      this.requiredScore = 150
    } else if (round == 5) {
      this.requiredScore = 180
    }
  }


}
