import { Component } from '@angular/core';
import { Camera, Transfer,Base64ToGallery, File, FilePath, FileChooser, ImageResizer } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Geolocation } from 'ionic-native';
import { Servercon } from '../../providers/servercon'
import { HomePage } from '../home/home';
import { EventPage } from '../event/event';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import {
            NavController,
            NavParams,
            ActionSheetController,
            LoadingController,
            ViewController,
            ToastController,
            AlertController
        } from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-addcontent',
  templateUrl: 'addcontent.html'
})
export class AddcontentPage {
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
    latitude: any
    longitude: any;
    locationFlag: boolean = false;
    infoFlag: boolean = false;
    insertRes: any;
    coordinates: any;

    constructor(
        public platform: Platform,
        private navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public ss:Servercon,
        public fb: FormBuilder,
        private imagePicker: ImagePicker,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController
    ){
        this.image_path="assets/upi.jpg";
        this.page="insertMainCategoryData.php";

        this.createContent = this.fb.group({
            mainCat: ['16'],
            name: [''],
            desc: [''],
            address: [''],
            type: ['0'],
            phoneNo: [''],
            weekday: [''],
            weekend: [''],
            website: ['']
        });

        this.type = this.createContent.controls['type'];
    }

    ionViewDidLoad(){
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

        // get current location coordinates
        Geolocation.getCurrentPosition()
            .then(
                (res) => {
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

    removeLoc(){
        this.locationFlag = true;
        this.latitude = '';
        this.longitude = '';
    }

    addLoc(){
        this.locationFlag = false;
        this.latitude = this.coordinates.latitude;
        this.longitude = this.coordinates.longitude;
    }

    selectType(){
      console.log("this is " + this.type.value)
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

  var url = "http://yoururl/upload.php";

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
                this.uploadRes = data;
                var errStr = this.uploadRes.response;
                var subStr = "-100";

                console.log('qqqq', errStr.includes(subStr));

                if(errStr.includes(subStr)){
                    this.promptAlert('', 'File size is too big');
                    this.insertContent(imgurl, this.retrieveForm);

                    console.log('haserror');
                }else{
                    this.insertContent(imgurl, this.retrieveForm);
                }
            },
            (err) => {
                loading.dismiss();
                console.log('err', err);
        });

        //fileTransfer.abort();

        // this.ss.uploadFile(imgurl, 'uploadFile.php').then(
        //     (res) => {
        //         console.log('res', res);
        //         this.uploadRes = res;
        //         let responseCode = this.uploadRes.Response.responseCode;

        //         if(responseCode == 200){
        //             this.insertContent(this.imageUrl, this.retrieveForm);
        //         }
        //     },
        //     (err) => {
        //         console.log('err', err);
        //     }
        // );
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

            // console.log('take', imageData);

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

    browse(sourceType){
        this.imagePicker.getPictures({
            maximumImagesCount: 1
        }).then(
            (res) => {
                console.log('Image URI: ', res);
                for (var i = 0; i < res.length; i++) {
                    console.log('Image URI: ' + res[i]);
                    var imageData = res[i];
                    this.image_path = res[i];
                }

                if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                FilePath.resolveNativePath(imageData)
                    .then(filePath => {
                        console.log('filepath', filePath);
                        console.log('photo');
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
            },
            (err) => {
                console.log('Image URI err: ' + err);
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
            // this.image_path = imageData;
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

    insertContent(imageUrl, form){
        let imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;

        console.log('sub', this.imgFileURL);

        let user_id = this.ss.readData("user_id");

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this.ss.insertContent("user_id="+user_id+"&name="+form.name+"&desc="+form.desc+"&type="+this.type.value+"&address="+form.address+"&phone_office="+form.phoneNo+"&phone_mobile="+''+"&weekday_business_hour="+form.weekday+"&weekend_business_hour="+form.weekend+"&website_url="+form.website+"&latitude="+this.latitude+"&longitude="+this.longitude+"&image_path="+this.imgFileURL+"&category_id="+form.mainCat, 'insertContent.php').then(
            (res) => {
                loading.dismiss();
                console.log('res', res);
                this.insertRes = res;
                let resMsg = this.insertRes.Response.responseMessage;

                this.navCtrl.popTo(HomePage);
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
        this.retrieveForm = this.createContent.value;

        if(this.retrieveForm.name && this.retrieveForm.mainCat){

            //check data duplication
            this.ss.isContentExist("content_id="+this.retrieveForm.name+"&main_category_id="+this.retrieveForm.mainCat, 'isContentExist.php').then(
                (res) => {
                    console.log('success', res);

                    this.isExistRes = res;
                    let responseCode = this.isExistRes.Response.responseCode;

                    if(responseCode == 200){
                        if(this.lastImage){
                            console.log('imgae', this.lastImage);
                            this.upload(this.lastImage);
                        }else{
                            console.log('ni imgae');
                        }
                    }
                },
                (err) => {
                    console.log('error', err);
                }
            );
        }
    }
}
