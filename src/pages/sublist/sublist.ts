import { Component, ViewChild } from '@angular/core';
import { Content, ViewController, PopoverController, NavController, NavParams,LoadingController, Events, AlertController, ActionSheetController } from 'ionic-angular';
import{Servercon} from '../../providers/servercon'
import{DetailPage} from '../detail/detail'
import { UpdatecontentPage } from '../updatecontent/updatecontent';

@Component({
  template: `
     <ion-list color="light">
     <ion-item (click)="filterSub(99)">
     <img src="assets/eye.png" item-left width="20%" height="20%"/>
             所有
    </ion-item>
       <ion-item (click)="filterSub(0)">
       <img src="assets/foodicon1.png" item-left width="27px" height="27px"/>
               食尚
      </ion-item>
      <ion-item (click)="filterSub(2)">
      <img src="assets/familyicon1.png" item-left width="27px" height="27px"/>
      親子活动
      </ion-item>
      <ion-item (click)="filterSub(1)">
      <img src="assets/globe1.png" item-left width="27px" height="27px"/>
              發現之旅
     </ion-item>
     </ion-list>
      `
})
export class FilterPage {

  constructor(public viewCtrl: ViewController, public popoverCtrl: PopoverController, public events: Events) {
  }

  filterSub(filtercode)
  {
    this.events.publish("filtercode", filtercode);
    this.viewCtrl.dismiss();
  }
}


@Component({
  selector: 'page-sublist',
  templateUrl: 'sublist.html'
})
export class SublistPage {
items:any=[];
start:any;
end:any;
total:any;
title:string;
backup_items:any=[];
showme:boolean;
limititem:any;
papa:any;
popo: any;
lokasi: any;
code:number = 0;

obj: any;
locations = [];
showlocpage: boolean = false;
display: any;

@ViewChild(Content) content: Content;


  constructor(public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public events: Events, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public ss:Servercon) {

    this.showme=false;
    this.start=10;
    this.end=10;
    this.total=0;

  }

  ionViewDidLoad() {
    this.content.scrollToTop();
    this.locations = [];
    let direct = this.navParams.get('locname');

    if(direct !== undefined)
    {
      console.log("Direct Wash: " + this.navParams.get("id"));
      this.washData(direct);
    }
    else
    {
      console.log("Normal Clicked: " + this.navParams.get("id"));
      let param = "id="+this.navParams.get("id")+"&subid=0&start=0&end=10&type=0";
      this.title=this.navParams.get("name");
      // console.log(this.navParams.data);
      this.listitem(param);
      this.subFilter();
      this.getLocation();
    }
  }

  showLP()
  {
    this.showlocpage = true;
    this.showme = false;
  }

