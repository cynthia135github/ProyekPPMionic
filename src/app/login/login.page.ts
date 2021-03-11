import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Akun } from '../akun.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GlobalakunService } from '../globalakun.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { GlobalvarService } from '../globalvar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  checkUsername:string;
  checkPass:string;
  private allAkun:Observable<Akun[]>;
  private akunCol:AngularFirestoreCollection<Akun>;
  semuaAkun : Akun[];
  newAkun : Akun;
  temp=0;
  countPass:number;
  tempassword:string;

  constructor(public globalBarang : GlobalvarService, private formBuilder: FormBuilder, public router:Router, public alertControl:AlertController, public globalAkun:GlobalakunService, private fireStore:AngularFirestore) {
    this.akunCol = this.fireStore.collection<Akun>('Akun');
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.allAkun = this.akunCol.valueChanges();
    this.allAkun.subscribe(all =>{
      this.semuaAkun = all;
      this.globalAkun.inputakun(this.semuaAkun);
    });
    this.temp = 0;
  }

  async userwrong(){
    const alert = await this.alertControl.create({
      header:"Alert",
      message:"The username doesn't exist",
      buttons:['OK']
    });
    await alert.present();
  }

  async passwrong(){
    const alert = await this.alertControl.create({
      header:"Alert",
      message:"The password is wrong",
      buttons:['OK']
    });
    await alert.present();
  }


  async loginsukses(){
    const alert = await this.alertControl.create({
      header:"Alert",
      message:"Login Sukses",
      buttons : [
        {
          text : 'OK',
          handler : () => {
          this.router.navigate(['/homepage']);
		  //this.router.navigate(['/homepage',{id:id, namabrg:namabrg, deskripsibrg: deskripsibrg, waktu: waktu, lokasi: lokasi}]);
          }
        }
      ]
    });
    await alert.present();
  }

  login(){
    this.tempassword = this.password.value;
    for(let i=0;i<this.globalAkun.allAkun.length;i++){

      if(this.username.value == this.globalAkun.allAkun[i].username){
        this.temp = 1;
        this.countPass = i;
      }
    }
   
    if(this.tempassword == this.globalAkun.allAkun[this.countPass].password){
      this.temp = 2;
    }
   
    if(this.temp == 0){
      this.userwrong();
    }
    else if(this.temp == 1){
      this.passwrong();
      this.temp = 0;
    }
    else{
      this.globalAkun.setPhone(this.globalAkun.allAkun[this.countPass].phone);
	  console.log(this.globalAkun.getPhone());
	  this.loginsukses();
      this.temp =0;
      this.countPass = 0;
    }
  }

  get username(){
    return this.registrationForm.get("username");
  }

  get password(){
    return this.registrationForm.get("password");
  }

  public errorMessages = {
    username:[
      { type: 'required', message: 'Username is required' }
    ],
    password:[
      { type: 'required', message: 'Password is required' }
    ]
  }

  registrationForm = this.formBuilder.group({
    username: [
    '', 
      [
      Validators.required
      ]
    ],
    password:[
      "",
      [
        Validators.required
      ]
  ]
  });
}
