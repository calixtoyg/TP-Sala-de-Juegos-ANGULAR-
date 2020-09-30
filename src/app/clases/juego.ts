export abstract class Juego {
  public nombre = 'Sin Nombre';
  public jugador: string;
  public gano = false;
  public gameType: string;

  constructor(nombre?: string, gano?: boolean, jugador?: string, gameType?: string) {
    if (nombre) {
      this.nombre = nombre;
    }

    if (gano) {
      this.gano = gano;
    }
    if (jugador) {
      this.jugador = jugador;
    }
    if (gameType) {
      this.gameType = gameType;
    }
    else {
      this.jugador = 'natalia natalia';
    }
  }




  public abstract verificar(): boolean;

  public retornarAyuda() {

    return 'NO hay Ayuda definida';
  }
}
