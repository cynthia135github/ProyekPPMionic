import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router} from '@angular/router';
import { Penemu } from '../penemu'; 
import { AngularFireModule } from '@angular/fire'; 
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalvarService } from '../globalvar.service';

@Component({
  selector: 'app-penemu',
  templateUrl: './penemu.page.html',
  styleUrls: ['./penemu.page.scss'],
})
export class PenemuPage implements OnInit {

	idbrgnya   : string;
	alltemu    : Penemu[];
	listPenemu : Penemu[];
	penemubrg  : Penemu;
	//private penemucol : Observable<Penemu[]>;
	private penemucol  : AngularFirestoreCollection<Penemu>
	
  constructor(public route: ActivatedRoute, public globalVar : GlobalvarService, public firestore: AngularFirestore) { 
    //this.penemucol    = this.firestore.collection<Penemu>('penemu');
	this.idbrgnya 	  = this.route.snapshot.paramMap.get("idbrg")
    
	
	/*this.penemucol = this.penemucol.snapshotChanges().pipe (
        map(actions => {
            return actions.map( a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data};
            })
        })
      )*/
	
	/*for(let i=0; i<this.penemucol.length; i++)
	  {
		  console.log("ID TEMU: " + this.penemucol[i].idbrg);
		  if(this.idbrg == this.penemucol[i].idbrg)
		  {
			  this.listPenemu.push(this.penemucol[i]);
		  }
	  }*/
	
	/*this.penemucol.snapshotChanges().subscribe(res => {
			res.forEach(item => {
			  this.penemubrg = new Penemu(item.payload.doc.get("id"), item.payload.doc.get("idbrg"), item.payload.doc.get("telpon"), item.payload.doc.get("TglDitemukan"));
			  if(this.penemubrg.idbrg == this.idbrg)
			  this.alltemu.push(this.penemubrg);
			})
		  })*/
	//this.tampilkanpenemu(this.idbrg);
	/* for(let i=0; i<this.listPenemu.length; i++)
	 {
		console.log("ID TEMU: " + this.allPenemu[i].idbrg);
	 }*/
	 
  }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
	  this.alltemu      = [];
	//this.globalVar.caripenemu(this.idbrgnya);
	  this.alltemu      = this.globalVar.allPenemu;
	  this.listPenemu   = [];
	  for(let penemuu of this.alltemu)
	  {
		  console.log("ID BRG SI PENEMU: " + penemuu.idbrg);
		  if(this.idbrgnya == penemuu.idbrg)
		  {
			 console.log("ID TEMU: " + penemuu.idbrg);
			  this.listPenemu.push(penemuu);
		  }
	  }
  }
  
  /*tampilkanpenemu(idbrg){
	  this.listPenemu = [];
	  for(let i=0; i<this.allPenemu.length; i++)
	  {
		  if(idbrg == this.allPenemu[i].idbrg)
		  {
			  this.listPenemu.push(this.allPenemu[i]);
		  }
	  }
  }*/

}
