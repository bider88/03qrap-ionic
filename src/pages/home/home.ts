import { Component } from '@angular/core';

// Components
import { ToastController, Platform } from 'ionic-angular';

// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HistoryProvider } from '../../providers/history/history';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private platform: Platform,
    private _historyProvider: HistoryProvider,
    public toastCtrl: ToastController
  ) { }

  scan() {

    console.log('Realizando scan...');

    if (!this.platform.is('cordova')) {
      // this._historyProvider.addHistory('https://www.google.com.mx');
      this._historyProvider.addHistory('geo:19.055737,-98.12501329999998');
      return;
    }

    this.barcodeScanner.scan()
      .then(barcodeData => {

        console.log('Barcode data', barcodeData);
        console.log('text: ' + barcodeData.text);
        console.log('Format: ' + barcodeData.format);
        console.log('Cancelled: ' + barcodeData.cancelled);

        if ( !barcodeData.cancelled && barcodeData.text !== null ) {
          this._historyProvider.addHistory( barcodeData.text );
        }

      }).catch(err => {
        console.log('Error', err);
        this.presentToast(`Error: ${err}`);
      });
  }

  presentToast(message: string = '') {
    const toast = this.toastCtrl.create({
      message,
      duration: 2500
    });
    toast.present();
  }

}
