import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }
  getTeamMembers(): Observable<any[]> {
    console.log("Send")
    return this.httpClient.get<any[]>('https://localhost:7248/GatheringRoom/getThePlayers');
  }
  goToTheNextRoom() {
    return this.httpClient.get('https://localhost:7248/GatheringRoom/GoToTheNextRoom');
  }
  isOccupied() {
    console.log("ISSend")
    return this.httpClient.get('https://foort.local:7248/api/FortRoom/IsOccupied');
  }
}
