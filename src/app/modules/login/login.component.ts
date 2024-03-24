import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, switchMap } from 'rxjs';
import { Player } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { NgModule } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'GatheringRoom';
  teamName = "";
  players: Player[] = [
    {firstName:"ahmad", lastName:"said"},
    {firstName:"ahmad", lastName:"said"},
    {firstName:"ahmad", lastName:"said"},
    {firstName:"ahmad", lastName:"said"},
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
  // init Form 
  GoToTheNextRoom() {
    alert("test");
    // this.teamService.goToTheNextRoom().subscribe();
  }

}
