import { Component, OnInit } from '@angular/core';
import { GlobalvarService } from '../globalvar.service';
import { Routes, RouterModule, ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { GlobalakunService } from '../globalakun.service';

@Component({
  selector: 'app-lostform',
  templateUrl: './lostform.page.html',
  styleUrls: ['./lostform.page.scss'],
})
export class LostformPage implements OnInit {

  namabrg : string;
  deskripsibrg : string;
  waktu : string;
  lokasi : string;
  phone: string;
  keterangan : string;
  
  tmp : number;

  constructor(public globalVar : GlobalvarService, public globalAkun:GlobalakunService, public router:Router, public alertController:AlertController,public route: ActivatedRoute) { 
		this.phone = this.globalAkun.getPhone();
		this.namabrg = "";
		this.deskripsibrg = "";
		this.waktu = "";
		this.lokasi =  "";
		this.keterangan = "";
		console.log("NOMOR: "+this.phone);
		console.log("nama: "+this.namabrg);
		console.log("deskripsibrg: "+this.deskripsibrg);
		console.log("waktu: "+this.waktu);
		console.log("lokasi: "+this.lokasi);
		console.log("Ket:" + this.keterangan)
		
		this.tmp = 0;

  }
  
  async tidakbolekosong(){
    const alert = await this.alertController.create({
        header:"Alert",
        message:"Tidak bole ada yang kosong",
        buttons:["OK"]
    });
    await alert.present();
  }

  async addItem(namabrg : any, deskripsibrg : any, waktu : any, lokasi : any, keterangan : any){
    const alert = await this.alertController.create({
        header:"Alert",
        message:"Barang Sudah ditambahkan!",
        buttons : [
          {
            text : 'OK',
            handler : () => {
              this.globalVar.addLostForm(namabrg, deskripsibrg, waktu, lokasi, keterangan, this.phone);
              this.router.navigate(['/listbarang']);
            }
          }
        ]
      });
    await alert.present();
  }

  addlost(namabrg, deskripsibrg, waktu, lokasi, keterangan){
    this.tmp = 0;
    if(this.namabrg == "" ){
       this.tmp = 1;
       
    }
    if(this.deskripsibrg == "" ){
      this.tmp = 1;
    }
    if(this.waktu == "")
    {
      this.tmp = 1;
    }
    if(this.lokasi == "")
    {
      this.tmp = 1;
    }
	if(this.keterangan == "")
	{
		this.tmp = 1;
	}
    if(this.tmp == 1){
       this.tidakbolekosong();
    }
    else{
      this.addItem(namabrg, deskripsibrg, waktu, lokasi, keterangan);
    }
     
    }

  ngOnInit() {
  }

}
