export class ScanData {
  info: string;
  type: string;

  constructor( text: string ) {
    this.type = 'no definido';
    this.info = text;

    if (text.startsWith('http')) { this.type = 'URL'; }
    else if ( text.startsWith('geo') ) { this.type = 'Mapa'; }
    else if ( text.startsWith('BEGIN:VCARD') ) { this.type = 'Contacto'; }
    else if ( text.startsWith('MATMSG') ) { this.type = 'Email'; }
  }
}
