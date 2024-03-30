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
  clearGatheringRoomMember() {
    return this.httpClient.get('https://gathering.local:7248/GatheringRoom/GoToTheNextRoom');
  }
  // sendTeamInfo(){
  //   return this.httpClient.get('https://fort.local:7248/api/FortRoom/IsOccupied');
  // }
  sendScoreToNextRoom(team: Team) {
    return this.httpClient.post('https://fort.local:7248/api/FortRoom/ReceiveScore', team);
  }
  isOccupied() {
    return this.httpClient.get('https://fort.local:7248/api/FortRoom/IsOccupied');
  }


  isOccupiedByName(roomName: string) {
    return this.httpClient.get('https://' + roomName + '.local:7248/api/' + roomName + '/IsOccupied');
  }
  isOccupiedByName2(roomName: string ,roomName2: string) {
    return this.httpClient.get('https://' + roomName + '.local:7248/api/' + roomName2 + '/IsOccupied');
  }
  sendScoreToNextRoomByName(roomName: string, team: Team) {
    return this.httpClient.post('https://' + roomName + '.local:7248/api/' + roomName + '/ReceiveScore', team);
  }
  sendScoreToNextRoomByName2(roomName: string,roomName2: string, team: Team) {
    return this.httpClient.post('https://' + roomName + '.local:7248/api/' + roomName2 + '/ReceiveScore', team);
  }
  startTheGame(roomName1:string ,roomName: string) {
    return this.httpClient.post('https://' + roomName1 + '.local:7248/api/' + roomName + '/StartStopGame?startGame=true', true);
  }
  getTeamMembersAndScore(roomName1:string ,roomName: string): Observable<any> {
    return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/ReturnScore');
  }
  getScore(roomName1:string ,roomName: string): Observable<any> {
    return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/GetScore');
  }
  getRound(roomName1:string ,roomName: string): Observable<any> {
    return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/GetRoundNumber');
  }
}
