export class ScanData {
  info: string;
  type: string;

  constructor( text: string ) {
    this.type = 'no definido';
    this.info = text;

    if (text.startsWith('http')) { this.type = 'URL'; }
    else if ( text.startsWith('geo') ) { this.type = 'Mapa'; }
  }
}
