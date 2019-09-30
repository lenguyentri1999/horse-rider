import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { DbService } from './services/db.service';
import { ReviewService } from './services/review.service';

import { HttpClientModule } from '@angular/common/http';
import { TabsPageModule } from './pages/tabs/tabs.module';
import { RegisterPage } from './pages/register/register.page';
import { RegisterPageModule } from './pages/register/register.module';
import { LoginPageModule } from './pages/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    TabsPageModule,
    RegisterPageModule,
    LoginPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DbService,
    ReviewService,
  ],
  bootstrap: [AppComponent],
  exports: [
    // StarRating,
  ]
})
export class AppModule { }
