import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController ,AlertController, PopoverController,ViewController,ToastController,
ActionSheetController,ModalController,Platform, Events} from 'ionic-angular';
import { PhotoViewer ,LaunchNavigator,SocialSharing} from 'ionic-native';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { VideoEditor, TranscodeOptions, CreateThumbnailOptions } from '@ionic-native/video-editor';
import { VideoPlayer } from '@ionic-native/video-player';
// import {StreamingMedia, StreamingVideoOptions} from 'ionic-native';
// import { MediaCapture, MediaFile, CaptureError } from 'ionic-native';
import { DeviceOrientation, DeviceOrientationCompassHeading } from 'ionic-native';
import{Servercon} from '../../providers/servercon';
import{GalleryPage} from '../gallery/gallery';
import{BannersPage} from '../banners/banners';
import { GalleryModal } from 'ionic-gallery-modal';
import { UpdatecontentPage } from '../updatecontent/updatecontent';
import { UpdategalleryPage } from '../updategallery/updategallery';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  template: `
    <ion-list color="light">
      <button ion-item (click)="addme(1)">Malaysia</button>
      <button ion-item (click)="addme(2)">Asia Pacific</button>
      <button ion-item (click)="addme(3)">World</button>
     <!-- <button ion-item (click)="addme(3)">Remove</button>
     -->
      </ion-list>
  `
})

export class PopoverPage {
  id:any;

constructor(public viewCtrl: ViewController,
  public navParams: NavParams,
  public loadingCtrl: LoadingController,
   public ss:Servercon,
   public toastCtrl: ToastController,
   public camera: Camera,
   public transfer: Transfer,
   public file: File,
   public filePath: FilePath,
 ) {

this.id = this.navParams.get("id");

  }



 presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Added Successfully',
      duration: 3000
    });
    toast.present();
  }





addme(seg:string)

{


let param ="id="+this.id+"&segment="+seg;

//alert(param);



let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
loading.present();
this.ss.dataList(param,"updateContentSegments.php").then((response)=>{
loading.dismiss();
 this.presentToast();
  }).catch((Error)=>{
//console.log("Connection Error"+Error);
loading.dismiss();
    });

  this.viewCtrl.dismiss();
}


}

// Popoveredit component
@Component({
  template: `
    <ion-list>
      <ion-list-header>Admin</ion-list-header>
      <button ion-item (click)="close()">Edit</button>
      <button ion-item *ngIf="checkPermission()" (click)="deleteItem()">Delete</button>
    </ion-list>
  `
})
export class PopoverEdit {
  public getDetailItem: any;

  constructor(
    public viewCtrl: ViewController,
    public ss: Servercon,
    public events: Events,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.getDetailItem = this.navParams.get('detailItem');
  }

  checkPermission()
  {
    if(this.ss.readData("delete_action") == 1)
      return true;
    else
      return false;
  }

  deleteItem()
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
            this.delContent();
          }
        }
      ]
    });
    alert.present();
  }

delContent()
{
  this.viewCtrl.dismiss();
  let newparam = "content_id=" + this.getDetailItem.id + "&category_id=" + this.getDetailItem.category_id;
  this.ss.dataList(newparam,"deleteContent.php")
  .then((response)=>{
    alert("Item successfully deleted!")
    this.events.publish("deletion", "true");
  })
  .catch((Error)=>{
    // alert("Insert Data Error");
  })
}

  close() {
    this.viewCtrl.dismiss().then(()=> {
      this.navCtrl.push(UpdatecontentPage, {
        detailItem: this.getDetailItem
      });
    });
  }
}
// End of popoveredit component

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
image_path :any;
item:any;
obj:any;
items:any
title:string;
param:string;
storeitem:any[];
tt:string;
gallery:any;
gallerypage:any;
public base64Image: string;
image_path1 :any;
desc:string;
banner:any;
vgallery:any;
photos:any[];
video_path:any;
deleteRes: any;

compressed: any;
thumburi: any;
thumbs_path: any;
oriname: any;
loading:any;

showaddvideopage: boolean = false;
vidpath: any;
thumbpath: any;
vidtitle: any;
viddesc: any



