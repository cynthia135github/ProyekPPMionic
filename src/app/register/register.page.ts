import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Akun } from '../akun.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GlobalakunService } from '../globalakun.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private allAkun:Observable<Akun[]>;
  private tempakun:AngularFirestoreCollection<Akun>;
  erroruser:string;
  semuaAkun:Akun[];
  newAkun:Akun;
  temp : number;
  temp1:number;
  temp2:number;

  constructor(private formBuilder: FormBuilder, public router:Router, public alertController:AlertController, public globalAkun:GlobalakunService, private fireStore:AngularFirestore) { 
    this.tempakun = this.fireStore.collection<Akun>('Akun');
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.allAkun = this.tempakun.valueChanges();
    this.allAkun.subscribe(all => {
      this.semuaAkun = all;
      this.globalAkun.inputakun(this.semuaAkun);
    });
    this.temp = 0;
    this.temp1 = 0;
    this.temp2 = 0;
  }

  async gagalUsername(){
    const alert = await this.alertController.create({
      header:"Alert",
      message: "Username already used, please use another username",
      buttons:["OK"]
    });
      await alert.present();
  }

  async berhasilSign(){
    const alert = await this.alertController.create({
      header:"Alert",
      message:" Your register success",
      buttons : [
        {
          text : 'OK',
          handler : () => {
          this.router.navigate(['/login']);
          }
        }
      ]
    });
      await alert.present();
  }

  async gagalEmail(){
    const alert = await this.alertController.create({
      header:"Alert",
      message:"Email already used, use another email",
      buttons:["OK"]

    });
    await alert.present();
  } 

  async kosong(){
    const alert = await this.alertController.create({
      header:"Alert",
      message:"Tidak boleh ada yang kosong",
      buttons:["OK"]

    });
    await alert.present();
  }

  public submit(){
    for(let i=0; i<this.globalAkun.allAkun.length;i++){
      if(this.username.value == this.globalAkun.allAkun[i].username){
        this.temp = 1;
      }
      else if(this.email.value == this.globalAkun.allAkun[i].email){
        this.temp1 = 1;
      }
    }

    if(this.password.value == "" || this.username.value =="" || this.phone.value == ""  || this.name.value == "" || this.email.value == ""){
      this.temp2 = 1;
    }

    if(this.temp2 == 1){
      this.kosong();
      this.temp2 =0;
    }
    else if(this.temp==1){
      this.gagalUsername();
      this.temp=0;
    }
    else if(this.temp1==1){
      this.gagalEmail();
      this.temp1 = 0;
    }
    else{
      this.tempakun = this.fireStore.collection<Akun>('Akun');
      this.newAkun = {
        name: this.name.value,
        username : this.username.value,
        phone: this.phone.value,
        email : this.email.value,
        password:this.password.value
      }
      this.globalAkun.saveAkun(this.newAkun);
      this.tempakun.doc(this.newAkun.name).set(this.newAkun);
      this.registrationForm.reset();
      this.berhasilSign();
     
    }
  }

  get name(){
    return this.registrationForm.get("name");
  }

  get username(){
    return this.registrationForm.get("username");
  }

  get email(){
    return this.registrationForm.get("email");
  }

  get phone(){
    return this.registrationForm.get('phone');
  }

  get password(){
    return this.registrationForm.get('password');
  }

 

  public errorMessages = {
    name:[
      { type: 'required', message: 'Name is required' }
    ],
    username:[
      { type: 'required', message: 'Username is required' },
      { type: 'maxlength', message: 'Username cant be longer than 30 characters' }
    ],
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password : [
      { type: 'required', message: 'Password is required' }
    ],
  };

  registrationForm = this.formBuilder.group({
    name:[
      "",
      [
        Validators.required
      ]
    ],
    username: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
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
