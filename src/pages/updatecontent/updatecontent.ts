import { Component } from '@angular/core';
import { Camera,Transfer,Base64ToGallery, File, FilePath, FileChooser, ImageResizer  } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import { Servercon } from '../../providers/servercon'
import { HomePage } from '../home/home';
import { Platform, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import {
            NavController,
            NavParams,
            ActionSheetController,
            LoadingController,
            AlertController
        } from 'ionic-angular';
        import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
declare var cordova: any;

@Component({
  selector: 'page-updatecontent',
  templateUrl: 'updatecontent.html'
})
export class UpdatecontentPage {
    public resolvePath: any;
    public lastImage: string = null;
    private createContent: FormGroup;
    image_path:string;
    param:string;
    public base64Image: string;
    page:string;
    item:any;
    retrunPage:string;
    name:any;
    rate:any;
    mainCatRes: any;
    mainCatList: any;
    retrieveForm: any;
    isExistRes: any;
    type: AbstractControl;
    imageUrl: any;
    uploadRes: any;
    imageName: string;
    imgFileURL: string;
    latitude: any;
    longitude: any;
    locationFlag: boolean = false;
    infoFlag: boolean = false;
    insertRes: any;
    detailItem: any;
    coordinates: any;

    locations = [];
    obj: any;
    ob: any;
    loc = [];


    constructor(
      private imagePicker: ImagePicker,

        public platform: Platform,
        private navParams: NavParams,
        private navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public ss:Servercon,
        public fb: FormBuilder,
        public events: Events,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController
    ){
        this.detailItem = this.navParams.get('detailItem');
        console.log('ooo', this.detailItem);
        this.image_path = this.detailItem.image_path;
        this.latitude = this.detailItem.latitude;
        this.longitude = this.detailItem.longitude;
        // console.log(this.latitude);
        // console.log(this.longitude);

        if(this.latitude == "0.0000000" || this.longitude == "0.0000000")
        {
          this.locationFlag = true;
        }
        this.page="insertMainCategoryData.php";

        this.createContent = this.fb.group({
            mainCat: [this.detailItem.category_id ],
            name: [this.detailItem.name],
            desc: [this.detailItem.description],
            address: [this.detailItem.address],
            type: [this.detailItem.type],
            phoneNo: [this.detailItem.phone_office],
            weekday: [this.detailItem.weekday_business_hour],
            weekend: [this.detailItem.weekend_business_hour],
            website: [this.detailItem.website_url],
        });

        this.type = this.createContent.controls['type'];
    }

    ionViewDidLoad(){

      this.getLocations();
      this.getSelectedLocation();
        // get main category list
        this.ss.getMainCategory().then(
            (res) => {
                this.mainCatRes = res;
                this.mainCatList = this.mainCatRes.Data;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    deleteLocation(location)
    {
      let param = "content_id=" + this.detailItem.id;

      let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
      loading.present();
      this.ss.dataList(param,"deleteContent_Location.php").then((response)=>{
          loading.dismiss();
          this.insertLocation(location);
        }).catch((Error)=>{
          console.log("Connection Error"+Error);
          loading.dismiss();
          });
    }

    insertLocation(location)
    {
      // console.log(location);
      let param = "location=" + location + "&content_id=" + this.detailItem.id + "&main_category_id=" + this.detailItem.category_id;

      let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
      loading.present();
      this.ss.dataList(param,"insertContent_Location.php").then((response)=>{
          loading.dismiss();
        }).catch((Error)=>{
          console.log("Connection Error"+Error);
          loading.dismiss();
          });
    }

    getSelectedLocation()
    {
      let param = "content_id=" + this.detailItem.id;

      let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
      loading.present();
      this.ss.dataList(param,"getContent_Location.php").then((response)=>{

          this.ob = response;

          this.loc.push(this.ob.Data[0].location);
          console.log(this.loc);

          this.loc = this.ob.Data[0].location;
          loading.dismiss();
        }).catch((Error)=>{
          console.log("Connection Error"+Error);
          loading.dismiss();
          });
    }

    getLocations()
    {
      let i;
      let param = "main_category_id=" + this.detailItem.category_id;

      let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
      loading.present();
      this.ss.dataList(param,"getMain_Location.php").then((response)=>{

          this.obj = response;
          this.locations = this.obj.Data;
          // let json = this.obj.Data;
          // console.log(json);

          // for(i=0; i<=json.length; i++)
          // {
            // this.locations.push(this.obj.Data[i].name);
            // console.log(this.locations)
          // }


          loading.dismiss();
        }).catch((Error)=>{
          // console.log("Connection Error"+Error);
          loading.dismiss();
          });
    }

    removeLoc(){
      let alert = this.alertCtrl.create({
        title: 'Attention!',
        message: 'You are trying to remove the GPS location, are you sure?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              this.locationFlag = true;
              this.latitude = '';
              this.longitude = '';
            }
          }
        ]
      });
      alert.present();

    }

    addLoc(){
        this.locationFlag = false;
        // this.latitude = this.coordinates.latitude;
        // this.longitude = this.coordinates.longitude;
        // get current location coordinates
        Geolocation.getCurrentPosition()
            .then(
                (res) => {
                    console.log('location', res);
                    this.coordinates = res.coords;
                    this.latitude = res.coords.latitude;
                    this.longitude = res.coords.longitude;
                }
            )
            .catch(
                (err) => {
                    console.log('error', err);
                }
            );
    }

    selectType(){
        if(this.type.value == 0){
            console.log('ooo', 'zero');
            this.infoFlag = false;
        }else{
            console.log('ooo', 'one');
            this.infoFlag = true;
        }
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
                this.updateContent(imgurl, this.createContent.value);
            },
            (err) => {
                loading.dismiss();
                console.log('err', err);
        });

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
            // console.log('www', imageData);
            // this.base64Image = imageData;
            this.image_path = imageData;
            // console.log('qqq', this.image_path);
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
            // console.log('browse', imageData)
            // this.base64Image = imageData;
            this.image_path = imageData;

            // let imageSplit = imageData;
            // imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
            // this.imageUrl = imageSplit.replace('file://','');
            // this.imageName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
            // console.log('1', imageSplit);
            // console.log('2', this.imageUrl);
            // console.log('3', this.imageName);
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

    checkVerification(){

    }

    updateExistContent(imageUrl, form){

        this.imgFileURL = imageUrl

        console.log('sub', this.imgFileURL);

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this.ss.updateContent("name="+form.name+"&desc="+form.desc+"&type="+this.type.value+"&address="+form.address+"&phone_office="+form.phoneNo+"&phone_mobile="+''+"&weekday_business_hour="+form.weekday+"&weekend_business_hour="+form.weekend+"&website_url="+form.website+"&latitude="+this.latitude+"&longitude="+this.longitude+"&image_path="+this.imgFileURL+"&category_id="+form.mainCat+"&id="+this.detailItem.id, 'updateContent.php').then(
            (res) => {
                loading.dismiss();
                console.log('res', res);
                this.insertRes = res;
                let resMsg = this.insertRes.Response.responseMessage;

                // this.navCtrl.popTo(HomePage);
                this.navCtrl.pop();
                this.events.publish("edition", "true");

                this.promptAlert('', resMsg);
            },
            (err) => {
                loading.dismiss();
                console.log('err', err);
                this.insertRes = err;
                let resMsg = this.insertRes.Response.responseMessage;

                this.promptAlert('', resMsg);
            }
        );
    }

    updateContent(imageUrl, form){
        let imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;

        console.log('sub', this.imgFileURL);

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();
        console.log('form',form);
        this.ss.updateContent("name="+form.name+"&desc="+form.desc+"&type="+this.type.value+"&address="+form.address+"&phone_office="+form.phoneNo+"&phone_mobile="+''+"&weekday_business_hour="+form.weekday+"&weekend_business_hour="+form.weekend+"&website_url="+form.website+"&latitude="+this.latitude+"&longitude="+this.longitude+"&image_path="+this.imgFileURL+"&category_id="+form.mainCat+"&id="+this.detailItem.id, 'updateContent.php').then(
            (res) => {
                loading.dismiss();
                console.log('res', res);
                this.insertRes = res;
                let resMsg = this.insertRes.Response.responseMessage;

                // this.navCtrl.popTo(HomePage);
                this.navCtrl.pop();
                this.events.publish("edition", "true");

                this.promptAlert('', resMsg);
            },
            (err) => {
                loading.dismiss();
                console.log('err', err);
                this.insertRes = err;
                let resMsg = this.insertRes.Response.responseMessage;

                this.promptAlert('', resMsg);
            }
        );
    }

    onCancelClick(){
        this.navCtrl.pop();
    }

    promptAlert(title, subTitle){
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }

    submitForm(){
        var imgStr = this.image_path;

        if(imgStr.startsWith('http')){
            console.log('exist', this.createContent.value);
            this.updateExistContent(this.image_path, this.createContent.value);
        }else{
            console.log('no', this.createContent.value);
            this.upload(this.lastImage);
        }
    }
}
