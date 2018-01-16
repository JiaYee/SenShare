import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { EarthPage } from '../pages/earth/earth';
import { EventPage } from '../pages/event/event';
import { ToptenPage } from '../pages/topten/topten';
//import{TabtoptenPage} from '../pages/tabtopten/tabtopten';
import { FavePage } from '../pages/fave/fave';
import { BannersPage } from '../pages/banners/banners';
import { AboutusPage } from '../pages/aboutus/aboutus';
//import { GalleryPage } from '../pages/gallery/gallery';
import { Servercon } from '../providers/servercon';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  myname:string;
  mystyle:any;

  pages: Array<{title: string, component: any,icon: string,img:string ,adminonly:any}>;

  constructor(public platform: Platform,
    private screenOrientation: ScreenOrientation,
    public ss:Servercon) {

this.rootPage= HomePage;
    this.initializeApp();

    // used for an example of ngFor and navigation
if (this.platform.is("ios")) {this.mystyle={'margin-right': '12px'};} else { this.mystyle={'margin-right': '29px'}}

    this.pages = [
      { title: 'Home', component: HomePage ,'icon':'home','img':'','adminonly':false},
      { title: 'Earth', component: EarthPage,'icon':'','img':'assets/globe.png','adminonly':false },
    { title: 'Location', component: EventPage,'icon':'','img':'assets/pin.png','adminonly':false },
      { title: 'Favorite', component: FavePage,'icon':'heart','img':'','adminonly':false },
      { title: 'Top 30', component: ToptenPage,'icon':'','img':'assets/Top30_50.png','adminonly':false },
    { title: 'Upload', component: BannersPage,'icon':'images','img':'','adminonly':true },
      { title: 'About Us', component: AboutusPage,'icon':'log-out','img':'','adminonly':false }

    ];

if(this.ss.readData("loginSts"))
{
this.myname=this.ss.readData("myname");
}
else
{
  this.myname= "Hi Guest";
}

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      // .then((data) => {
      //   alert(data);
      // })
      // .catch((error) => {
      //   alert("Error " + error);
      // })


      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

adminonly(check:any)
{
  if(check)
  {
 if(this.ss.readData("loginSts"))
 return true;
 else
 return false;
}
else
{
 return true;
}
}
}
