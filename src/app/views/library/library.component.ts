import { Component, OnInit } from '@angular/core';
import {SteamService} from '../../services/steam.service';
import {genreEnum} from '../../data/gamesMockData';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less']
})
export class LibraryComponent implements OnInit {

  readonly genre: typeof genreEnum = genreEnum;

  constructor(private steamService: SteamService,
              private  route: ActivatedRoute) {
  }

  ngOnInit() {
    this.steamService.titleForShopSearch = '';

    this.route.queryParams.subscribe((params: Params) => {
      if (params.filtrationBy) {
        this.steamService.genreForLibFilter = params.filtrationBy;
        this.steamService.filterByLibGenre();
      }
      if (params.searchBy) {
        this.steamService.titleForLibSearch = params.searchBy;
      }
    });
  }

}
