import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import {
  NavController,
  NavParams,
  LoadingController,
  ViewController ,
  PopoverController,
  ToastController,
  AlertController,
  ActionSheetController,
  Events,
} from 'ionic-angular';

import { PhotoViewer } from 'ionic-native';
import{Servercon} from '../../providers/servercon';
import{SublistPage} from '../sublist/sublist';
import{EarthPage} from '../earth/earth';
import{EventPage} from '../event/event';
import{FavePage} from '../fave/fave';
import {ToptenPage} from '../topten/topten';
import{AboutusPage} from '../aboutus/aboutus';
import{AddcategoryPage} from '../addcategory/addcategory';
import{ AddcontentPage } from '../addcontent/addcontent';
import { UpdatecategoryPage } from '../updatecategory/updatecategory';


@Component({
  template: `
    <ion-list color="light">
      <button ion-item icon-right (click)="openAddcategory(addCategory)">Add Main Category </button>
      <button ion-item (click)="openAddcontent(addContent)">Add Content</button>
      <button ion-item  >Edit Subcategory</button>
      </ion-list>
      `
})

export class SubPage {
  addCategory: any = AddcategoryPage;
  addContent: any = AddcontentPage;
  id:any;
  aboutpage:any;
  sts:any;
  sts1:any;
  validateRes: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,public loadingCtrl: LoadingController,
  public ss:Servercon,public toastCtrl: ToastController,
  public navCtrl: NavController,
  private alertCtrl: AlertController) {


  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Invalid verification code',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }

  presentPrompt(page) {
      let alert = this.alertCtrl.create({
          title: 'Verification Code',
          message: 'Please key in your verification code',
          inputs: [
          {
              name: 'password',
              type: 'password'
          }
          ],
          buttons: [
          {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                  console.log('Cancel clicked');
              }
          },
          {
              text: 'Submit',
              handler: data => {
                this.validateCode(data.password, page);
              }
          }
          ]
      });
      alert.present();
  }

  validateCode(pw, page){
    this.ss.verification("verification_code="+pw, 'validateVerificationCode.php').then(
      (res) => {
        console.log('res', res);

        this.validateRes = res;
        let responseCode = this.validateRes.Response.responseCode;
        let validateStatus = this.validateRes.data.status;

        if(responseCode == 200){
          if(validateStatus == 1){
            localStorage.setItem('verification_code', pw);
            this.navCtrl.push(page);
          }else{
            this.presentToast();
          }
        }
      },
      (err) => {
        console.log('error', err);
        this.presentToast();
      }
    );
  }

  openAddcategory(page){
      this.navCtrl.push(page);
  }

  openAddcontent(page){
      this.navCtrl.push(page);
  }
}

@Component({
  template: `
     <ion-list color="light">
      <button ion-item icon-right (click)="presentPopover($event)">Admin</button>
       <button ion-item (click)="validationPop()">Validation Code</button>
      <button *ngIf="adminonly()"  ion-item  (click)="logout()">Logout</button>
       </ion-list>
      `
})
export class MorePage {
  id:any;
 aboutpage:any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,public loadingCtrl: LoadingController,
  public ss:Servercon,public toastCtrl: ToastController,public popoverCtrl: PopoverController,
  public navCtrl: NavController,

   private alertCtrl: AlertController) {

this.id = this.navParams.get("id");
this.aboutpage =AboutusPage;


  }



 presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
       position: 'middle'
    });
    toast.present();
  }





addme(seg:string)

{


  this.viewCtrl.dismiss();
}



