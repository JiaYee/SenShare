import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import{Servercon} from '../../providers/servercon'
import{DetailPage} from '../detail/detail'
import{AboutusPage} from '../aboutus/aboutus'
@Component({
  selector: 'page-topten',
  templateUrl: 'topten.html'
})


export class ToptenPage {

items:any;
myitem:any;
title:string;
backup_items:any;
showme:boolean;
tt:any;

aboutuspage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public ss:Servercon) {
this.showme=false;
this.aboutuspage=AboutusPage;
this.tt="malaysia";
 this.listitem("segment=1");
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToptenPage');
    //this.listitem();
 // this.my= this.myfliter('1',this.items);
  }


listitem(param:string)
{


let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
loading.present();
 this.ss.dataList(param,"getContentTopCategory.php").then((response)=>{
this.items =response;
this.items=this.items.Data;
this.backup_items=this.items;

loading.dismiss();    
  }).catch((Error)=>{
console.log("Connection Error"+Error);
loading.dismiss();
    }); 
}

listimage(imageurl:string)
{

let myStyles ={
  'background':'url('+imageurl+') no-repeat',
  'background-size':'100% 100%'
}

return myStyles;

}

openPage(item)
{

  
  this.navCtrl.push(DetailPage,item);
}


getItems(ev: any) {
    // Reset items back to all of the items
   

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
else
{
  this.items=this.backup_items;
}  
}




onCancel(onCancel)
{
this.items=this.backup_items;
this.showme=false; 
}

seachshow()
{
if(this.showme==false)
 this.showme=true; 
 else
 this.showme=false; 

}




}
