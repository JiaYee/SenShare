import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import{Servercon} from '../../providers/servercon'
import{SublistPage} from '../sublist/sublist'
import{AddcategoryPage} from '../addcategory/addcategory';
@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

 items:any;
backup_items:any;
showme:boolean;
addcategorypage:any;
   constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public ss:Servercon,public loadingCtrl: LoadingController) {
      this.showme=false;
       this.addcategorypage=AddcategoryPage;
   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
    this.listitem();
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

listitem()
{


let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
loading.present();
 this.ss.dataList("type=2&start=0","getMainCategoryDataByType.php").then((response)=>{


this.items =response;
this.items=this.items.Data;
this.backup_items= this.items;
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


  this.navCtrl.push(SublistPage,item);
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