selected: any;




  constructor(
  private mediaCapture: MediaCapture,
  private transfer: FileTransfer,
  public navCtrl: NavController,
  public navParams: NavParams,
  public Photoviewer:PhotoViewer,
  public loadingCtrl: LoadingController,
  public ss:Servercon,
  public popoverCtrl: PopoverController,
  public toastCtrl: ToastController,
  public modalCtrl: ModalController,
  public events: Events,
  public screenOrientation:ScreenOrientation,
  public actionSheetCtrl: ActionSheetController,
  public platform: Platform,
  public streamingMedia: StreamingMedia,
  public videoPlayer: VideoPlayer,
  public camera: Camera,
  public iab: InAppBrowser,
  public videoEditor: VideoEditor,
  public alertCtrl: AlertController){
    this.thumbpath="assets/upv.jpg";
this.gallerypage= GalleryPage;
this.banner=BannersPage;
this.items ={
  categoryName: "",
    id: "",
    name: "",
    description: "",
    type: "",
    address: "",
    phone_office: "",
    phone_mobile: "",
    business_hour: "",
    weekday_business_hour: "",
    weekend_business_hour: "",
    website_url: "",
    image_path: "",
    latitude: "",
    longitude: "",
    category_id: "",
    timestamp: "",
    segment: ""
};
this.tt="details";
//ScreenOrientation.lockOrientation('portrait');

events.subscribe('deletion', (data) => {
  // user and time are the same arguments passed in `events.publish(user, time)`
  this.navCtrl.pop();
});

events.subscribe('edition', (data) => {
  // user and time are the same arguments passed in `events.publish(user, time)`
  this.listitem(this.param);
});

  }


  ionViewDidLoad() {
    this.screenOrientation.unlock();
this.item=this.navParams.data;
// this.image_path=this.navParams.get("image_path");
// this.title=this.navParams.get("content_name");
console.log(this.item)
if(this.item.content_id)
this.param="category_id="+this.item.category_id+"&content_id="+this.item.content_id;
else
this.param="category_id="+this.item.category_id+"&content_id="+this.item.id;
this.listitem(this.param);

DeviceOrientation.getCurrentHeading().then(
  (data: DeviceOrientationCompassHeading) => console.log(JSON.stringify(data)),
  (error: any) => console.log("err"+JSON.stringify(error))
);
}

selectVideo(vid)
{
  this.selected = vid;
  console.log(this.selected);
}

deleteGal(gal)
{
  // console.log(item);
  const alert = this.alertCtrl.create({
    title: 'Confirm delete?',
    message: 'Do you really want to delete this photo?',
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
          this.deleteImage(gal);
        }
      }
    ]
  });
  alert.present();
}


deleteVid(vid)
{
  if(this.adminonly())
  {
    const alert = this.alertCtrl.create({
      title: 'Confirm delete?',
      message: 'Do you really want to delete this video?',
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
            this.delVid(vid);
          }
        }
      ]
    });
    alert.present();
  }
}

delVid(item)
{
let newparam = "play_id=" + item.play_id + "&content_id=" + item.content_id + "&category_id=" + item.category_id;
this.ss.dataList(newparam,"deleteContentPlay.php")
.then((response)=>{
  alert("Video successfully deleted!");
  this.getVGallery(this.param);
})
.catch((Error)=>{
  // alert("Insert Data Error");
})
}



deleteImage(galleryItem){
  let param = this.param + "&image_id="+galleryItem.id;

  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();

  this.ss.deleteGallery(param, 'deleteContentImage.php')
    .then((res) => {
      loading.dismiss();
      this.deleteRes = res;

      alert("Image successfully deleted!")
      this.getGallery(this.param);

      console.log('deletesuccess', res);
    })
    .catch((err) => {
      this.deleteRes = err;
      loading.dismiss();

      let alert = this.alertCtrl.create({
          subTitle: this.deleteRes.Response.responseMessage,
          buttons: ['OK']
      });
      alert.present();

      console.log('deleteerr', err);
    });
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

openEdit(galleryItem){
  if(this.adminonly()){
    // if(this.checkPermission())
    // {
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Edit',
            handler: () => {
              this.navCtrl.push(UpdategalleryPage, {
                galleryItem: galleryItem
              });
            }
          },
          {
            text: 'Delete',
            handler: () => {
              this.deleteGal(galleryItem);
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

}
}

/* detail of item */

popOverEdit(myEvent){
  let popover = this.popoverCtrl.create(PopoverEdit, {
    detailItem: this.items
  });
  popover.present({
    ev: myEvent
  });
}

listitem(param:string)
{

let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
loading.present();
this.ss.dataList(param,"getContentDetail.php").then((response)=>{
this.obj =response;
this.items=this.obj.Data;
this.image_path = this.items.image_path;
this.title = this.items.name;
console.log(this.items);
loading.dismiss();
  }).catch((Error)=>{
console.log("Connection Error"+Error);
loading.dismiss();
    });
//ScreenOrientation.lockOrientation('portrait');
}






view_photo(image_path:string,title:string)
{
PhotoViewer.show(image_path,title);

}

navigater(address:string)
{

LaunchNavigator.navigate(address)
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
 );
}


navigaterll(address:string)
{

LaunchNavigator.navigate(address)
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
 );
}



