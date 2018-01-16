import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EarthPage} from '../earth/earth';
import {EventPage} from '../event/event';
import {AboutusPage} from '../aboutus/aboutus';



@Component({
  selector: 'page-tabtopten',
  templateUrl: 'tabtopten.html'
})
export class TabtoptenPage {

page:any;
page1:any;
page2:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

this.page = AboutusPage ;  
this.page1 = AboutusPage ;  
this.page2 = AboutusPage ;  

  }

  ionViewDidLoad() {



}

}
