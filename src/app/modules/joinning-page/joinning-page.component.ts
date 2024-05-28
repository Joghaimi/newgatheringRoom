import { Component } from '@angular/core';
import { Player, Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, switchMap, Subject } from 'rxjs';
import { catchError, takeWhile } from 'rxjs/operators';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-joinning-page',
  templateUrl: './joinning-page.component.html',
  styleUrls: ['./joinning-page.component.css']
})
export class JoinningPageComponent {
  score = 0;
  showIntro = true;
  showVedio = false;
  inTeamStarting = false;
  teamNameing = false;
  loading = false;
  time = false;
  strockColor = "green"
  duration = 20;
  currentTime = 0;
  keyboard!: Keyboard;
  title = 'GatheringRoom';
  teamName = "Enter Your Team Name";
  players: Player[] = [
    // { firstName: "ahmad", lastName: "said" },
    // { firstName: "ahmad", lastName: "said" },
    // { firstName: "ahmad", lastName: "said" },
    // { firstName: "ahmad", lastName: "said" },
  ];
  private stopInterval$ = new Subject<void>();

  constructor(private teamService: TeamService) {

  }
  ngOnInit(): void {
    // if (this.inTeamStarting) {
    interval(1000)
      .pipe(
        switchMap(() => this.teamService.getTeamMembers().pipe(
          catchError(error => {
            console.error('Error in API call:', error);
            return []; // Return an empty array or any default value to continue the observable sequence
          })
        ))
      )
      .subscribe(response => {
        let newplayers: Player[] = [];
        response.forEach(
          e => {
            let newPlayer: Player = {
              id: e.id,
              firstName: e.firstName,
              lastName: e.lastName,
              mobileNumber:e.mobileNumber
            };
            newplayers.push(newPlayer);
          }
        );
        this.players = newplayers;
      });
  }

  startIntro() {
    this.showVedio = true;
    setTimeout(() => {
      const video = document.getElementById("video") as HTMLVideoElement;;
      video?.requestFullscreen();
      video.play();
    }, 20);
  }
  hideVideo() {
    this.showVedio = false;
    this.showIntro = false;
    this.inTeamStarting = true;
  }

  // Save Team Members 
  SaveTeamMembers() {
    this.inTeamStarting = false;
    this.teamNameing = true;
    this.stopInterval$.next();
    this.stopInterval$.complete();
    this.teamName = "Enter Your Team Name";

  }
  SaveTeamName() {
    this.inTeamStarting = false;
    this.teamNameing = false;
    this.loading = true;
    let interval = setInterval(() => {
      this.teamService.isOccupied().subscribe(
        response => {
          if (!response) {
            let team: Team = {
              name: this.teamName,
              player: this.players,
              darkRoomScore: 0,
              divingRoomScore: 0,
              floorIsLavaRoomScore: 0,
              fortRoomScore: 0,
              shootingRoomScore: 0
            }

            this.teamService.sendScoreToNextRoom(team).subscribe(
              e => {
                this.showIntro = true;
                // this.inTeamStarting = true;
                this.teamNameing = false;
                this.loading = false;
                this.teamName = "Enter Your Team Name";

                this.teamService.clearGatheringRoomMember().subscribe(
                  res => {
                    this.teamName = "Enter Your Team Name";
                  }
                );
                clearInterval(interval);
              }
            );
          }
        }
      );
    }, 3000);
  }








  receiveTime($event: number) {
    this.currentTime = $event
  }


  // === Keyboard
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.teamName = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
}
