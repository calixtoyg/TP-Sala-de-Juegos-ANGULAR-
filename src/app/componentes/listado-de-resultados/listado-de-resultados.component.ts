import {Component, OnInit} from '@angular/core';
import {JuegoServiceService} from '../../servicios/juego-service.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

  public tableHeaders: Array<string>;
  public dataSource: MatTableDataSource<any>;
  loadingSpinner: boolean;


  constructor(public juegosService: JuegoServiceService) {
  }

  ngOnInit() {
    this.loadingSpinner = true;
    this.juegosService.get().subscribe(value => {
      this.loadingSpinner = false;
      this.dataSource = new MatTableDataSource(value);
      this.tableHeaders = Object.keys(value[0]);
    });
  }


  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
