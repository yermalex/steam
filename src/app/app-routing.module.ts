import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShopComponent} from './views/shop/shop.component';
import {LibraryComponent} from './views/library/library.component';
import {GameComponent} from './views/game/game.component';
import {LoginComponent} from './views/login/login.component';
import {BuyFormComponent} from './views/buy-form/buy-form.component';
import {ErrorPageComponent} from './views/error-page/error-page.component';
import {AuthGuard} from './services/guards/auth.guard';
import {HomeComponent} from './views/home/home.component';
import {AuthLoginGuard} from './services/guards/authLogin.guard';
import {PageNotFound} from './services/guards/pnf.guard';

// import { UsersComponent } from './containers/users/users.component';
// import { UserComponent } from './containers/user/user.component';


const routes: Routes = [
  // { path: 'users', component: UsersComponent },
  // { path: 'user/:id', component: UserComponent },

  {path: '', component: HomeComponent},
  {path: 'shop', component: ShopComponent, canActivateChild: [AuthGuard, PageNotFound], children: [
      {path: 'buy-form/:id', component: BuyFormComponent}
    ]},
  {path: 'library', component: LibraryComponent, canActivate: [AuthGuard]},
  {path: 'game/:id', component: GameComponent, canActivate: [PageNotFound], canActivateChild: [AuthGuard, PageNotFound], children: [
      {path: 'buy-form/:id', component: BuyFormComponent}
    ]},
  {path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard]},
  {path: 'error', component: ErrorPageComponent},
  // {path: '', redirectTo: '/shop', pathMatch: 'full'},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
