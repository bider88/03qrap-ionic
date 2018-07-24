import { Component } from '@angular/core';
import { HistoryProvider } from '../../providers/history/history';
import { ScanData } from '../../models/scan-data.model';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  history: ScanData[] = [];

  constructor(
    private _historyProvider: HistoryProvider
  ) {}

  ionViewDidLoad() {
    this.history = this._historyProvider.load_history();
  }

  openScan(i: number) {
    this._historyProvider.openScan(i);
  }

}