  presentAS(item)
  {
    console.log(this.adminonly());
    console.log(this.checkPermission())
    if(this.adminonly() == true){
      if(this.checkPermission() == true)
      {
        let actionSheet = this.actionSheetCtrl.create({
          buttons: [
            {
              text: 'Edit',
              handler: () => {
                this.editSublist(item);
              }
            },
            {
              text: 'Delete',
              handler: () => {
                this.delSublist(item);
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
      }
      else
      {
        let actionSheet = this.actionSheetCtrl.create({
          buttons: [
            {
              text: 'Edit',
              handler: () => {
                this.editSublist(item);
              }
            }
          ]
        });
        actionSheet.present();
      }
  }
  else
  {
  }
}

  adminonly(){
  if(this.ss.readData("loginSts") == 1)
  return true;
  else
  return false;
}

checkPermission()
{
  if(this.ss.readData("delete_action") == 1)
    return true;
  else
    return false;
}

  delSublist(item)
  {
    const alert = this.alertCtrl.create({
      title: 'Confirm delete?',
      message: 'Do you really want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.delContent(item);
          }
        }
      ]
    });
    alert.present();
  }


delContent(item)
{
  console.log(item);
  let newparam = "content_id=" + item.content_id + "&category_id=" + item.category_id;
  this.ss.dataList(newparam,"deleteContent.php")
  .then((response)=>{
    alert("Item successfully deleted!");
    this.ionViewDidLoad();
  })
  .catch((Error)=>{
    // alert("Insert Data Error");
  })
}

  editSublist(item) {
    let param = "category_id="+item.category_id+"&content_id="+item.content_id;
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    loading.present();
    this.ss.dataList(param,"getContentDetail.php").then((response)=>{
        this.obj = response;
        let detailItem = this.obj.Data;
        loading.dismiss();
        this.navCtrl.push(UpdatecontentPage, {detailItem});
      }).catch((Error)=>{
        console.log("Connection Error"+Error);
        loading.dismiss();
        });

  }

  washData(loc)
  {
    this.lokasi = loc;
    this.start = 10;
    this.showlocpage = false;
    this.popo = "main_category_id=" + this.navParams.get("id") + "&location=" + loc + "&start=0&end=10";
    console.log(this.popo);
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    loading.present();
     this.ss.dataList(this.popo,"washDatabyLocation.php").then((response)=>{

       this.content.scrollToTop();
       this.items = undefined;
    this.items =response;
    // this.total= this.items.total;
    //this.start=this.items.start;
    //this.end=this.items.end;
    this.items=this.items.Data;
    console.log(this.items);
    this.backup_items=this.items;

    loading.dismiss();
      }).catch((Error)=>{
    console.log("Connection Error"+Error);
    loading.dismiss();
        });
  }

  getLocation()
  {
    let i;

    let param = "main_category_id=" + this.navParams.get("id");
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
           english: english
         });
       }




    loading.dismiss();
      }).catch((Error)=>{
    console.log("Connection Error"+Error);
    loading.dismiss();
        });
  }


  subFilter()
  {
    this.events.subscribe("filtercode", (code) => {
      if(code == 99)
      {
        this.papa = undefined;
        this.ionViewDidLoad();
      }
      else
      {
        this.code = code;
        // this.start = 0;
        // this.end = 0;
        // this.lokasi = undefined;
        this.papa = "id="+this.navParams.get("id")+"&subid=0&start=0&end=10&type=" + code;
        this.filteritem(this.papa);
      }
    })

    this.events.subscribe("deletion", (data) => {
      if(this.papa !== undefined)
      {
        //means its filtered before, need to show filtered result
        this.filteritem(this.papa);
      }
      else if(this.popo !== undefined)
      {
        //means its filtered by location before, need show filtered result;
        this.washData(this.lokasi);
      }
      else
      {
        //means it does not filtered before, need to show full list with refresh
        let param = "id="+this.navParams.get("id")+"&subid=0&start=0&end=10&type=0";
        this.listitem(param);
      }
    })

    this.events.subscribe("edition", (data) => {
      if(this.papa !== undefined)
      {
        //means its filtered before, need to show filtered result
        this.filteritem(this.papa);
      }
      else if(this.popo !== undefined)
      {
        //means its filtered by location before, need show filtered result;
        this.washData(this.lokasi);
      }
      else
      {
        //means it does not filtered before, need to show full list with refresh
        let param = "id="+this.navParams.get("id")+"&subid=0&start=0&end=10&type=0";
        this.listitem(param);
      }


    })
  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(FilterPage);
      popover.present({
        ev: myEvent

      });
  }

  filteritem(param)
  {
    this.lokasi = undefined;
    this.start = 10;


  let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  loading.present();
   this.ss.dataList(param,"getSubCategoryById_BK.php").then((response)=>{

     this.items = undefined;
  this.items =response;
  this.total= this.items.total;
  //this.start=this.items.start;
  //this.end=this.items.end;
  this.items=this.items.Data;
  console.log(this.items);
  this.backup_items=this.items;

  loading.dismiss();
  this.content.scrollToTop();
    }).catch((Error)=>{
  console.log("Connection Error"+Error);
  loading.dismiss();
      });
  }

