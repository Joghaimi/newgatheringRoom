import { Component } from '@angular/core';
import { Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';

@Component({
  selector: 'app-room-senario',
  templateUrl: './room-senario.component.html',
  styleUrls: ['./room-senario.component.css']
})
export class RoomSenarioComponent {
  isGameStarted = false;
  isGameFinished = false;
  teamName = "FromTheRoom"
  gameName = "Game Name"
  gameUrl = "fortRoom";
  score = 10;
  team:Team={name:"Team Name"};
  constructor(private teamService: TeamService) {

  }
  startTheGame() {
    // Get Team Info
    this.teamService.getTeamMembersAndScore(this.gameUrl).subscribe(
      e => {
        this.team =e;
        this.isGameStarted=true;
      }
    );
  }
  GoToTheNextRoom() {

  }
}
