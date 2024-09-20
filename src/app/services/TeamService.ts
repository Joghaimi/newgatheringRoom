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
    // return this.httpClient.get<any[]>('https://gathering.local:7248/GatheringRoom/getThePlayers');
    return this.httpClient.get<any[]>('http://gathering.local:5000/GatheringRoom/getThePlayers');
  }
  clearGatheringRoomMember() {
    // return this.httpClient.get('https://gathering.local:7248/GatheringRoom/GoToTheNextRoom');
    return this.httpClient.get('http://gathering.local:5000/GatheringRoom/GoToTheNextRoom');
  }

  sendScoreToNextRoom(team: Team) {
    // return this.httpClient.post('https://fort.local:7248/api/FortRoom/ReceiveScore', team);
    return this.httpClient.post('http://fort.local:5000/api/FortRoom/ReceiveScore', team);
  }
  isOccupied() {
    // return this.httpClient.get('https://fort.local:7248/api/FortRoom/IsOccupied');
    return this.httpClient.get('http://fort.local:5000/api/FortRoom/IsOccupied');
  }


  isOccupiedByName(roomName: string) {
    // return this.httpClient.get('https://' + roomName + '.local:7248/api/' + roomName + '/IsOccupied');
    return this.httpClient.get('http://' + roomName + '.local:5000/api/' + roomName + '/IsOccupied');
  }
  isOccupiedByName2(roomName: string, roomName2: string) {
    // return this.httpClient.get('https://' + roomName + '.local:7248/api/' + roomName2 + '/IsOccupied');
    return this.httpClient.get('http://' + roomName + '.local:5000/api/' + roomName2 + '/IsOccupied');
  }
  sendScoreToNextRoomByName(roomName: string, team: Team) {
    // return this.httpClient.post('https://' + roomName + '.local:7248/api/' + roomName + '/ReceiveScore', team);
    return this.httpClient.post('http://' + roomName + '.local:5000/api/' + roomName + '/ReceiveScore', team);
  }
  sendScoreToNextRoomByName2(roomName: string, roomName2: string, team: Team) {
    // return this.httpClient.post('https://' + roomName + '.local:7248/api/' + roomName2 + '/ReceiveScore', team);
    return this.httpClient.post('http://' + roomName + '.local:5000/api/' + roomName2 + '/ReceiveScore', team);
  }
  startTheGame(roomName1: string, roomName: string) {
    // return this.httpClient.post('https://' + roomName1 + '.local:7248/api/' + roomName + '/StartStopGame?startGame=true', true);
    return this.httpClient.post('http://' + roomName1 + '.local:5000/api/' + roomName + '/StartStopGame?startGame=true', true);
  }
  getTeamMembersAndScore(roomName1: string, roomName: string): Observable<any> {
    // return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/ReturnScore');
    return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/ReturnScore');
  }
  getScore(roomName1: string, roomName: string): Observable<any> {
    // return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/GetScore');
    return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/GetScore');
  }
  isGameStarted() {
    return this.httpClient.get('https://fort.local:7248/api/FortRoom/IsGameStarted');
  }

  GameStatus(roomName1: string, roomName: string) {
    return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/RoomStatus', { responseType: 'text' });
  }
  ChangeRoomStatus(roomName1: string, roomName: string, roomStatus: string): Observable<any> {
    return this.httpClient.post('http://' + roomName1 + '.local:5000/api/' + roomName + '/RoomStatus?gameStatus=' + roomStatus, roomStatus);
  }
  RoomTime(roomName1: string, roomName: string) {
    // return this.httpClient.get<number>('https://' + roomName1 + '.local:7248/api/' + roomName + '/CurrentTime');
    return this.httpClient.get<number>('http://' + roomName1 + '.local:5000/api/' + roomName + '/CurrentTime');
  }


  getRound(roomName1: string, roomName: string): Observable<any> {
    // return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/GetRoundNumber');
    return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/GetRoundNumber');
  }
}
