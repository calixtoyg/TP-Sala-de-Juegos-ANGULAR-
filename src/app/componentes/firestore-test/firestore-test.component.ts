import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-firestore-test',
  templateUrl: './firestore-test.component.html',
  styleUrls: ['./firestore-test.component.css']
})
export class FirestoreTestComponent implements OnInit {

  public items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('/items').valueChanges();
  }

  ngOnInit(): void {
  }

}
