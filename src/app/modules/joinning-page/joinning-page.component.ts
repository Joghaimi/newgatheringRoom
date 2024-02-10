import { Component } from '@angular/core';
import { Player, Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, switchMap } from 'rxjs';
import { catchError, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-joinning-page',
  templateUrl: './joinning-page.component.html',
  styleUrls: ['./joinning-page.component.css']
})
export class JoinningPageComponent {
  inTeamStarting = true;
  teamNameing = false;
  loading = false;
  time = false;
  strockColor = "green"
  duration = 20;
  currentTime = 0;

  title = 'GatheringRoom';
  teamName = "Your Team Name";
  players: Player[] = [
    { id: "123456", firstName: "Ahmad", lastName: "said" },
    { id: "123456", firstName: "Mohammad", lastName: "said" },
    { id: "123456", firstName: "hassan", lastName: "said" },
    { id: "123456", firstName: "Tariq", lastName: "said" },
  ];

  constructor(private teamService: TeamService) {

  }
  ngOnInit(): void {

    // interval(1000)
    //   .pipe(
    //     switchMap(() => this.teamService.getTeamMembers().pipe(
    //       catchError(error => {
    //         console.error('Error in API call:', error);
    //         return []; // Return an empty array or any default value to continue the observable sequence
    //       })
    //     ))
    //   )
    //   .subscribe(response => {
    //     let newplayers: Player[] = [];
    //     response.forEach(
    //       e => {
    //         let newPlayer: Player = {
    //           uid: e.id,
    //           firstName: e.firstName,
    //           lastName: e.lastName
    //         };
    //         newplayers.push(newPlayer);
    //       }
    //     );
    //     this.players = newplayers;
    //     // Handle the response here
    //     console.log(response);
    //   });









    // interval(1000)
    //   .pipe(
    //     switchMap(() => this.teamService.getTeamMembers())
    //   )
    //   .subscribe(response => {
    //     let newplayers: Player[] = [];
    //     response.forEach(
    //       e => {
    //         let newPlayer: Player = {
    //           uid: e.id,
    //           firstName: e.firstName,
    //           lastName: e.lastName

    //         };
    //         newplayers.push(newPlayer);

    //       }
    //     );
    //     this.players = newplayers;
    //     // Handle the response here
    //     console.log(response);
    //   });
  }

  // Save Team Members 
  SaveTeamMembers() {
    this.inTeamStarting = false;
    this.teamNameing = true;
    this.teamService.isOccupied().subscribe(e => console.log(e));
  }
  SaveTeamName() {
    this.inTeamStarting = false;
    this.teamNameing = false;
    this.loading = true;
    let continueRequest = true; // Flag to control whether to continue the request

    let interval = setInterval(() => {

      this.teamService.isOccupied().subscribe(
        response => {
          if (!response) {
            console.log(response);
            clearInterval(interval);
          }
        }
      );
    }, 3000);


    // interval(3000)
    //   .pipe(
    //     switchMap(() => this.teamService.isOccupied()

    //     ),
    //     takeWhile(response => !response),

    //   )
    //   .subscribe(response => {
    //     if (!response) {
    //       continueRequest = false; // Stop further requests

    //       // Open Next Room Page 
    //       let team: Team = {
    //         name: this.teamName,
    //         player: this.players,
    //       }
    //       this.teamService.sendScoreToNextRoom(team).subscribe(
    //         e => {
    //           this.inTeamStarting = true;
    //           this.teamNameing = false;
    //           this.loading = false;
    //           return;
    //         }
    //       );
    //     }
    //     console.log(response);
    //   });




  }

  receiveTime($event: number) {
    this.currentTime = $event
  }

}
