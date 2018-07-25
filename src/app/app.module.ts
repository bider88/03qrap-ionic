import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { apiKey } from './apiKey';

// Map
import { AgmCoreModule } from '@agm/core';

// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import {
  HomePage,
  HistoryPage,
  MapPage,
  TabsPage,
  AboutPage
} from '../pages/index.pages'

import { HistoryProvider } from '../providers/history/history';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoryPage,
    MapPage,
    TabsPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot( apiKey )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoryPage,
    MapPage,
    TabsPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistoryProvider,
    BarcodeScanner,
    InAppBrowser,
    Contacts,
    EmailComposer
  ]
})
export class AppModule {}
