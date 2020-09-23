import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {  ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AdivinaElNumeroComponent} from './componentes/adivina-el-numero/adivina-el-numero.component';
import {ListadoDeResultadosComponent} from './componentes/listado-de-resultados/listado-de-resultados.component';
import {LoginComponent} from './componentes/login/login.component';
import {HttpClientModule} from '@angular/common/http';
//  import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// import { AccordionModule } from 'ngx-bootstrap';
// agrego las clases para utilizar ruteo
import {RouterModule, Routes} from '@angular/router';

import {MiHttpService} from './servicios/mi-http/mi-http.service';
import {PaisesService} from './servicios/paises.service';

import {JugadoresService} from './servicios/jugadores.service';
import {ArchivosJugadoresService} from './servicios/archivos-jugadores.service';
import {ErrorComponent} from './componentes/error/error.component';
import {PrincipalComponent} from './componentes/principal/principal.component';
import {AgilidadAritmeticaComponent} from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import {MenuComponent} from './componentes/menu/menu.component';
import {AdivinaMasListadoComponent} from './componentes/adivina-mas-listado/adivina-mas-listado.component';
import {AgilidadMasListadoComponent} from './componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import {RuteandoModule} from './ruteando/ruteando.module';
import {ListadoComponent} from './componentes/listado/listado.component';
// declaro donde quiero que se dirija
/*
const MiRuteo = [{path: 'error' , component: ErrorComponent},
{path: 'Login' , component: LoginComponent},
{path: 'Principal' , component: PrincipalComponent , pathMatch: 'full'},
{path: 'Adivina' , component: AdivinaElNumeroComponent},
{path: 'AdivinaMasListado' , component: AdivinaMasListadoComponent},
{path: 'AgilidadaMasListado' , component: AgilidadMasListadoComponent},
{path: 'Agilidad' , component: AgilidadAritmeticaComponent},
{path: '' , component: LoginComponent , pathMatch: 'full'},

{path: '**' , component: ErrorComponent} ];
*/
import {JugadoresListadoComponent} from './componentes/jugadores-listado/jugadores-listado.component';

import {JuegoServiceService} from './servicios/juego-service.service';
import {ListadosComponent} from './componentes/listados/listados.component';
import {JuegosComponent} from './componentes/juegos/juegos.component';
import {RegistroComponent} from './componentes/registro/registro.component';
import {MenuCardComponent} from './componentes/menu-card/menu-card.component';
import {CabeceraComponent} from './componentes/cabecera/cabecera.component';
import {QuienSoyComponent} from './componentes/quien-soy/quien-soy.component';
import {AnagramaComponent} from './componentes/anagrama/anagrama.component';
import {ListadoDePaisesComponent} from './componentes/listado-de-paises/listado-de-paises.component';
import {MapaDeGoogleComponent} from './componentes/mapa-de-google/mapa-de-google.component';
import {AgmCoreModule} from '@agm/core';
import {InputJugadoresComponent} from './componentes/input-jugadores/input-jugadores.component';
import {SexoPipe} from './pipes/sexo.pipe';
import {TicTacToeComponent} from './componentes/tic-tak-toe/tic-tac-toe.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {SimpleDialogComponent} from './componentes/who-plays-dialog/simple-dialog.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { RegisterDialogComponent } from './componentes/register-dialog/register-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseTestComponent } from './componentes/firebase-test/firebase-test.component';
import {AuthenticationService} from './servicios/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    AdivinaElNumeroComponent,
    ListadoDeResultadosComponent,
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    AgilidadAritmeticaComponent,
    MenuComponent,
    AdivinaMasListadoComponent,
    AgilidadMasListadoComponent,
    ListadoComponent,
    ListadosComponent,
    JuegosComponent,
    RegistroComponent,
    MenuCardComponent,
    CabeceraComponent,
    QuienSoyComponent,
    AnagramaComponent,
    ListadoDePaisesComponent,
    MapaDeGoogleComponent,
    JugadoresListadoComponent,
    InputJugadoresComponent,
    SexoPipe,
    TicTacToeComponent,
    SimpleDialogComponent,
    RegisterDialogComponent,
    FirebaseTestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuteandoModule,
    AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
    }),
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule
    // NgbModule.forRoot(MiRuteo),
    // importo el ruteo
    // RouterModule.forRoot(MiRuteo)
  ],
  providers: [JuegoServiceService, MiHttpService, PaisesService, ArchivosJugadoresService, JugadoresService, {
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: {hasBackdrop: true}
  }, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