validationPop()
{

 let alert = this.alertCtrl.create({
    title: 'Login',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Login',
        handler: data => {
         let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
loading.present();

 this.ss.dataList("verification_code="+data.password,"newVVC.php").then((response)=>{

let myname =data.username;

loading.dismiss();
 data =response;
 console.log(data);

if(data.data.status)
{
this.ss.saveData("myname",myname);
this.ss.saveData("loginSts","1");
this.ss.saveData("delete_action", data.data.delete_action);
this.presentToast("login successful");
}
else
{
this.presentToast("login failed");
}
  }).catch((Error)=>{
console.log("Connection Error"+Error);
loading.dismiss();
    });


        }
      }
    ]
  });
  alert.present();
 this.viewCtrl.dismiss();

}

  page()
  {
    this.viewCtrl.dismiss();

  }

  presentPopover(myEvent) {
    if(this.ss.readData("loginSts")){
      this.viewCtrl.dismiss();
        let popover = this.popoverCtrl.create(SubPage);
        popover.present({
          ev: myEvent

        });
    }else{

    }
  }

  logout()
  {
    this.ss.deleteData("loginSts");
    this.ss.deleteData("myname");
    this.presentToast("Logout successful");
    this.viewCtrl.dismiss();
  }


  adminonly()
  {
    if(this.ss.readData("loginSts"))
    return true;
    else
    return false;
  }




}





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  slides:any;
  items:any;
  backup_items:any;
  earthpage:any;
  eventpage:any;
  favepage:any;
  toptenpage:any;
  addcategorypage:any;
  showme:boolean = false;
  showpopover: boolean = false;

  locations = [];
  display: any;
  countries = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ss:Servercon,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    public events: Events,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.earthpage = EarthPage;
    this.eventpage=EventPage;
    this.favepage=FavePage;
    this.toptenpage=ToptenPage;
    this.showme=false;
    this.addcategorypage=AddcategoryPage;

    events.subscribe("maincatedit", (data) => {
      this.listitem();
    })
  }

  ionViewDidLoad() {
    this.listBanner();
    this.listitem();
  }

  goSublist(locname, id)
  {
    this.navCtrl.push(SublistPage, {locname, id});
  }

  filterRight(item, index)
  {
    let j;
    for(j=0; j<this.countries.length; j++)
    {
      this.countries[j].selected = false;
    }
    this.countries[index].selected = true;

    let i;
    this.locations = [];

    let param = "main_category_id=" + item.id;
    console.log("Sending" + param)
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    loading.present();
     this.ss.dataList(param,"getMain_Location.php").then((response)=>{
       this.display = response;
       this.display = this.display.Data;

       for(i=0; i<=this.display.length; i++)
       {
         let name = this.display[i].name;
         let pipeline = name.split("/");
         let chinese = pipeline[0];
         let english = pipeline[1];
         this.locations.push({
           name: name,
           chinese: chinese,
           english: english,
           id: item.id,
         });
       }




    loading.dismiss();
      }).catch((Error)=>{
    console.log("Connection Error"+Error);
    loading.dismiss();
        });
  }

  goBLS()
  {
    window.open("http://www.citytour.com.my/")
  }

  updateMainCat() {
    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id', '');
    urlSearchParams.append('type', '');
    urlSearchParams.append('name', '');
    urlSearchParams.append('iamge_path', '');

    this.ss.updateMainCat(urlSearchParams, 'updateMainCategoryData.php')
      .then( res => {
        console.log('res', res);
      })
      .catch( err => {
        console.log('res', err);
      });
  }

  promptActionSheet(catItem) {
    if(this.adminonly()){
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Edit',
            handler: () => {
              this.navCtrl.push(UpdatecategoryPage, {catItem});
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });

      actionSheet.present();
    }else{
    }
  }

  listBanner(){
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    loading.present();
    this.ss.banner().then((response)=>{
      this.slides =response;
      this.slides=this.slides.Data;
      console.log();
      loading.dismiss();
      }).catch((Error)=>{
        console.log("Connection Error"+Error);
        loading.dismiss();
      });
  }

  listitem(){
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    loading.present();
    this.ss.dataList("type=1&start=0","getMainCategoryDataByType.php").then((response)=>{
        this.items =response;
        this.items=this.items.Data;
        console.log(this.items);
        this.backup_items= this.items;
        loading.dismiss();
      }).catch((Error)=>{
        console.log("Connection Error"+Error);
        loading.dismiss();
      });
  }

 listimage(imageurl:string){
    let myStyles ={
      'background':'url('+imageurl+') no-repeat',
      'background-size':'100% 100%'
    }

    return myStyles;
  }


  openPage(item){
    this.navCtrl.push(SublistPage,item);
  }

//   deleteItem(item)
//   {
//     const alert = this.alertCtrl.create({
//       title: 'Confirm delete?',
//       message: 'Do you really want to delete this category?',
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel',
//           handler: () => {
//             console.log('Cancel clicked');
//           }
//         },
//         {
//           text: 'Delete',
//           handler: () => {
//             this.delCat(item);
//           }
//         }
//       ]
//     });
//     alert.present();
//   }
//
// delCat(item)
// {
//   let newparam = "id=" + item.id;
//   this.ss.dataList(newparam,"deleteMainCategoryData.php")
//   .then((response)=>{
//     alert("Category successfully deleted!");
//     this.listitem();
//   })
//   .catch((Error)=>{
//     // alert("Insert Data Error");
//   })
// }


  getItems(ev: any) {
      // Reset items back to all of the items

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }else{
        this.items=this.backup_items;
      }
    }

  onCancel(onCancel){
    this.items=this.backup_items;
    this.showme=false;
  }

  seachshow()
  {
    if(this.showme == true)
    {
      this.showme = false;
    }
    else
    {
      this.showme = true;
    }
  }

  showLP(){
    let i;
    this.showme = false;
    if(this.showpopover==false)
    {
      for(i=0; i<this.items.length; i++)
      {
      // console.log(this.items[i].name);
      // console.log(this.items[i].id);
        this.countries.push({
          name: this.items[i].name,
          id: this.items[i].id,
          selected: false,
        })
      }
      this.showpopover=true;
    }
    else
    this.showpopover=false;
  }

  view_photo(image_path:string,title:string){
    PhotoViewer.show(image_path,title);
  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(MorePage);
      popover.present({
        ev: myEvent

      });
  }

  adminonly(){
    if(this.ss.readData("loginSts"))
      return true;
    else
      return false;
  }

  checkPermission()
  {
    if(this.ss.readData("delete_action"))
      return true;
    else
      return false;
  }
}
