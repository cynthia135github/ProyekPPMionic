import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router} from '@angular/router';
import { Barang } from '../barang'; 
import { GlobalvarService } from '../globalvar.service';
import { GlobalakunService } from '../globalakun.service';
import { AlertController } from '@ionic/angular';
import { Penemu } from '../penemu'; 

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.page.html',
  styleUrls: ['./itemdetail.page.scss'],
})
export class ItemdetailPage implements OnInit {

    id        	 : any;
	namabrg   	 : any;
	deskripsibrg : any;
	waktu	  	 : any;
	lokasi	     : any;
	keterangan   : any;
	nophone		 : any;
	TglDitemukan : any;
	currDate	 :any = new Date().toISOString();
    telpPenemu	 : any;
  constructor(public globalVar : GlobalvarService,public route: ActivatedRoute, public router:Router, public globalAkun:GlobalakunService, public alertControl:AlertController) { 
    this.id 	      = this.route.snapshot.paramMap.get("id")
    this.namabrg      = this.route.snapshot.paramMap.get("namabrg")
    this.deskripsibrg = this.route.snapshot.paramMap.get("deskripsibrg")
    this.waktu        = this.route.snapshot.paramMap.get("waktu")
    this.lokasi	      = this.route.snapshot.paramMap.get("lokasi")
	this.keterangan	  = this.route.snapshot.paramMap.get("keterangan")
    this.nophone 	  = this.route.snapshot.paramMap.get("phone")
	this.TglDitemukan = this.route.snapshot.paramMap.get("TglDitemukan")
	this.telpPenemu   = this.globalAkun.getPhone();
    console.log("Hubungi:"+this.nophone);
	console.log("CurrDate:"+this.currDate);
	
  }

  async contact(){
    const alert = await this.alertControl.create({
      header:"Silahkan Hubungi Nomor",
      message:this.nophone,
	  buttons : [
          {
            text : 'OK',
            handler : () => {
              //this.globalVar.addTglFound(this.id,this.namabrg, this.deskripsibrg, this.waktu, this.lokasi, this.keterangan, this.nophone, this.currDate);
			  this.globalVar.addPenemu(this.id, this.telpPenemu, this.currDate);
              this.router.navigate(['/listbarang']);
            }
          }
		]
    });
    await alert.present();
  }
  
  getcontact(){
	  this.contact();
  }
  ngOnInit() {
  }

}
