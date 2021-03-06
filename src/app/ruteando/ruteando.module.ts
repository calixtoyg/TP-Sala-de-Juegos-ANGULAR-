import {NgModule} from '@angular/core';
// importo del module principal
import {RouterModule} from '@angular/router';
import {AdivinaElNumeroComponent} from '../componentes/adivina-el-numero/adivina-el-numero.component';
import {LoginComponent} from '../componentes/login/login.component';
import {ErrorComponent} from '../componentes/error/error.component';
import {PrincipalComponent} from '../componentes/principal/principal.component';
import {AgilidadAritmeticaComponent} from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import {AdivinaMasListadoComponent} from '../componentes/adivina-mas-listado/adivina-mas-listado.component';
import {AgilidadMasListadoComponent} from '../componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import {ListadoComponent} from '../componentes/listado/listado.component';
import {RegistroComponent} from '../componentes/registro/registro.component';
import {MenuCardComponent} from '../componentes/menu-card/menu-card.component';
import {QuienSoyComponent} from '../componentes/quien-soy/quien-soy.component';
import {ListadoDePaisesComponent} from '../componentes/listado-de-paises/listado-de-paises.component';
import {MapaDeGoogleComponent} from '../componentes/mapa-de-google/mapa-de-google.component';
import {JugadoresListadoComponent} from '../componentes/jugadores-listado/jugadores-listado.component';
import {TicTacToeComponent} from '../componentes/tic-tak-toe/tic-tac-toe.component';
import {FirebaseTestComponent} from '../componentes/firebase-test/firebase-test.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {JuegosComponent} from '../componentes/juegos/juegos.component';
import {FirestoreTestComponent} from '../componentes/firestore-test/firestore-test.component';
import {AnagramaComponent} from '../componentes/anagrama/anagrama.component';
import {SimonBoardComponent} from '../componentes/simon-board/simon-board.component';
import {AdivinaActorComponent} from '../componentes/adivina-actor/adivina-actor.component';
import {MemotestComponent} from '../componentes/memotest/memotest.component';
import {AboutComponent} from '../componentes/about/about.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
// const onlyAllowSelf: AuthPipeGenerator = (next: ActivatedRouteSnapshot) => map(() => {
//   console.log(next);
//   return ['login'];
//   return next
// });
// const onlyAllowSelf: AuthPipeGenerator = next => next.data.authGuardPipe ? (() => loggedIn) : this.router.createUrlTree([], {queryParams: {'expired': true}});


// const onlyAllowSelf = (next) => redirectUnauthorizedTo(['/login?authExpired=true']);

// declaro donde quiero que se dirija
const MiRuteo = [
  {path: 'Jugadores', component: JugadoresListadoComponent},
  {path: '', component: PrincipalComponent},
  {path: 'home', component: PrincipalComponent},
  {path: 'login', component: LoginComponent},
  {path: 'Mapa', component: MapaDeGoogleComponent},
  {path: 'QuienSoy', component: QuienSoyComponent},
  {path: 'Registro', component: RegistroComponent},
  {path: 'register', component: RegistroComponent},
  {path: 'Principal', component: PrincipalComponent},
  {path: 'Listado', component: ListadoComponent},
  {path: 'Paises', component: ListadoDePaisesComponent},
  {path: 'TicTakToe', component: TicTacToeComponent},


  {
    path: 'Juegos',
    component: JuegosComponent,
    children:
      [
        {path: '', component: MenuCardComponent},
        {path: 'Adivina', component: AdivinaElNumeroComponent},
        {path: 'AdivinaMasListado', component: AdivinaMasListadoComponent},
        {path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent},
        {
          path: 'Agilidad',
          component: AgilidadAritmeticaComponent,
          canActivate: [AngularFireAuthGuard],
          data: {authGuardPipe: redirectUnauthorizedToLogin}
        },
        {
          path: 'TicTacToe',
          component: TicTacToeComponent,
          canActivate: [AngularFireAuthGuard],
          data: {'authRedirect': true, authGuardPipe: redirectUnauthorizedToLogin}
        },
        {
          path: 'Anagrama',
          component: AnagramaComponent,
          canActivate: [AngularFireAuthGuard],
          data: {'authRedirect': true, authGuardPipe: redirectUnauthorizedToLogin}
        },
        {
          path: 'Simon',
          component: SimonBoardComponent,
          canActivate: [AngularFireAuthGuard],
          data: {'authRedirect': true, authGuardPipe: redirectUnauthorizedToLogin}
        },
        {
          path: 'AdivinaActor',
          component: AdivinaActorComponent,
          canActivate: [AngularFireAuthGuard],
          data: {'authRedirect': true, authGuardPipe: redirectUnauthorizedToLogin}
        },
        {
          path: 'Memotest',
          component: MemotestComponent,
          canActivate: [AngularFireAuthGuard],
          data: {'authRedirect': true, authGuardPipe: redirectUnauthorizedToLogin}
        }
      ]
  },
  {path: 'about', component: AboutComponent},
  {path: '**', component: ErrorComponent},
  {path: 'error', component: ErrorComponent}];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule {
}
