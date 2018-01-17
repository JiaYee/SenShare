import { Component } from '@angular/core';
import { NavController, NavParams ,ActionSheetController,LoadingController,
  ViewController,ToastController, Platform, Events } from 'ionic-angular';
import {Camera, Transfer, File, FilePath, FileChooser, ImageResizer} from 'ionic-native';
import{Servercon} from '../../providers/servercon'
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import{HomePage} from '../home/home';
import{EventPage} from '../event/event';

declare var cordova: any;

@Component({
  selector: 'page-addcategory',
  templateUrl: 'addcategory.html'
})
export class AddcategoryPage {
    public resolvePath: any;
  public lastImage: string = null;
  image_path:string;
  param:any;
  public base64Image: string;
  page:string;
  item:any;
  retrunPage:string;
  homepage:any;
  eventpage:any;
  name:string;
  type:string;
  rate:any;
  imageUrl: any;
  imageName: string;
  imgFileURL: string;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public ss:Servercon,
    public events: Events,
    private imagePicker: ImagePicker,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController
  ) {
    this.image_path="assets/upi.jpg";
    this.page="insertMainCategoryData.php";
    this.homepage=HomePage;
    this.eventpage=EventPage;
    this.name="";

    this.type="1";
    this.rate="";

    this.retrunPage=this.homepage;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcategoryPage');
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
        console.log('cordova', cordova.file.externalRootDirectory);
        console.log('newFileName', newFileName);

        File.copyFile(namePath, currentName, cordova.file.externalRootDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }, error => {
            console.log('Error while storing file.');
        });
    }

    pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.externalRootDirectory + img;
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
        // this.base64Image = "data:image/jpeg;base64," + imageData;
        this.image_path = imageData;

        // this.imageUrl = imageData.replace('file://','');
        // this.imageName = imageData.substring(imageData.lastIndexOf("/") + 1);

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

browsePicture(sourceType){
  Camera.getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
  }).then((imageData) => {
      console.log('browse', imageData)
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


upload(imgurl){
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
            this.addCategory(imgurl);
        },
        (err) => {
            loading.dismiss();
            console.log('err', err);
    });
//   console.log('upload');
//   const fileTransfer = new Transfer();
//   var options: any;

//   options = {
//      fileKey: 'file',
//      fileName: 'bwlf.jpg',
//      mimeType:"multipart/form-data"
//   }
//   fileTransfer.upload(this.image_path,this.ss.ServerURL+"upload.php" , options)
//    .then((data) => {
//      console.log('upload', data);
//     let datas=JSON.parse(JSON.stringify(data));
//     this.image_path= datas.response;
//    }, (err) => {
//        console.log(err)
//         console.log("err"+ JSON.stringify(err)+this.ss.ServerURL+"upload.php")
//    })
// //fileTransfer.abort();

}

  addCategory(imageUrl){
    let imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    this.imgFileURL = this.ss.fileURL + imgName;
    let user_id = this.ss.readData("user_id");

    this.param = "user_id="+user_id+"&name="+this.name+"&image_path="+this.imgFileURL+"&type="+this.type+"&valid_flag="+"1";

    console.log('aaa', this.imgFileURL);
    console.log('bbb', this.param);

    /* this.image_path="assets/upi.jpg";
    this.page="insertMainCategoryData.php";
    this.homepage=HomePage;this.image_path
    this.name="";

    this.type="";
    this.rate="";

    this.param =this.param+ "description="+this.desc+
    "&image_path="+this.image_path.replace(/^.*[\\\/]/, '');
    */

    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

    console.log(this.page+"?"+this.param);

    loading.present();

    this.ss.createCategory(this.param,this.page).then((response)=>{
        console.log('resres', response);

        loading.dismiss();

        this.navCtrl.pop();
        this.events.publish("maincatedit", "true");


        this.presentToast("uploaded successfully");

        // if(this.type=='1')
        //   this.nav.push(this.homepage);
        // else
        //   this.nav.push(this.eventpage);

    }).catch((Error)=>{
        console.log("Connection Error"+Error);
        this.presentToast(Error);

        loading.dismiss();
    });
  }

camer_upload(){
console.log('camupload');
  const fileTransfer = new Transfer();
  var options: any;

  options = {
     fileKey: 'file',
     fileName: 'bwlf.jpg',

  }
  fileTransfer.upload(this.image_path,this.ss.ServerURL+"upload.php" , options)
   .then((data) => {
     console.log('cam upload', data);
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

  save(){
    this.upload(this.lastImage);
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

  cancel(){
    this.navCtrl.pop();
    // this.navCtrl.setRoot(this.retrunPage);
  }
}
