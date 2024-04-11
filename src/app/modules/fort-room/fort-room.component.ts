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

  showStartGame = false;
  showTimerandScore = true;
  goToTheNextRoom = false;
  showLoading = false;
  teamName = "FromTheRoom"
  gameName = "Fort Room"
  gameUrl1 = "fort";
  gameUrl = "fortRoom";
  nextGame = "shooting";
  score = 0;
  gameTotalTime = 360;
  team: Team = { name: "--" };
  countdownSubscription!: Subscription;

  constructor(private teamService: TeamService) {
    this.game();
  }

  game() {
    var gameStatus = "Empty";
    let isTimerStarted = false;

    setInterval(() => {
      this.teamService.GameStatus(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          gameStatus = e;
          isTimerStarted = false;
        }
      );
    });
    // =====> Timer 
    if (gameStatus != "NotStarted") {
      // Get Timer 
      this.teamService.RoomTime(this.gameUrl1, this.gameUrl).subscribe(
        time => {
          this.gameTotalTime = time;
        }
      );
    }
    if (gameStatus != "Started" && !isTimerStarted) {
      this.startTimer();
      isTimerStarted = true;
    }

  }



  startTheGameV2() {
    // Get Team Info
    let isTimerStarted = false;
    var gameStatus = "Empty";

    setInterval(() => {
      // this.gameUrl1, this.gameUrl
      // Send Request To Get Room status 



      this.teamService.GameStatus(this.gameUrl1, this.gameUrl).subscribe(
        e => {
          gameStatus = e.toString();
          console.log(e)
          if (gameStatus == "NotStarted") {
            // Restart The Timer and the Game also get the Team Members
            this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
              e => {
                this.team = e;
                isTimerStarted = false;
              }
            );
            // this.startTimer();
          } else if (gameStatus == "Started" && !isTimerStarted) {
            this.startTimer();
            isTimerStarted = true;
          }
        }
      );





      console.log('ahmad');
    }, 3000);





    // this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
    //   e => {
    //     this.team = e;
    //     this.showStartGame = false;

    //     let interval = setInterval(() => {
    //       // Get Score
    //       this.teamService.isGameStarted().subscribe(
    //         e => {
    //           if (e)
    //             isGameStarted = true;
    //         }
    //       );
    //       if (isGameStarted) {
    //         this.startTimer();
    //         clearInterval(interval);
    //       }
    //     }, 1000);
    //   }
    // );
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
