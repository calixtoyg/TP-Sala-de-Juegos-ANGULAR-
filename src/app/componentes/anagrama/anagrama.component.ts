import {Component, OnInit} from '@angular/core';
import {JuegoImpl} from '../../clases/juego-impl';
import {JuegoServiceService} from '../../servicios/juego-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  palabra: string;
  randomlyChoosenLetters: string;
  private words: Array<string>;
  actualWord: string;
  randomizedWord: string;

  constructor(private juegoServiceService: JuegoServiceService, private router: Router) {
    console.log();
  }

  ngOnInit() {
    this.randomWord();
  }

  randomWord() {
    this.words = ['mundo', 'hola', 'pino', 'pereza', 'silencio', 'orden', 'progreso', 'profesor', 'alumno', 'gato', 'madre', 'padre', 'agotamiento', 'trabajo'];
    const rand = Math.random();
    const totalWords = this.words.length;
    const randomIndex = Math.floor(rand * totalWords);
    this.palabra = '';
    this.actualWord = this.words[randomIndex];
    this.randomizedWord = this.scramble(this.words[randomIndex]);
  }

  guessWord() {
    console.log(this.palabra);
    const gano = this.palabra === this.actualWord;
    if (gano) {
      alert("Ganaste");
    } else {
      alert("Perdiste");
    }
    const juegoImpl = new JuegoImpl(localStorage.getItem('email'),     gano, localStorage.getItem('email'), 'Adivina palabra');
    this.juegoServiceService.save(juegoImpl).then(() => this.randomWord()).catch(() => this.randomWord());
  }

  scramble(a) {
    var d;
    a = a.split('');
    for (var b = a.length - 1; 0 < b; b--) {
      var c = Math.floor(Math.random() * (b + 1));
      d = a[b];
      a[b] = a[c];
      a[c] = d;
    }
    return a.join('');
  }

}
