import { Component, OnInit } from '@angular/core';
import {SteamService} from '../../services/steam.service';

@Component({
  selector: 'app-downloading',
  templateUrl: './downloading.component.html',
  styleUrls: ['./downloading.component.less']
})
export class DownloadingComponent {

  constructor(private steamService: SteamService) { }

}
