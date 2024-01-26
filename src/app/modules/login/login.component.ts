import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, switchMap } from 'rxjs';
import { Player } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'GatheringRoom';
  teamName = "";
  players: Player[] = [
    // { uid: "123456", firstName: "Ahmad", secoundName: "said" },
    // { uid: "123456", firstName: "Mohammad", secoundName: "said" },
    // { uid: "123456", firstName: "hassan", secoundName: "said" },
    // { uid: "123456", firstName: "Tariq", secoundName: "said" },
  ];

  constructor(private teamService: TeamService) {

  }
  ngOnInit(): void {
    interval(1000)
      .pipe(
        switchMap(() => this.teamService.getTeamMembers())
      )
      .subscribe(response => {
        let newplayers: Player[] = [];
        response.forEach(
          e => {
            let newPlayer: Player = {
              uid: e,
              firstName: e,
              secoundName: e

            };
            newplayers.push(newPlayer);

          }
        );
        this.players = newplayers;
        // Handle the response here
        console.log(response);
      });
  }
  // init Form 
  GoToTheNextRoom() {
    this.teamService.goToTheNextRoom().subscribe(

    );

  }

}
