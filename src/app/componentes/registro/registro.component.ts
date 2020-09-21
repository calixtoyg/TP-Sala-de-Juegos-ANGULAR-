import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
// para poder hacer las validaciones
// import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  dialogInstance: MatDialogRef<RegisterDialogComponent>;
  email: string;
  password: string;

  shouldRegister: any;

  /* constructor( private miConstructor:FormBuilder) { }
   email=new FormControl('',[Validators.email]);
   formRegistro:FormGroup=this.miConstructor.group({
     usuario:this.email
   });*/
  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  openRegistry() {
    this.dialogInstance = this.dialog.open(RegisterDialogComponent, {
      width: '500px',
      data: {email: this.email, password: this.password, shouldRegister: this.shouldRegister, save: this.save}
    });

    this.dialogInstance.afterClosed().subscribe(res => {
      console.log(res);
    });
  }
  save() {

  }

}
