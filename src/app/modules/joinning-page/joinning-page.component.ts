import { Component } from '@angular/core';
import { Player } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { interval, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-joinning-page',
  templateUrl: './joinning-page.component.html',
  styleUrls: ['./joinning-page.component.css']
})
export class JoinningPageComponent {
  inTeamStarting = false;
  teamNameing = false;
  strockColor="green"
  duration=20;
  currentTime =0;

  title = 'GatheringRoom';
  teamName = "Your Team Name";
  players: Player[] = [
    { uid: "123456", firstName: "Ahmad", lastName: "said" },
    { uid: "123456", firstName: "Mohammad", lastName: "said" },
    { uid: "123456", firstName: "hassan", lastName: "said" },
    { uid: "123456", firstName: "Tariq", lastName: "said" },
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
  }

  // init Form 
  GoToTheNextRoom() {
    this.teamService.goToTheNextRoom().subscribe();
  }
  receiveTime($event: number){
    this.currentTime =$event
  }

}
