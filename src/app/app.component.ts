import { Component } from '@angular/core';
import {SteamService} from './services/steam.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private steamService: SteamService,
              private router: Router) {
  }

}

// import { Component, OnInit } from '@angular/core';
// import { Store, select } from '@ngrx/store';
//
// import { AppState } from './store/state/app.state';
// import { GetConfig } from './store/actions/config.actions';
// import { selectConfig } from './store/selectors/config.selectors';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.less']
// })
// export class AppComponent implements OnInit {
//   title = 'angular-ngrx';
//   config$ = this._store.pipe(select(selectConfig));
//
//   constructor(private _store: Store<AppState>) {}
//
//   ngOnInit() {
//     this._store.dispatch(new GetConfig());
//   }
// }
