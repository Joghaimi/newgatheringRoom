import { Component, ViewEncapsulation } from "@angular/core";
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'XO Game';
  value = "";
  isItGatheringRoom = true;
  isItFortRoom = false;
  isItShootingRoom = false;
  isItDivingRoom = false;
  isItDarkRoom = false;
  isItFloorIsLavaRoom = false;
}
