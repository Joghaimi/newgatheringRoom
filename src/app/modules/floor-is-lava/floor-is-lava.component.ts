import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GatheringRoomGameStage, Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-floor-is-lava',
  templateUrl: './floor-is-lava.component.html',
  styleUrls: ['./floor-is-lava.component.css']
})
export class FloorIsLavaComponent {

  teamName = "FromTheRoom"
  gameName = "Floor Is Lava Room"
  gameUrl1 = "floor";
  gameUrl = "floorislava";
  nextGame = "dark";
  score :number|any= 0;
  totalScore :number|any= 0;
  gameTotalTime = 360;
  team: Team = { name: "-----", darkRoomScore: 0, divingRoomScore: 0, floorIsLavaRoomScore: 0, fortRoomScore: 0, shootingRoomScore: 0 ,isAdult:true};
  countdownSubscription!: Subscription;
  gameStatus = "Empty";
  constructor(private teamService: TeamService) {
    this.game();
  }
  get GatheringRoomGameStage(){
    return GatheringRoomGameStage;
  }
  currentState:GatheringRoomGameStage = GatheringRoomGameStage.IntroVideo;
  startNewIntro() {
    if (this.currentState == GatheringRoomGameStage.IntroVideoStarted) {
      document.exitFullscreen().then(() => { this.currentState = GatheringRoomGameStage.StartButton });
    }
    this.currentState = GatheringRoomGameStage.IntroVideoStarted;
    setTimeout(() => {
      const video = document.getElementById("newIntro") as HTMLVideoElement;;
      video?.requestFullscreen();
      video.play();
    }, 20);
  }


  game() {
 
    let isTimerStarted = false;
    let timerIsSet = false;
    setInterval(() => {
      this.teamService.GameStatus(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          this.gameStatus = e;
        }
      );
      // =====> Timer 
      let tmerNotSetAndGameStarted = (!timerIsSet && this.gameStatus != "Started");
      if (this.gameStatus != "NotStarted" || tmerNotSetAndGameStarted) {
        // Get Timer 
        this.teamService.RoomTime(this.gameUrl1, this.gameUrl).subscribe(
          time => {
            this.gameTotalTime = time;
            timerIsSet = true;
          }
        );
        this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
          e => {
            this.team = e;
          }
        );
      }

      if (this.gameStatus == "Started" && !isTimerStarted && timerIsSet) {
        this.startTimer();
        isTimerStarted = true;
        this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
          e => {
            this.team = e;
            this.totalScore = this.team.darkRoomScore + this.team.divingRoomScore + this.team.darkRoomScore
            + this.team.floorIsLavaRoomScore + this.team.fortRoomScore ;
          }
        );
        console.log("Time Started");
      }
      if (this.gameStatus == "Empty"){
        isTimerStarted =false;
        timerIsSet =false;
      }



    }, 1000);
  }
  startTimer() {
    let interval = setInterval(() => {
      if (this.gameTotalTime > 0)
        this.gameTotalTime--;

      this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          this.team = e;
          this.score = this.team.fortRoomScore;
          this.totalScore = this.team.total;
        }
      );
      // this.teamService.getScore(this.gameUrl1, this.gameUrl).subscribe(
      //   e => {
      //     this.score = e;
      //   }
      // );
      if (this.gameTotalTime == 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
