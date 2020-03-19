import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../store/models/user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SteamService} from '../../services/steam.service';
import {genreEnum} from '../../data/gamesMockData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  isSingIn = true;

  singInForm: FormGroup;
  singUpForm: FormGroup;
  submitted = false;
  message: string;

  constructor(private steamService: SteamService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if ( params.loginAgain ) {
        this.message = 'Пожалуйста, войдите в систему!';
      }
    });

    this.singInForm = new FormGroup({
      singInEmail: new FormControl(null, [Validators.required, Validators.email]),
      singInPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.singUpForm = new FormGroup({
      singUpNickname: new FormControl(null, [Validators.required, Validators.pattern('^([A-Z,a-z,0-9]{1,})$')]),
      singUpEmail: new FormControl(null, [Validators.required, Validators.email]),
      singUpPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  singInSubmit() {
    if (this.singInForm.invalid) {
      return;
    }
    this.submitted = true;

    const user: IUser = {
      email: this.singInForm.value.singInEmail,
      password: this.singInForm.value.singInPassword
    };

    this.steamService.login(user);
    this.singInForm.reset();
    this.router.navigate(['/library']);
    this.submitted = false;
  }

  singUpSubmit() {
    if (this.singUpForm.invalid) {
      return;
    }
    this.submitted = true;

    const newUser: IUser = {
      id: this.steamService.getNextID(),
      nickname: this.singUpForm.value.singUpNickname,
      email: this.singUpForm.value.singUpEmail,
      password: this.singUpForm.value.singUpPassword,
      purchasedGames: []
    };
    this.steamService.registerNewUser(newUser);
    this.steamService.login(newUser);
    this.singUpForm.reset();
    this.router.navigate(['/library']);
    this.submitted = false;
  }

}
