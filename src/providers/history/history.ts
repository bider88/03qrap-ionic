import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';

// Components
import { ToastController, ModalController, Platform } from 'ionic-angular';
import { MapPage } from '../../pages/map/map';

// Plugins
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class HistoryProvider {

  private _history: ScanData[] = [];

  constructor(
    private iab: InAppBrowser,
    private modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private contacts: Contacts,
    private emailComposer: EmailComposer,
    private _platform: Platform
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
      case 'Contacto':
        this.createContact(scanData.info);
      break;
      case 'Email':
        this.sendEmail(scanData.info);
      break;
      default:
        this.presentToast('Info: Tipo no soportado');
    }
  }

  private sendEmail(text: string) {

    const data = this.getDataEmail(text);

    console.log(data);

    if ( !this._platform.is('cordova') ) {
      this.presentToast('Modo desktop: Email no enviado');
      return;
    }

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        this.presentToast(`Email enviado a `);
      } else {
        this.presentToast('Email no fue enviado');
      }
     });

     let email = {
       to: data.to,
       cc: '',
       bcc: [],
       attachments: [],
       subject: data.subject,
       body: data.body,
       isHtml: false
     };

     // Send a text message using default options
     this.emailComposer.open(email);
  }

  private getDataEmail(data: string) {
    const temp = data.slice(7, -2).split(';');
    const to = temp[0].slice(3);
    const subject = temp[1].slice(4);
    const body = temp[2].slice(5);

    return {
      to,
      subject,
      body
    };
  }

  private createContact(text: string) {

    let fields: any = this.parse_vcard(text);

    console.log(fields);

    const name = fields.fn;
    const tel  = fields.tel[0].value[0];

    if ( !this._platform.is('cordova') ) {
      this.presentToast('Modo desktop: Contacto no creado');
      return;
    }

    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, name);
    contact.phoneNumbers = [ new ContactField('mobile', tel) ];

    contact.save()
      .then(() => this.presentToast(`Contacto ${name} creado`) )
      .catch(err => this.presentToast(`Error: ${err}`) );

    // const tel = fields.tel;

  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
  };

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