presentPopover(myEvent,itemid) {
    let popover = this.popoverCtrl.create(PopoverPage, {id:itemid});
    popover.present({
      ev: myEvent

    });
  }

// sharing link

sharelink(category_id:string,content_id:string)
{
  let link = this.ss.ServerURL+"content.php?id="+category_id+"&content_id="+content_id;
//alert(link);


SocialSharing.share(this.title, 'Betweenlifestyle',this.image_path, link).then(() => {
  // Success!
}).catch(() => {
  // Error!
});



}

 presentToast() {
    let toast = this.toastCtrl.create({
      message: 'favourite added successfully',
      duration: 3000
    });
    toast.present();
  }


// favourite save

favo(item:any)
{
this.ss.saveDataset(item.id,item);
this.presentToast();
if(this.ss.readData("record"))
{
let a =this.ss.readData("record")+","+item.id;
this.ss.addRecordIdentdity("record",a);
}
else
{
this.ss.addRecordIdentdity("record",item.id);
}
console.log(this.dataIdenti())
}

removfavo(id)
{
this.dataidneti_remove(id);
}

checkfavo(id)
{
 if(this.ss.readData(id))
 {
return 1;
 }
 else
 {
return 2;
 }

}


dataIdenti()
{
let records:string;
records=this.ss.readRecordIdentdity("record");
let ids =records.split(",");
return ids;
}

dataidneti_remove(id)
{
  let list =this.dataIdenti();

for (var i = 0; i <list.length; i++) {

    if (list[i] === id) {
      list.splice(i,1);

    }
}
this.ss.addRecordIdentdity("record",list.toString());
this.ss.deleteData(id);
}

/* detail of item  end*/

/* Image Gallery */

 getGallery(param:string)
{

  console.log('ppp', param);

let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

loading.present();
this.ss.dataList(param,"getContentGallery.php").then((response)=>{
this.obj =response;
console.log('galleryres', response);
this.gallery=this.obj.Data;
console.log(this.gallery);
loading.dismiss();
  }).catch((Error)=>{
console.log("Connection Error"+Error);
loading.dismiss();
    });

}

getGallery2(){

if(this.item.content_id)
this.param="category_id="+this.item.category_id+"&content_id="+this.item.content_id;
else
this.param="category_id="+this.item.category_id+"&content_id="+this.item.id;

let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

loading.present();
this.ss.dataList(this.param,"getContentGallery.php").then((response)=>{
this.obj =response;
console.log('galleryres', response);
this.gallery=this.obj.Data;
console.log(this.gallery);
loading.dismiss();
  }).catch((Error)=>{
console.log("Connection Error"+Error);
loading.dismiss();
    });
}

 getVGallery(param:string)
{

let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

loading.present();
this.ss.dataList(param,"getContentPlay.php").then((response)=>{
this.obj =response;
this.vgallery=response;
this.vgallery=this.obj.Data;
console.log(this.vgallery);
this.selectVideo(this.vgallery[0])
//console.log(JSON.stringify(this.vgallery));
loading.dismiss();
  }).catch((Error)=>{
console.log("Connection Error"+Error);
loading.dismiss();
    });

}

openVideo(v:string)
{
  const browser = this.iab.create(v, "_self", "location=no,fullscreen=yes");
}

openGallery(index:any)
{
  this.photos=[];
for (var key in this.gallery) { this.photos.push(
{
  url:this.gallery[key]['src'],
  // title: "Testing caption with very very very long caption and description and something outside there to test this thing very long sentence i think its okay by nw can already enough long gua"
  title:this.gallery[key]['sub']
}

  ) }

//ScreenOrientation.unlockOrientation();
//ScreenOrientation.unlockOrientation();
//console.log( this.photos);
// let profileModal = this.modalCtrl.create(this.gallerypage,{cindex:index,gallery:this.gallery})

console.log(this.photos);

 let profileModal= this.modalCtrl.create(GalleryModal, {
  photos: this.photos,
  initialSlide: index,
   closeIcon: "close",

});

profileModal.present();

 profileModal.onDidDismiss(data => {
   });

}


/* Image Gallery End */

openBanner()
{
let profileModal = this.modalCtrl.create(this.banner,{param:"content_id="+this.item.content_id+"&name_list="+this.items.name,page:"insertContentImageBatch.php"})
profileModal.onDidDismiss(() => {
  this.getGallery(this.param);
});
profileModal.present();
}

presentActionSheet()
{
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Upload Video',
    buttons: [
      {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
        this.takeVideo();
        }
      },
      {
        text: 'Browser',
       icon:'image',
        handler: () => {
          this.browseVideo();
        }
      },
    ]
  });

  actionSheet.present();
}

cancel()
{
  this.showaddvideopage = false;
}

