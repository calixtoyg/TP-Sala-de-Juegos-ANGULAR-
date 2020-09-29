import {Component, Injectable, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {AuthenticationService} from '../../servicios/authentication.service';
import {Observable} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;
import {map} from 'rxjs/operators';
// para poder hacer las validaciones
// import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  dialogInstance: MatDialogRef<RegisterDialogComponent>;
  email: string;
  password: string;
  authentication: any;

  shouldRegister: any;

  /* constructor( private miConstructor:FormBuilder) { }
   email=new FormControl('',[Validators.email]);
   formRegistro:FormGroup=this.miConstructor.group({
     usuario:this.email
   });*/
  constructor(public dialog: MatDialog, private auth: AuthenticationService) {
  }

  ngOnInit() {
  }

  openRegistry() {
    this.dialogInstance = this.dialog.open(RegisterDialogComponent, {
      width: '500px',
      data: {email: this.email, password: this.password}
    });
    this.dialogInstance.afterClosed().subscribe(res => {
      if (res.shouldSave) {
        this.save(res.email, res.password);
      }
    });

  }

  save(email: string, password: string) {
    this.authentication = this.auth.signUp(email, password);
    this.authentication.subscribe(value => {
      console.log(value);
    }, error => {
      console.log(error);
    });
  }

  login(email: string, password: string) {
    this.authentication = this.auth.login(email, password);
  }

  logout() {
    this.auth.logout();
  }
}
