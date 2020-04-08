import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../store/models/user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SteamService} from '../../services/steam.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {AddUser} from '../../store/actions/user.actions';
import {selectGameList} from '../../store/selectors/game.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  isSignIn = true;

  signInForm: FormGroup;
  signUpForm: FormGroup;
  submitted = false;
  message: string;

  constructor(private steamService: SteamService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if ( params.loginAgain ) {
        this.message = 'Пожалуйста, войдите в систему!';
      }
    });

    this.signInForm = new FormGroup({
      singInEmail: new FormControl(null, [Validators.required, Validators.email]),
      singInPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.signUpForm = new FormGroup({
      singUpNickname: new FormControl(null, [Validators.required, Validators.pattern('^([A-Z,a-z,0-9]{1,})$')]),
      singUpEmail: new FormControl(null, [Validators.required, Validators.email]),
      singUpPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  singInSubmit() {
    if (this.signInForm.invalid) {
      return;
    }
    this.submitted = true;

    const singInUser: IUser = {
      email: this.signInForm.value.singInEmail,
      password: this.signInForm.value.singInPassword
    };

    this.steamService.login(singInUser);
    this.signInForm.reset();
    this.router.navigate(['/library']);
    this.submitted = false;
  }

  singUpSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.submitted = true;

    const newUser: IUser = {
      id: null,
      nickname: this.signUpForm.value.singUpNickname,
      email: this.signUpForm.value.singUpEmail,
      password: this.signUpForm.value.singUpPassword,
      purchasedGames: []
    };
    this.store.pipe(select(selectGameList)).subscribe((games) => newUser.id = games.length.toString());

    this.store.dispatch(new AddUser(newUser));
    this.steamService.login(newUser);
    this.signUpForm.reset();
    this.router.navigate(['/library']);
    this.submitted = false;
  }



}
