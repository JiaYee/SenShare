import { Component } from '@angular/core';
import { NavController, NavParams ,ActionSheetController,LoadingController,
  ViewController,ToastController, Platform} from 'ionic-angular';
import {Camera, Transfer, File, FilePath, FileChooser, ImageResizer} from 'ionic-native';
import{Servercon} from '../../providers/servercon';
import{HomePage} from '../home/home';
import{GalleryPage} from '../gallery/gallery';

declare var cordova: any;

@Component({
  selector: 'page-banners',
  templateUrl: 'banners.html'
})
export class BannersPage {
    public resolvePath: any;
  public lastImage: string = null;
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController
  ,public ss:Servercon,public loadingCtrl: LoadingController,public viewCtrl: ViewController
  ,public toastCtrl: ToastController,
  public platform: Platform
  ) {
  this.desc = '';
  this.image_path="assets/upi.jpg";
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


  insertContentImg(imageUrl){
    let imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    this.imgFileURL = this.ss.fileURL + imgName;

    this.param =this.param+ "description_list="+this.desc+
    "&image_path_list="+this.imgFileURL;

    console.log('path', this.imgFileURL);

    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

    console.log(this.page+"?"+this.param);

    loading.present();
    this.ss.dataList(this.param,this.page).then((response)=>{
        console.log('res', response);
        loading.dismiss();

        this.navCtrl.pop();

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

  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
  targetPath = targetPath.replace('file://','');

 console.log('lastpath', targetPath);
  // File name only
  var filename = this.lastImage;

      let options = {
          fileKey: 'file',
          fileName: filename,
          mimeType: "multipart/form-data",
          chunkedMode: false,
          params: {
              'fileName': filename,
          }
      }

      console.log('oprtion', options);
      console.log('url', this.ss.fileURL + filename);

      let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

      loading.present();

      fileTransfer.upload(targetPath, this.ss.ServerURL+"uploadFile.php" , options, true)
      .then(
          (data) => {
              loading.dismiss();
              console.log('aaa', data);
              this.insertContentImg(imgurl);
          },
          (err) => {
              loading.dismiss();
              console.log('err', err);
      });

  }

    createFileName() {
        var d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";
        return newFileName;
    }

    copyFileToLocalDir(namePath, currentName, newFileName) {
        console.log('namePath', namePath);
        console.log('currentName', currentName);
        console.log('cordova', cordova.file.dataDirectory);
        console.log('newFileName', newFileName);

        File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }, error => {
            console.log('Error while storing file.');
        });
    }

    pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

 takePicture(sourceType){
    Camera.getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
    }).then((imageData) => {
        // this.base64Image = imageData;
        this.image_path = imageData;
        // this.imageUrl = imageData.replace('file://','');
        // this.imageName = imageData.substring(imageData.lastIndexOf("/") + 1);

        // console.log('222', imageData.replace('file://',''));
        // console.log('sub', imageData.substring(imageData.lastIndexOf("/") + 1));

            if (this.platform.is('android') && sourceType === Camera.PictureSourceType.CAMERA) {
            FilePath.resolveNativePath(imageData)
                .then(filePath => {
                    console.log('filepath', filePath);

                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imageData.substring(imageData.lastIndexOf('/') + 1);
                console.log('currentfilename', currentName );
                console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1 ));
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
            } else {
            var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
            var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }

    }, (err) => {
        console.log(err);
    });

}

    chooseFile(sourceType){
        FileChooser.open().then(
            (res) => {
                console.log('choosepath', res);

                if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                FilePath.resolveNativePath(res)
                    .then(filePath => {
                        console.log('filepath', filePath);
                        this.resizeImage(filePath);
                        this.resolvePath = filePath;
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
                        console.log('currentfilename', currentName );
                        console.log('currentfilename', filePath.substring(filePath.lastIndexOf('/') + 1 ));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
                } else {
                    var currentName = this.resolvePath.substr(this.resolvePath.lastIndexOf('/') + 1);
                    var correctPath = this.resolvePath.substr(0, this.resolvePath.lastIndexOf('/') + 1);
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                }
            },
            (err) => {
                console.log('choosepatherr', err);
            }
        );
    }

    resizeImage(uri){
        let options = {
            uri: uri,
            quality: 100,
            width: 800,
            height: 800
        }

        ImageResizer.resize(options).then(
            (res) => {
                console.log('resizepath', res);
                this.image_path = res;
            },
            (err) => {
                console.log('resizepath', err);
            }
        );
    }

browsePicture(sourceType)
{
        Camera.getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then((imageData) => {
            // console.log('browse', imageData)
        // imageData is a base64 encoded string
            // this.base64Image = imageData;
            this.image_path = imageData;

            // let imageSplit = imageData;
            // imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));

            // this.imageUrl = imageSplit.replace('file://','');
            // this.imageName = imageSplit.substring(imageData.lastIndexOf("/") + 1);

            // console.log('1', imageSplit);
            // console.log('2', this.imageUrl);
            // console.log('3', this.imageName);
        // this.camer_upload();

            if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
            FilePath.resolveNativePath(imageData)
                .then(filePath => {
                    console.log('filepath', filePath);

                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);

                let imageSplit = imageData;
                    imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));

                let currentName = imageSplit.substring(imageData.lastIndexOf("/") + 1);

                console.log('currentfilename', currentName );
                console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1 ));
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
            } else {
            var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
            var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }

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
  this.uploadFile(this.lastImage);
}



presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Upload Image',
     buttons: [
       {
         text: 'Camera',
         icon: 'camera',
         handler: () => {
         this.takePicture(Camera.PictureSourceType.CAMERA);
         }
       },
       {
         text: 'Browser',
        icon:'image',
         handler: () => {
           this.browsePicture(Camera.PictureSourceType.PHOTOLIBRARY);
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
  if(this.status)
  {
 this.navCtrl.setRoot(this.retrunPage);
}
else
{
  this.viewCtrl.dismiss();
}
}

}
