import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SteamService} from '../../services/steam.service';
import {IGame} from '../../interfaces/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})

export class GameComponent implements OnInit {

  game: IGame;

  constructor(private route: ActivatedRoute,
              private steamService: SteamService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.game = this.steamService.getGameByID(params.id);
    });
  }
}
