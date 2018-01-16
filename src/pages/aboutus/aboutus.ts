import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import{HomePage} from '../home/home';
import{Servercon} from '../../providers/servercon'
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html'
})
export class AboutusPage {
htmlinfo :any;
page:any;

constructor(public navCtrl: NavController,
  private iab: InAppBrowser,
  public navParams: NavParams,public loadingCtrl: LoadingController, public ss:Servercon) {
  ;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
    this.loadinfo();
  }

subPage(event)
{

}

loadinfo()
{

  let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  loading.present();
   this.ss.getDatalist("getAboutUs.php").then((response)=>{

  this.htmlinfo  =response;

  this.htmlinfo =this.htmlinfo.data;
  loading.dismiss();
    }).catch((Error)=>{
  console.log("Connection Error"+Error);
  loading.dismiss();
      });


}


}
