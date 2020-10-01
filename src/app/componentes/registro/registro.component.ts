import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {AuthenticationService} from '../../servicios/authentication.service';
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
  public loadingSpinner: boolean;

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
    this.loadingSpinner = true;
    this.auth.signUp(email, password).then(value => {
      this.loadingSpinner = false;
    }, error => {
      this.loadingSpinner = false;
    });
  }

  login(email: string, password: string) {
    this.loadingSpinner = true;
    this.authentication = this.auth.login(email, password).then(value => {
      this.loadingSpinner = false;
    }).catch(error => {
      this.loadingSpinner = false;
    });
  }

  logout() {
    this.auth.logout().then();
  }
}