promptVideo()
{
  this.showaddvideopage = true;
  this.vidpath = undefined;
  this.vidtitle = undefined;
  this.viddesc = undefined;
  this.thumbpath = "assets/upv.jpg";

}

saveVideo()
{
  if(this.viddesc == undefined)
  {
    this.viddesc = "";
  }
  if(this.vidpath !== undefined && this.vidtitle !== undefined)
  {
    this.showaddvideopage = false;
    this.insertData(this.vidpath, this.thumbpath, this.vidtitle, this.viddesc);
  }
}

browseVideo()
{
  let options: CameraOptions = {
    quality: 100,
    destinationType: 1,
    sourceType: 2,
    mediaType: 1,
  }

  this.camera.getPicture(options).then((imageData) => {
    let fullPath = "file://" + imageData;
    this.oriname = imageData.split(/[/ ]+/).pop();
    this.compressVideo(fullPath);
  }, (err) => {
   // Handle error
  });
}

takeVideo()
{
  let options: CaptureImageOptions = { limit: 1 };

  this.mediaCapture.captureVideo(options)
  .then((data: MediaFile[]) => {
    let datasource = data[0];
    this.oriname = datasource.name;
    this.compressVideo(datasource.fullPath);
  })
  .catch((err) => {
    console.log("Capture Error");
    return;
  })
}

compressVideo(fullPath)
{
  this.loading = this.loadingCtrl.create({
    content: 'Uploading Video...'
  });
  this.loading.present();

  let options: TranscodeOptions = {
  fileUri: fullPath,
  outputFileName: "output_" + this.oriname,
  outputFileType: this.videoEditor.OutputFileType.MPEG4,
  maintainAspectRatio: true,
  width: 1920,
  height: 1200,
  }

  this.videoEditor.transcodeVideo(options)
  .then((fileUri) => {
    // alert(fileUri);
    this.createThumb(fileUri);
  })
  .catch((err) => {
    alert("Compress Error");
  })
}

createThumb(fileUri)
{
  let options: CreateThumbnailOptions = {
    fileUri: fileUri,
    outputFileName: "thumbsnail_" + this.oriname,
    atTime: 2,
  }

  this.videoEditor.createThumbnail(options)
  .then((thumbUri) => {
    // alert(thumbUri);
    // this.thumburi = thumbUri;
    this.uploadThumb(fileUri, thumbUri);
  })
  .catch((err) => {
    alert("Create Thumb Error!");
  })
}

uploadThumb(fileUri, thumbUri)
{
  //upload Thumbsnail
  let fileTransfer: FileTransferObject = this.transfer.create();
  let options: FileUploadOptions;
  options = {
  fileName: 'bwls.jpg',
  mimeType: 'image/jpeg',
  chunkedMode: false,
  }

  let uploadPHP = this.ss.ServerURL + "videoupload.php"

  fileTransfer.upload(thumbUri,encodeURI(uploadPHP), options)
  .then((data) => {
  let datas=JSON.parse(JSON.stringify(data));
  let thumbPath = datas.response;

  // alert(thumbPath);
  this.uploadVideo(fileUri, thumbPath);
  })
  .catch((err) => {
    alert("Upload Thumb Error!");
  })
}

uploadVideo(fileUri, thumbPath)
{
  let fileTransfer: FileTransferObject = this.transfer.create();
  let options: FileUploadOptions;
  options = {
    fileName: 'bwls.mp4',
    mimeType: 'video/mp4',
    chunkedMode: false,
  }

  let uploadPHP = this.ss.ServerURL + "videoupload.php"

  fileTransfer.upload(fileUri,encodeURI(uploadPHP), options)
  .then((data) => {
  let datas=JSON.parse(JSON.stringify(data));
  let videoPath = datas.response;

  // alert(videoPath);
  this.vidpath = videoPath;
  this.thumbpath = thumbPath;
  this.loading.dismiss();
  // this.insertData(videoPath, thumbPath);
})
  .catch((err) => {
    alert("Upload Video Error!");
  })
}

insertData(videoPath, thumbPath, title, desc)
{
  let newparam = this.param + "&image_path=" + thumbPath + "&video_path=" + videoPath + "&datetime=&name=" + title + "&description=" + desc

  this.ss.dataList(newparam,"videoaddtest.php")
  .then((response)=>{
    alert("Video successfully uploaded!\n")
    this.getVGallery(this.param);
  })
  .catch((Error)=>{
    alert("Insert Data Error");
  })
}




checkme(sts:string)
{
if( sts=="" || sts=="-1.0000000" || sts == "0.0000000"){
  return false;
}else{
  return true;
}
}

open_url(link)
{
  let url = "http://" + link;
  window.open(url);
}

}
