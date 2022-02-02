import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { environment } from '@env/environment';
import { RouteReusableStrategy, ApiPrefixInterceptor, ErrorHandlerInterceptor, SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { SettingsModule } from './settings/settings.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBFGP5urpknFbWfL_yX56458UroEllq2AA',
      authDomain: 'employeecontrol-ef7e3.firebaseapp.com',
      databaseURL: 'https://employeecontrol-ef7e3.firebaseio.com',
      projectId: 'employeecontrol-ef7e3',
      storageBucket: 'employeecontrol-ef7e3.appspot.com',
      messagingSenderId: '873250604398',
      appId: '1:873250604398:web:00a9ae756323ea74d8ed7f',
    }),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot(),
    SharedModule,
    ShellModule,
    HomeModule,
    SettingsModule,
    AuthModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
