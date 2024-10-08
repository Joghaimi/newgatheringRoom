import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GatheringRoomGameStage, RoomGameStage, Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-diving-room',
  templateUrl: './diving-room.component.html',
  styleUrls: ['./diving-room.component.css']
})
export class DivingRoomComponent {

  showStartGame = false;
  showTimerandScore = true;
  goToTheNextRoom = false;
  showLoading = false;
  teamName = "FromTheRoom"
  gameName = "Diving Room"
  gameUrl1 = "diving";
  gameUrl = "diving";
  nextGame = "dark";
  nextGame2 = "darkRoom";
  score = 0;
  gameTotalTime = 360;
  team: Team = { name: "-----", darkRoomScore: 0, divingRoomScore: 0, floorIsLavaRoomScore: 0, fortRoomScore: 0, shootingRoomScore: 0 ,isAdult:true};
  countdownSubscription!: Subscription;

  currentState: RoomGameStage = RoomGameStage.Started;

  get RoomGameStage(){
    return RoomGameStage;
  }

  
  // startNewIntro() {
  //   if (this.currentState == GatheringRoomGameStage.IntroVideoStarted) {
  //     document.exitFullscreen().then(() => { this.currentState = GatheringRoomGameStage.StartButton });
  //   }
  //   this.currentState = GatheringRoomGameStage.IntroVideoStarted;
  //   setTimeout(() => {
  //     const video = document.getElementById("newIntro") as HTMLVideoElement;;
  //     video?.requestFullscreen();
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



  constructor(private teamService: TeamService) {
    this.game();
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
      if (gameStatus == "Empty"){
        isTimerStarted =false;
        timerIsSet =false;
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

  // startTheGame() {
  //   // Get Team Info
  //   this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
  //     e => {
  //       this.team = e;
  //       this.showStartGame = false;
  //       this.teamService.startTheGame(this.gameUrl1, this.gameUrl).subscribe(
  //         e => {
  //           this.startTimer();
  //         }
  //       );
  //     }
  //   );
  // }
  // GoToTheNextRoom() {
  //   // Restart The Game
  //   this.gameTotalTime = 360;
  //   this.goToTheNextRoom = false;
  //   this.showLoading = true;
  //   let interval = setInterval(() => {
  //     this.teamService.isOccupiedByName2(this.nextGame, this.nextGame2).subscribe(
  //       response => {
  //         if (!response) {
  //           this.teamService.sendScoreToNextRoomByName2(this.nextGame, this.nextGame2, this.team).subscribe(
  //             e => {
  //               this.showLoading = false;
  //               this.showStartGame = true;
  //               clearInterval(interval);
  //             }
  //           );
  //         }
  //       }
  //     );
  //   }, 3000);
  // }



  startTimer() {
    // this.showTimerandScore = true
    let interval = setInterval(() => {
      if (this.gameTotalTime > 0)
        this.gameTotalTime--;
      // Get Score

      this.teamService.getScore(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          this.score = e;
        }
      );


      if (this.gameTotalTime == 0) {
        // this.showTimerandScore = false;
        // this.goToTheNextRoom = true;
        clearInterval(interval);
      }
    }, 1000);
  }


  // startTimer() {
  //   this.showTimerandScore = true
  //   let interval = setInterval(() => {
  //     this.teamService.getScore(this.gameUrl1, this.gameUrl).subscribe(
  //       e => {
  //         this.score = e;
  //       }
  //     );
  //     this.gameTotalTime--;
  //     if (this.gameTotalTime == 0) {
  //       this.showTimerandScore = false;
  //       this.goToTheNextRoom = true;
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  // }
}
