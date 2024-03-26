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
  isGameStarted = false;
  isGameFinished = false;
  teamName = "FromTheRoom"
  gameName = "Game Name"
  gameUrl1 = "fort";
  gameUrl = "fortRoom";
  score = 10;
  gameTotalTime = 50;
  team: Team = { name: "Team Name" };
  countdownSubscription!: Subscription;

  constructor(private teamService: TeamService) {

  }
  startTheGame() {
    // Get Team Info
    this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
      e => {
        this.team = e;
        this.isGameStarted = true;
        this.startTimer();
      }
    );
  }
  GoToTheNextRoom() {

  }
  startTimer() {
    let interval = setInterval(() => {
      this.gameTotalTime--;
      if (this.gameTotalTime == 0) {
        this.isGameFinished =true;
        this.isGameStarted =false;
        clearInterval(interval);
      }
    }, 1000);
  }
}
