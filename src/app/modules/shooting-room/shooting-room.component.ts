import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GatheringRoomGameStage, Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-shooting-room',
  templateUrl: './shooting-room.component.html',
  styleUrls: ['./shooting-room.component.css']
})
export class ShootingRoomComponent {
  showStartGame = false;
  showTimerandScore = true;
  goToTheNextRoom = false;
  showLoading = false;
  teamName = "FromTheRoom"
  gameName = "Shooting Room"
  gameUrl1 = "Shooting";
  gameUrl = "Shooting";
  nextGame = "diving";
  score = 0;
  gameTotalTime = 360;
  team: Team = { name: "-----", darkRoomScore: 0, divingRoomScore: 0, floorIsLavaRoomScore: 0, fortRoomScore: 0, shootingRoomScore: 0, isAdult: true };
  countdownSubscription!: Subscription;
  roundNumber = 0;
  requiredScore = 0;
  roundScore = 0;
  currentState:GatheringRoomGameStage = GatheringRoomGameStage.IntroVideo;

  get GatheringRoomGameStage(){
    return GatheringRoomGameStage;
  }
  constructor(private teamService: TeamService) {
    this.game();
  }
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
  hideIntroVideo() {
    document.exitFullscreen().then(() => { this.currentState = GatheringRoomGameStage.StartButton });
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

  // startTheGameV2() {
  //   // Get Team Info
  //   let isTimerStarted = false;
  //   var gameStatus = "Empty";

  //   setInterval(() => {
  //     // this.gameUrl1, this.gameUrl
  //     this.teamService.GameStatus(this.gameUrl1, this.gameUrl).subscribe(
  //       e => {
  //         gameStatus = e.toString();
  //         console.log(e)
  //         if (gameStatus == "NotStarted") {
  //           // Restart The Timer and the Game also get the Team Members
  //           this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
  //             e => {
  //               this.team = e;
  //               isTimerStarted = false;
  //             }
  //           );
  //           // this.startTimer();
  //         } else if (gameStatus == "Started" && !isTimerStarted) {
  //           this.startTimer();
  //           isTimerStarted = true;
  //         }
  //       }
  //     );
  //     console.log('ahmad');
  //   }, 3000);
  // }



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
      if (this.gameTotalTime > 0)
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
        // this.showTimerandScore = false;
        // this.goToTheNextRoom = true;
        clearInterval(interval);
      }
    }, 1000);
  }


  mapRoundToScore(round: number) {
    if (round == 0) {
      this.requiredScore = 5
    }
    else if (round == 1) {
      this.requiredScore = 100
    } else if (round == 2) {
      this.requiredScore = 80
    } else if (round == 3) {
      this.requiredScore = 60
    } else if (round == 4) {
      this.requiredScore = 40
    } else if (round == 5) {
      this.requiredScore = 150
    }
  }


}