listitem(param)
{


let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
loading.present();
 this.ss.dataList(param,"getSubCategoryById.php").then((response)=>{

// console.log("Initialized item: ");
// console.log(this.items);
this.items = undefined;
this.items =response;
this.total= this.items.total;
//this.start=this.items.start;
//this.end=this.items.end;
this.items=this.items.Data;
console.log(this.items);
this.backup_items=this.items;

loading.dismiss();
  }).catch((Error)=>{
console.log("Connection Error"+Error);
loading.dismiss();
    });
}


doInfinite(infiniteScroll)
{

  if(this.lokasi !== undefined)
  {
    console.log("doing infinite scroll for location")
    this.papa = undefined;
  // if(this.total>=this.start &&  this.showme==false)
  // {
  let param = "main_category_id=" + this.navParams.get("id") + "&location=" + this.lokasi + "&start="+this.start+"&end="+this.end;

 console.log("param limit"+param);
 this.ss.dataList(param,"washDatabyLocation.php").then((response)=>{
this.limititem =response;
this.total= this.limititem.total;
this.start=parseInt(this.limititem.start)+10;
console.log(this.limititem.Data);
if(this.limititem.Data != null)
{
  this.limititem.Data.forEach(element => {
    this.items.push(element);
    //this.backup_items.push(element);
  });
}

this.limititem="";
 infiniteScroll.complete();

});
  // }
 //  else
 //  {
 // infiniteScroll.complete();
 //
  // }
}
else if(this.papa !== undefined)
{
  console.log("doing infinite scroll for type filtering")
  this.lokasi = undefined;
  let param = "id="+this.navParams.get("id")+"&subid=0&start=" + this.start + "&end=" + this.end + "&type=" + this.code;
  console.log("Doing infinite for " + param);
  this.ss.dataList(param,"getSubCategoryById_BK.php").then((response)=>{

    this.limititem = undefined;
    this.limititem =response;
    this.total= this.limititem.total;
    this.start=parseInt(this.limititem.start)+10;
    console.log(this.limititem.Data);
    this.limititem.Data.forEach(element => {
      this.items.push(element);
    //this.backup_items.push(element);
    });

    this.limititem="";
     infiniteScroll.complete();

   }).catch((Error)=>{
 console.log("Connection Error"+Error);
     });
}
else
{
  console.log("doing infinite scroll for normal occasion")
  // if(this.total>=this.start &&  this.showme==false)
  // {

 let param = "id="+this.navParams.get("id")+"&subid=0&start="+this.start+"&end="+this.end;
 console.log("param limit"+param);
 this.ss.dataList(param,"getSubCategoryById.php").then((response)=>{
console.log("")
this.limititem =response;
this.total= this.limititem.total;
this.start=parseInt(this.limititem.start)+10;
this.limititem.Data.forEach(element => {
  this.items.push(element);
//this.backup_items.push(element);
});

this.limititem="";
 infiniteScroll.complete();

});
  // }
 //  else
 //  {
 // infiniteScroll.complete();
 //
 //  }
}


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
    this.items=[];

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items

    if (val && val.trim() != '' && val.length>1) {

let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
loading.present();
let id = this.navParams.get('id');
 let param = "search_string=" + val +  "&id=" + id + "&subid=0&start=0&end=25";
 // console.log(this)
 //console.log("param limit"+param);
 this.ss.dataList(param,"searchEngine.php").then((response)=>{
loading.dismiss();
this.limititem =response;
this.total= this.limititem.total;
//this.start=parseInt(this.limititem.start)+10;
this.limititem.Data.forEach(element => {
  this.items.push(element);
//this.backup_items.push(element);
});

this.limititem="";

});

/*
      this.items = this.items.filter((item) => {
        return (item.content_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
   })

   */

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
