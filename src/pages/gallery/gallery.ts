import { Component,ViewChild  } from '@angular/core';
import { NavController, NavParams, ViewController,Slides} from 'ionic-angular';
// import { ScreenOrientation} from 'ionic-native';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {
  @ViewChild(Slides) slides: Slides;
mygallery:any;
init:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
 this.mygallery= this.navParams.get("gallery");

console.log(this.navParams.get("cindex"));
this.init=this.navParams.get("cindex");

  }

 ngAfterViewInit() {
// ScreenOrientation.unlockOrientation();
 this.slides.initialSlide=this.navParams.get("cindex");
 this.slides.zoom=true;
 this.slides.zoomMax=10;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');

  }

closePage()
{
//
//   ScreenOrientation.lockOrientation('portrait-primary').then(data => {
//
// console.log(data);
// })
// .catch(error => {
// console.log(error);
//    });
//
//  this.viewCtrl.dismiss();
}

}
