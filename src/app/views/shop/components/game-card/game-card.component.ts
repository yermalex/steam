import {Component, Input, OnInit} from '@angular/core';
import {IGame} from '../../../../interfaces/game';
import {SteamService} from '../../../../services/steam.service';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.less']
})
export class GameCardComponent implements OnInit {

    @Input() game: IGame;

    @Input() hasDiscount: boolean;

    constructor(private steamService: SteamService) {
    }

    ngOnInit() {

      if (this.hasDiscount && this.steamService.discountFlag) {
        this.steamService.newPrice = this.game.price;
        this.game.price = Math.floor(this.game.price * (1 - this.steamService.getRandom(1, 10) / 100));
        this.steamService.discountFlag = false;
      }
    }

}
