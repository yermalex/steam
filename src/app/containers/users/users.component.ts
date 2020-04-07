// import { GetUsers } from '../../store/actions/user.actions';
// import { Component, OnInit } from '@angular/core';
// import { Store, select } from '@ngrx/store';
//
// import { AppState } from '../../store/state/app.state';
// import { selectUserList } from '../../store/selectors/user.selector';
// import { Router } from '@angular/router';
//
// @Component({
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.css']
// })
// export class UsersComponent implements OnInit {
//   users$ = this._store.pipe(select(selectUserList));
//
//   constructor(private _store: Store<AppState>, private _router: Router) {}
//
//   ngOnInit() {
//     this._store.dispatch(new GetUsers());
//   }
//
//   navigateToUser(id: number) {
//     this._router.navigate(['user', id]);
//   }
// }
