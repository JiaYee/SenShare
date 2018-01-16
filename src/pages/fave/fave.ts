import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import{Servercon} from '../../providers/servercon'
import{DetailPage} from '../detail/detail'

@Component({
  selector: 'page-fave',
  templateUrl: 'fave.html'
})
export class FavePage {
items:any;
backup_items:any;

showme:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public ss:Servercon,
  public loadingCtrl: LoadingController,public toastCtrl:ToastController) {
      this.showme=false;

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad FavePage');

 if(this.ss.dataIdentiCheck())
 {
   this.listitem();
 }
 else
 {
let toast = this.toastCtrl.create({
    message: 'Sorry No Favorite items',
    duration: 3000,
    position: 'middle'
  });
toast.present();

 }
}


listitem()
{
let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
//loading.present();
this.items= this.ss.favodataList();
this.backup_items=this.items;
//loading.dismiss();

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
