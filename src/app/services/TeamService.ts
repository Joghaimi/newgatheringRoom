import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }
  getTeamMembers(): Observable<any[]> {
    return this.httpClient.get<any[]>('https://gathering.local:7248/GatheringRoom/getThePlayers');
  }
  clearGatheringRoomMember(){
    return this.httpClient.get('https://gathering.local:7248/api/GatheringRoom/GoToTheNextRoom');
  }
  // sendTeamInfo(){
  //   return this.httpClient.get('https://fort.local:7248/api/FortRoom/IsOccupied');
  // }
  sendScoreToNextRoom(team:Team) {
    return this.httpClient.post('https://fort.local:7248/api/FortRoom/ReceiveScore',team);
  }
  isOccupied() {
    return this.httpClient.get('https://fort.local:7248/api/FortRoom/IsOccupied');
  }
}
