import {Component, Input, OnInit} from '@angular/core';
import {IGame} from '../../../../interfaces/game';
import {SteamService} from '../../../../services/steam.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.less']
})
export class GameCardComponent implements OnInit {

    @Input() game: IGame;

    @Input() hasDiscount: boolean;

    constructor(private steamService: SteamService,
                private  route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
    }

    func(e: Event) {
      e.stopPropagation();
    }
}
