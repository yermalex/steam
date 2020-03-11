import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './views/shop/shop.component';
import { LibraryComponent } from './views/library/library.component';
import { LoginComponent } from './views/login/login.component';
import { GameComponent } from './views/game/game.component';
import { DownloadingComponent } from './views/downloading/downloading.component';
import { BuyFormComponent } from './views/buy-form/buy-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { HomeComponent } from './views/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {GameCardComponent} from './views/shop/components/game-card/game-card.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    LibraryComponent,
    LoginComponent,
    GameComponent,
    DownloadingComponent,
    BuyFormComponent,
    ErrorPageComponent,
    HomeComponent,
    GameCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
