import { Injectable } from '@angular/core';
import { Barang } from './barang'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire'; 
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';
import { GlobalakunService } from './globalakun.service';
import { Penemu } from './penemu'; 

@Injectable({
  providedIn: 'root'
})
export class GlobalvarService {
	allBarang : Barang[];  // Declare Array of Barang yg Hilang
	allPenemu : Penemu[];
	ygtemuin  : Penemu[];
	
	jumlahBrg : any;
	jumlahPenemu : any;
	
	barangcol: AngularFirestoreCollection<Barang>; 
	barangbaru: Barang; 
	barangtambahan :  Barang;
	
	penemubaru : Penemu;
	penemubrg  : Penemu;
	penemucol  : AngularFirestoreCollection<Penemu>; 
	
	
	constructor(public router:Router, public firestore: AngularFirestore, public globalAkun:GlobalakunService) {
		  this.getData();
		  this.barangcol.valueChanges().subscribe(result => { this.logCount(result.length) });
		  this.penemucol.valueChanges().subscribe(result => { this.logCountPenemu(result.length) });
		  for(let i=0; i<this.allPenemu.length; i++)
		  {
			  console.log("ID PENEMUU:" + this.allPenemu[i].idbrg);
		  }
		}
	
	
	
	async getData() {
		this.barangcol = this.firestore.collection<Barang>('baranghilang');
		this.penemucol = this.firestore.collection<Penemu>('penemu');
		this.allBarang = [];
		this.allPenemu = [];
		this.ygtemuin  = [];
		this.barangcol.snapshotChanges().subscribe(res => {
			res.forEach(item => {
			  console.log(item.payload.doc.get("id"));
			  this.barangbaru = new Barang(item.payload.doc.get("id"), item.payload.doc.get("namabrg"), item.payload.doc.get("deskripsi"), item.payload.doc.get("waktu"), item.payload.doc.get("lokasi"),item.payload.doc.get("keterangan"),item.payload.doc.get("phone"),item.payload.doc.get("TglDitemukan"));
			  this.allBarang.push(this.barangbaru);
			})
		  })
		 this.penemucol.snapshotChanges().subscribe(res => {
			res.forEach(item => {
			  console.log(item.payload.doc.get("idtemukan"));
			  this.penemubrg = new Penemu(item.payload.doc.get("id"), item.payload.doc.get("idbrg"), item.payload.doc.get("telpon"), item.payload.doc.get("TglDitemukan"));
			  this.allPenemu.push(this.penemubrg);
			})
		  })
	}
	
	logCount (n : number){
		this.jumlahBrg = n;
	}
	
	logCountPenemu(n : number){
		this.jumlahPenemu = n;
	}
  
	getAllBarang() {
	  return [...this.allBarang];
	}
	
	addLostForm(namabrg, deskripsibrg, waktu, lokasi, keterangan, phone){
		
		this.barangtambahan={
			'id': 'b' + (this.jumlahBrg + 1),
			'namabrg':namabrg,
			'deskripsibrg':deskripsibrg,
			'waktu':waktu.substring(0,10),
			'lokasi':lokasi,
			'keterangan' : keterangan,
			'phone': phone,
			'TglDitemukan': "-"
		}
		this.barangcol.doc(this.barangtambahan.id).set(this.barangtambahan); 
		this.allBarang=[];
		this.getData();
		this.router.navigate(['home']);
	}
	
	addTglFound(id, namabrg, deskripsibrg, waktu, lokasi, keterangan, phone, currDate){
		this.barangtambahan={
			'id': id,
			'namabrg':namabrg,
			'deskripsibrg':deskripsibrg,
			'waktu':waktu.substring(0,10),
			'lokasi':lokasi,
			'keterangan' : keterangan,
			'phone': phone,
			'TglDitemukan': currDate.substring(0,10)
		}
		this.barangcol.doc(this.barangtambahan.id).set(this.barangtambahan); 
		//this.allBarang=[];
		//this.getData();
	}
	
	addPenemu(id, nophone, currDate){
		this.penemubaru={
			'idtemukan': 'p' +(this.jumlahPenemu + 1),
			'idbrg':id,
			'telpon':nophone,
			'TglDitemukan': currDate.substring(0,10)
		}
		this.penemucol.doc(this.penemubaru.idtemukan).set(this.penemubaru); 
		this.allPenemu=[];
		this.getData();
		this.router.navigate(['listbarang']);
	}
	
	caripenemu(idbarangnya)
	{
		for(let i=0; i<this.allPenemu.length; i++)
		{
			if(idbarangnya == this.allPenemu[i].idbrg)
			{
				this.ygtemuin.push(this.allPenemu[i].idbrg);
			}
		}
	}
	
}
