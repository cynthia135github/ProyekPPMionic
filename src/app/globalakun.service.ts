import { Injectable } from '@angular/core';
import { Akun } from './akun.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalakunService {
  allAkun : Akun[] = [];
  tempNoTelp : any;
  constructor() { }

  public inputakun(data:Akun[]){
    this.allAkun = data;
  }

  public saveAkun(data : Akun){
    this.allAkun.push(data);
  }
  
  public getPhone(){
	  return this.tempNoTelp;
  }
  
  public setPhone(phone){
	  
	  this.tempNoTelp = phone;
  }
}
