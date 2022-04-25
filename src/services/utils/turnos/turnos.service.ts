import { Injectable } from '@nestjs/common';

@Injectable()
export class TurnosService {
  turnos: any[] = [];
  mytiket = {
    id: 0,
    name: '',
  };

  async turnero(data) {
    try {
      this.turnos.push(data);
      const turno = this.turnos.length;

      const turno_asesora = {
        1: 7,
        2: 8,
        3: 9,
        4: 10,
        5: 12,
      };

      const name_asesora = {
        7: 'luz López',
        8: 'Paola Avendaño',
        9: 'Julieth Rojas',
        10: 'Marisol Avendaño',
        12: 'Paula Cuervo',
      };

      const turnoPara = await turno_asesora[turno];
      const tiketCreate = {
        id: turnoPara,
        name: await name_asesora[turnoPara],
      };

      if (turno < 5) {
        console.log('log 1: ', turno);
        console.log('log 2: ', tiketCreate);
        this.mytiket = tiketCreate;
        // return tiket;
      } else {
        console.log('log 5: inicio ESE ', turno);
        console.log('log 6: ', tiketCreate);
        this.mytiket = tiketCreate;
        this.turnos = [];
        // return ''
      }
      return this.mytiket;
    } catch (err) {
      console.error('***ERROR: ', err.message);
    }
  }
}
