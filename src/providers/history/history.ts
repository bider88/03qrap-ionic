import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';

// Components
import { ToastController, ModalController } from 'ionic-angular';

// Plugins
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MapPage } from '../../pages/map/map';

@Injectable()
export class HistoryProvider {

  private _history: ScanData[] = [];

  constructor(
    private iab: InAppBrowser,
    private modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {}

  addHistory(text: string) {
    const data = new ScanData(text);

    this._history.unshift(data);

    console.log(this._history);

    this.openScan(0);
  }

  openScan(index: number = 0) {
    const scanData = this._history[index];
    console.log(scanData);

    switch (scanData.type) {
      case 'URL':
        this.iab.create( scanData.info, '_system' );
      break;
      case 'Mapa':
        this.modalCtrl.create(MapPage, { coords: scanData.info }).present();
      break;
      default:
        this.presentToast('Info: Tipo no soportado');
    }
  }

  load_history() {
    return this._history;
  }


  presentToast(message: string = '') {
    const toast = this.toastCtrl.create({
      message,
      duration: 2500
    });
    toast.present();
  }

}
