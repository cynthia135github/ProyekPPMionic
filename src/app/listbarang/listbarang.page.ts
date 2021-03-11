import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Barang } from '../barang';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { GlobalvarService } from '../globalvar.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Akun } from '../akun.model';
import { GlobalakunService } from '../globalakun.service';

@Component({
  selector: 'app-listbarang',
  templateUrl: './listbarang.page.html',
  styleUrls: ['./listbarang.page.scss'],
})
export class ListbarangPage implements OnInit {
  private barangcloud : Observable<Barang[]>;
  private barangcol : AngularFirestoreCollection<Barang>;
  private barang : Barang;
  private allBarang : Barang[];
  public size : number;
  
  public txtsearch : string="";

  private allAkun:Observable<Akun[]>;
  private akunCol:AngularFirestoreCollection<Akun>;
  cobatelp:string;

  constructor(public globalAkun:GlobalakunService, public globalBarang : GlobalvarService, public router : Router, public alertController : AlertController,
    private fireStore : AngularFirestore) { 
     
      this.barangcol = this.fireStore.collection<Barang>('baranghilang');
      this.barangcloud = this.barangcol.snapshotChanges().pipe (
        map(actions => {
            return actions.map( a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data};
            })
        })
      )
      this.barangcol.valueChanges().subscribe(result => { this.logCount(result.length) });
    }

    logCount(n : number) {
      this.size = n;
    }

    seedetail(id, namabrg, deskripsibrg, waktu, lokasi, phone, TglDitemukan, keterangan){
	    //alert(id + "-" + namabrg + "-" + deskripsibrg + "-" + waktu+ "-" + lokasi);
		this.router.navigate(['itemdetail',{id:id, namabrg:namabrg, deskripsibrg: deskripsibrg, waktu: waktu, lokasi: lokasi, phone:phone, TglDitemukan:TglDitemukan, keterangan:keterangan}]);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    
  }

  async baranghapus(){
    const alert = await this.alertController.create({
      header:"Alert",
      message:"Hapus Sukses",
      buttons:['OK']
    });
    await alert.present();
  }

  async baranggagal(){
    const alert = await this.alertController.create({
      header:"Alert",
      message:"Hapus gagal",
      buttons:['OK']
    });
    await alert.present();
  }

  deleteBarang(id:string, nomor:string){
    // console.log(id);
    // console.log(nomor);
    // console.log(this.globalAkun.getPhone());
    this.cobatelp = this.globalAkun.getPhone();
    if(this.cobatelp == nomor){
    this.barangcol.doc(id).delete();
    this.baranghapus();
    }
    else{
      this.baranggagal();
    }
  }
  
  seefounder(idbarang){
	  this.router.navigate(['penemu',{idbrg:idbarang}]);
  }

}
