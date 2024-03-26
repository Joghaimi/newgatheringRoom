import { Component } from '@angular/core';
import { Player, Team } from 'src/app/models/player';
import { TeamService } from 'src/app/services/TeamService';

@Component({
  selector: 'app-next-room',
  templateUrl: './next-room.component.html',
  styleUrls: ['./next-room.component.css']
})
export class NextRoomComponent {
  loading = false;
  startTheGame=false;
  teamName = "Enter Your Team Name";
  players: Player[] = [
    // { firstName: "ahmad", lastName: "said" },
    // { firstName: "ahmad", lastName: "said" },
    // { firstName: "ahmad", lastName: "said" },
    // { firstName: "ahmad", lastName: "said" },
  ];
  constructor(private teamService: TeamService) {

  }
  goToNextRoom() {
    this.loading = true;
    let interval = setInterval(() => {
      this.teamService.isOccupiedByName("shooting").subscribe(
        response => {
          if (!response) {
            let team: Team = {
              name: this.teamName,
              player: this.players,
            }
            this.teamService.sendScoreToNextRoomByName("shooting",team).subscribe(
              e => {
                this.loading = false;
                this.startTheGame=true;
                // To Do
                // this.teamService.clearGatheringRoomMember().subscribe(
                //   res => {
                //     this.teamName = "Enter Your Team Name";
                //   }
                // );
                clearInterval(interval);
              }
            );
          }
        }
      );
    }, 3000);

  }
  startTheGamefn(){
    // this.teamService.startTheGame("shooting").subscribe(
    //   e=>{
    //     this.startTheGame=false;
    //   }
    // );
  }

}
