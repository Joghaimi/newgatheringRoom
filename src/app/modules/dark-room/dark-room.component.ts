import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GatheringRoomGameStage, RoomGameStage, Team } from 'src/app/models/player';
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
  showLoading = false;
  teamName = "FromTheRoom"
  gameName = "Plus Minus Room"
  gameUrl1 = "dark";
  gameUrl = "darkRoom";
  nextGame = "floor";
  nextGame2 = "floorislava";
  score = 0;
  gameTotalTime = 360;
  team: Team = { name: "-----", darkRoomScore: 0, divingRoomScore: 0, floorIsLavaRoomScore: 0, fortRoomScore: 0, shootingRoomScore: 0, isAdult: true };
  countdownSubscription!: Subscription;
  get RoomGameStage() {
    return RoomGameStage;
  }
  currentState: RoomGameStage = RoomGameStage.Started;

  constructor(private teamService: TeamService) {
    this.game();
  }


  // startNewIntro() {
  //   if (this.currentState == GatheringRoomGameStage.IntroVideoStarted) {
  //     this.currentState = GatheringRoomGameStage.StartButton
  //   } else {
  //     this.currentState = GatheringRoomGameStage.IntroVideoStarted;

  //   }
  //   setTimeout(() => {
  //     const video = document.getElementById("newIntro") as HTMLVideoElement;;
  //     // video?.requestFullscreen();
  //     video.play();
  //   }, 20);
  // }
  startNewIntro() {
    const video = document.getElementById("newIntro") as HTMLVideoElement;
    if (video) { //
      video.play();
    }
  }
  hideVideo() {
    this.currentState = RoomGameStage.Started
    this.teamService.ChangeRoomStatus(this.gameUrl1, this.gameUrl,"InstructionAudioEnded").subscribe();;
  }


  game() {
    var gameStatus = "Empty";
    let isTimerStarted = false;
    let timerIsSet = false;
    setInterval(() => {
      this.teamService.GameStatus(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          gameStatus = e;
        }
      );
      if(gameStatus =="NotStarted"){
        this.currentState = RoomGameStage.NotStarted;
        this.startNewIntro();
        this.teamService.ChangeRoomStatus(this.gameUrl1, this.gameUrl,"InstructionAudioStarted").subscribe();;
      }

      // =====> Timer 
      let tmerNotSetAndGameStarted = (!timerIsSet && gameStatus != "Started");
      if (gameStatus != "NotStarted" || tmerNotSetAndGameStarted) {
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

      if (gameStatus == "Started" && !isTimerStarted && timerIsSet) {
        this.startTimer();
        isTimerStarted = true;
        this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
          e => {
            this.team = e;
          }
        );
        console.log("Time Started");
      }

      if (gameStatus == "Empty") {
        isTimerStarted = false;
        timerIsSet = false;
      }


    }, 1000);
  }
  startTimer() {
    // this.showTimerandScore = true
    let interval = setInterval(() => {
      // Get Score
      if (this.gameTotalTime > 0)
        this.gameTotalTime--;
      this.teamService.getScore(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          this.score = e;
        }
      );
      if (this.gameTotalTime == 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
