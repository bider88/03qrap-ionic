import { Component } from '@angular/core';
import { HomePage, HistoryPage } from '../index.pages';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any = HomePage;
  tab2: any = HistoryPage;

  constructor() {
  }

}
