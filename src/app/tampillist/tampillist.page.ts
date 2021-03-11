import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Akun } from '../akun.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GlobalakunService } from '../globalakun.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { GlobalvarService } from '../globalvar.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tampillist',
  templateUrl: './tampillist.page.html',
  styleUrls: ['./tampillist.page.scss'],
})
export class TampillistPage implements OnInit {

  private akunCloud : Observable<Akun[]>;
  private akunCol:AngularFirestoreCollection<Akun>;
  public size : number;

  constructor(public globalAkun : GlobalvarService, public router : Router, public alertController : AlertController,
    private fireStore : AngularFirestore) { 
      this.akunCol = this.fireStore.collection<Akun>('Akun');
      this.akunCloud = this.akunCol.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a =>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return{id,...data}
          })
        })
      )
          this.akunCol.valueChanges().subscribe(result =>{
            this.logCount(result.length)
          });
    }

    logCount(n : number) {
      this.size = n;
    }

  ngOnInit() {
  }

}
