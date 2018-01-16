import { Component } from '@angular/core';
import { NavController, NavParams ,ActionSheetController,LoadingController,
  ViewController,ToastController, AlertController} from 'ionic-angular';
import {Camera, Transfer} from 'ionic-native';
import{Servercon} from '../../providers/servercon'
import{HomePage} from '../home/home'
import{GalleryPage} from '../gallery/gallery'

@Component({
  selector: 'page-updategallery',
  templateUrl: 'updategallery.html'
})
export class UpdategalleryPage {

  public base64Image: string;
  image_path:string;
  desc:string;
  param:string;
  page:string;
  retrunPage:any;
  status:boolean;
  imageUrl: any;
  imageName: any;
  imgFileURL: any;
  imgUpdateRes: any;
  galleryData: any;
  imageId: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public actionSheetCtrl: ActionSheetController,
      public ss:Servercon,
      public loadingCtrl: LoadingController,
      public viewCtrl: ViewController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController
  ) {
        this.galleryData = this.navParams.get('galleryItem');
        this.desc = this.galleryData.sub;
        this.image_path = this.galleryData.tmp;
        this.imgFileURL = this.galleryData.tmp;
        this.imageId = this.galleryData.id;
        this.page="insertContentImageBatch.php";
        this.param="";
        this.retrunPage=HomePage;
        this.status=true;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BannersPage');
if(this.navParams.get("page"))
{
this.page= this.navParams.get("page");
this.param=this.navParams.get("param")+"&";
 this.retrunPage=GalleryPage;
 this.status=false;

 console.log('getparam', this.param);
}

}


    updateContentImg(imageUrl){
        let imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;

        let param = "image_id="+this.imageId+"&name="+''+"&description="+this.desc+"&image_path="+this.imgFileURL;

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this.ss.updateContentImage(param, 'updateContentImage.php')
            .then((res) => {
                loading.dismiss();
                console.log('res', res);
                this.imgUpdateRes = res;
                this.navCtrl.pop();
                let alert = this.alertCtrl.create({
                    subTitle: this.imgUpdateRes.Response.responseMessage,
                    buttons: ['OK']
                });
                alert.present();
            })
            .catch((err) => {
                loading.dismiss();
                console.log('err', err);
            });
    }

    updateContentImgExist(){
        let param = "image_id="+this.imageId+"&name="+''+"&description="+this.desc+"&image_path="+this.image_path;

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this.ss.updateContentImage(param, 'updateContentImage.php')
            .then((res) => {
                loading.dismiss();
                console.log('res', res);
                this.imgUpdateRes = res;
                this.navCtrl.pop();
                let alert = this.alertCtrl.create({
                    subTitle: this.imgUpdateRes.Response.responseMessage,
                    buttons: ['OK']
                });
                alert.present();
            })
            .catch((err) => {
                loading.dismiss();
                console.log('err', err);
            });
    }

  insertContentImg(imageUrl){
    let imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    this.imgFileURL = this.ss.fileURL + imgName;

    this.param =this.param+ "description_list="+this.desc+
    "&image_path_list="+this.imgFileURL;

    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

    console.log(this.page+"?"+this.param);

    loading.present();
    this.ss.dataList(this.param,this.page).then((response)=>{
        console.log('res', response);
        loading.dismiss();
        this.presentToast("uploaded successfully");

      }).catch((Error)=>{
          console.log("Connection Error"+Error);
          this.presentToast(Error);

          loading.dismiss();
        });
  }

  uploadFile(imgurl){
      console.log('enter');
      const fileTransfer = new Transfer();
      console.log('enter', imgurl);

      let options = {
          fileKey: 'file',
          fileName: this.imageName,
          mimeType: "multipart/form-data",
          chunkedMode: false,
          params: {
              'file': this.imageName,
          }
      }

      console.log('oprtion', options);
      console.log('url', this.ss.fileURL + this.imageName);

    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

    loading.present();

      fileTransfer.upload(imgurl, this.ss.ServerURL+"uploadFile.php" , options, true)
      .then(
          (data) => {
              loading.dismiss();
              console.log('aaa', data);
              this.updateContentImg(imgurl);
          },
          (err) => {
              loading.dismiss();
              console.log('err', err);
      });

  }

 takePicture(){
    Camera.getPicture({
        destinationType: 1,
        correctOrientation: true
    }).then((imageData) => {
        this.base64Image = imageData;
        this.image_path = imageData;
        this.imageUrl = imageData.replace('file://','');
        this.imageName = imageData.substring(imageData.lastIndexOf("/") + 1);

        console.log('222', imageData.replace('file://',''));
        console.log('sub', imageData.substring(imageData.lastIndexOf("/") + 1));

    }, (err) => {
        console.log(err);
    });

}


browsePicture()
{
        Camera.getPicture({
            sourceType: 2,
            correctOrientation: true
        }).then((imageData) => {
            console.log('browse', imageData)
        // imageData is a base64 encoded string
            this.base64Image = imageData;
            this.image_path = imageData;

            let imageSplit = imageData;
            imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));

            this.imageUrl = imageSplit.replace('file://','');
            this.imageName = imageSplit.substring(imageData.lastIndexOf("/") + 1);

            console.log('1', imageSplit);
            console.log('2', this.imageUrl);
            console.log('3', this.imageName);
        // this.camer_upload();
        }, (err) => {
            console.log(err);
        });

}

upload(){

  const fileTransfer = new Transfer();
  var options: any;

  options = {
     fileKey: 'file',
     fileName: 'bwlf.jpg',
     mimeType:"multipart/form-data"
  }
  fileTransfer.upload(this.image_path,this.ss.ServerURL+"upload.php" , options)
   .then((data) => {
    let datas=JSON.parse(JSON.stringify(data));
    this.image_path= datas.response;
   }, (err) => {
       console.log(err)
        console.log("err"+ JSON.stringify(err)+this.ss.ServerURL+"upload.php")
   })
//fileTransfer.abort();
}

camer_upload(){

  const fileTransfer = new Transfer();
  var options: any;

  options = {
     fileKey: 'file',
     fileName: 'bwlf.jpg',

  }
  fileTransfer.upload(this.image_path,this.ss.ServerURL+"upload.php" , options)
   .then((data) => {
    let datas=JSON.parse(JSON.stringify(data));
    this.image_path= datas.response;
   }, (err) => {
       console.log(err)
        console.log("err"+ JSON.stringify(err)+this.ss.ServerURL+"upload.php")
   })
//fileTransfer.abort();
}

 presentToast(info:string) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 3000
    });
    toast.present();
  }

 savebanner()
 {
     console.log('enter');
    if(this.imageUrl){
        console.log('camera');
        this.uploadFile(this.imageUrl);
    }else{
        console.log('exist');
        this.updateContentImgExist();
    }
}



presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Upload Image',
     buttons: [
       {
         text: 'Camera',
         icon: 'camera',
         handler: () => {
         this.takePicture();
         }
       },
       {
         text: 'Browser',
        icon:'image',
         handler: () => {
           this.browsePicture();
         }
       },
       {
         text: 'Cancel',
        icon:'close',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }

cancel()
{
  this.navCtrl.pop();
//   if(this.status)
//   {
//  this.navCtrl.setRoot(this.retrunPage);
// }
// else
// {
//   this.viewCtrl.dismiss();
// }
}

}
