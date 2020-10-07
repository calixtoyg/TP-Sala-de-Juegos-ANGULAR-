export class JuegoAgilidad {
  numeroIngresado: number;
  segundoNumeroIngresado: number;
  gano: boolean;
  operator: string;
  respuesta: number;

  constructor() {
    this.numeroIngresado = JuegoAgilidad.randomIntFromInterval(0, 100);
    const possibleOperators = ['/', '*', '+', '-'];
    this.operator = possibleOperators[JuegoAgilidad.randomIntFromInterval(0, 3)];
    this.segundoNumeroIngresado = this.operator === '/' ? JuegoAgilidad.randomIntFromInterval(1, 100) : JuegoAgilidad.randomIntFromInterval(0, 100);
    this.respuesta = 0;
  }


  public static randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
