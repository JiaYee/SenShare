webpackJsonp([0],{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BannersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gallery_gallery__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BannersPage = (function () {
    function BannersPage(navCtrl, navParams, actionSheetCtrl, ss, loadingCtrl, viewCtrl, toastCtrl, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ss = ss;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.lastImage = null;
        this.desc = '';
        this.image_path = "assets/upi.jpg";
        this.page = "insertContentImageBatch.php";
        this.param = "";
        this.retrunPage = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        this.status = true;
    }
    BannersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BannersPage');
        if (this.navParams.get("page")) {
            this.page = this.navParams.get("page");
            this.param = this.navParams.get("param") + "&";
            this.retrunPage = __WEBPACK_IMPORTED_MODULE_5__gallery_gallery__["a" /* GalleryPage */];
            this.status = false;
            console.log('getparam', this.param);
        }
    };
    BannersPage.prototype.insertContentImg = function (imageUrl) {
        var _this = this;
        var imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;
        this.param = this.param + "description_list=" + this.desc +
            "&image_path_list=" + this.imgFileURL;
        console.log('path', this.imgFileURL);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        console.log(this.page + "?" + this.param);
        loading.present();
        this.ss.dataList(this.param, this.page).then(function (response) {
            console.log('res', response);
            loading.dismiss();
            _this.navCtrl.pop();
            _this.presentToast("uploaded successfully");
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            _this.presentToast(Error);
            loading.dismiss();
        });
    };
    BannersPage.prototype.uploadFile = function (imgurl) {
        var _this = this;
        console.log('enter');
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["m" /* Transfer */]();
        console.log('enter', imgurl);
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        targetPath = targetPath.replace('file://', '');
        console.log('lastpath', targetPath);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            params: {
                'fileName': filename,
            }
        };
        console.log('oprtion', options);
        console.log('url', this.ss.fileURL + filename);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        fileTransfer.upload(targetPath, this.ss.ServerURL + "uploadFile.php", options, true)
            .then(function (data) {
            loading.dismiss();
            console.log('aaa', data);
            _this.insertContentImg(imgurl);
        }, function (err) {
            loading.dismiss();
            console.log('err', err);
        });
    };
    BannersPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    BannersPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        console.log('namePath', namePath);
        console.log('currentName', currentName);
        console.log('cordova', cordova.file.dataDirectory);
        console.log('newFileName', newFileName);
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* File */].copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            console.log('Error while storing file.');
        });
    };
    BannersPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    BannersPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            // this.base64Image = imageData;
            _this.image_path = imageData;
            // this.imageUrl = imageData.replace('file://','');
            // this.imageName = imageData.substring(imageData.lastIndexOf("/") + 1);
            // console.log('222', imageData.replace('file://',''));
            // console.log('sub', imageData.substring(imageData.lastIndexOf("/") + 1));
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA) {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imageData.substring(imageData.lastIndexOf('/') + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    BannersPage.prototype.chooseFile = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["d" /* FileChooser */].open().then(function (res) {
            console.log('choosepath', res);
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY) {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["e" /* FilePath */].resolveNativePath(res)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    _this.resizeImage(filePath);
                    _this.resolvePath = filePath;
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', filePath.substring(filePath.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = _this.resolvePath.substr(_this.resolvePath.lastIndexOf('/') + 1);
                var correctPath = _this.resolvePath.substr(0, _this.resolvePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log('choosepatherr', err);
        });
    };
    BannersPage.prototype.resizeImage = function (uri) {
        var _this = this;
        var options = {
            uri: uri,
            quality: 100,
            width: 800,
            height: 800
        };
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["g" /* ImageResizer */].resize(options).then(function (res) {
            console.log('resizepath', res);
            _this.image_path = res;
        }, function (err) {
            console.log('resizepath', err);
        });
    };
    BannersPage.prototype.browsePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            // console.log('browse', imageData)
            // imageData is a base64 encoded string
            // this.base64Image = imageData;
            _this.image_path = imageData;
            // let imageSplit = imageData;
            // imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
            // this.imageUrl = imageSplit.replace('file://','');
            // this.imageName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
            // console.log('1', imageSplit);
            // console.log('2', this.imageUrl);
            // console.log('3', this.imageName);
            // this.camer_upload();
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY) {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var imageSplit = imageData;
                    imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
                    var currentName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    BannersPage.prototype.upload = function () {
        var _this = this;
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["m" /* Transfer */]();
        var options;
        options = {
            fileKey: 'file',
            fileName: 'bwlf.jpg',
            mimeType: "multipart/form-data"
        };
        fileTransfer.upload(this.image_path, this.ss.ServerURL + "upload.php", options)
            .then(function (data) {
            var datas = JSON.parse(JSON.stringify(data));
            _this.image_path = datas.response;
        }, function (err) {
            console.log(err);
            console.log("err" + JSON.stringify(err) + _this.ss.ServerURL + "upload.php");
        });
        //fileTransfer.abort();
    };
    BannersPage.prototype.camer_upload = function () {
        var _this = this;
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["m" /* Transfer */]();
        var options;
        options = {
            fileKey: 'file',
            fileName: 'bwlf.jpg',
        };
        fileTransfer.upload(this.image_path, this.ss.ServerURL + "upload.php", options)
            .then(function (data) {
            var datas = JSON.parse(JSON.stringify(data));
            _this.image_path = datas.response;
        }, function (err) {
            console.log(err);
            console.log("err" + JSON.stringify(err) + _this.ss.ServerURL + "upload.php");
        });
        //fileTransfer.abort();
    };
    BannersPage.prototype.presentToast = function (info) {
        var toast = this.toastCtrl.create({
            message: info,
            duration: 3000
        });
        toast.present();
    };
    BannersPage.prototype.savebanner = function () {
        this.uploadFile(this.lastImage);
    };
    BannersPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Image',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePicture(__WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Browser',
                    icon: 'image',
                    handler: function () {
                        _this.browsePicture(__WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    BannersPage.prototype.cancel = function () {
        if (this.status) {
            this.navCtrl.setRoot(this.retrunPage);
        }
        else {
            this.viewCtrl.dismiss();
        }
    };
    BannersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-banners',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\banners\banners.html"*/'\n<ion-header>\n<ion-navbar color="darkbule">\n      <ion-title>Upload Image</ion-title>\n      <a tappable ion-button  clear menuToggle >\n        <ion-icon name="menu"></ion-icon>\n <!-- <img tappable src="assets/BLS_35.png"  class="logo_head"/> -->\n      </a>\n    \n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n  <!--\n  <ion-card>\n    <ion-card-content>\n      Hello World, this is my camera app\n\n      <button (click)="takePicture()">Take a Picture</button>\n\n      Latest Picture:\n      <img [src]="base64Image" *ngIf="base64Image" />\n    </ion-card-content>\n  </ion-card>\n\n-->\n\n<div>\n<ion-list color="light">\n\n\n  <ion-item >\n    <div>\n    <img [src]="image_path"  (click) ="presentActionSheet()"/>\n    </div>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Description</ion-label>\n    <!--<ion-input type="text" [(ngModel)]="desc"></ion-input>-->\n    <ion-textarea rows="3" type="text" [(ngModel)]="desc"></ion-textarea>\n  </ion-item>\n\n\n\n</ion-list>\n\n\n</div>\n <button ion-button full color="secondary" (click)="savebanner()">Save</button>\n <button ion-button full color="danger"  (click)="cancel()">Cancel</button>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\banners\banners.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_servercon__["a" /* Servercon */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */]])
    ], BannersPage);
    return BannersPage;
}());

//# sourceMappingURL=banners.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatecontentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UpdatecontentPage = (function () {
    function UpdatecontentPage(imagePicker, platform, navParams, navCtrl, actionSheetCtrl, ss, fb, events, alertCtrl, loadingCtrl) {
        this.imagePicker = imagePicker;
        this.platform = platform;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ss = ss;
        this.fb = fb;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.lastImage = null;
        this.locationFlag = false;
        this.infoFlag = false;
        this.locations = [];
        this.loc = [];
        this.detailItem = this.navParams.get('detailItem');
        console.log('ooo', this.detailItem);
        this.image_path = this.detailItem.image_path;
        this.latitude = this.detailItem.latitude;
        this.longitude = this.detailItem.longitude;
        // console.log(this.latitude);
        // console.log(this.longitude);
        if (this.latitude == "0.0000000" || this.longitude == "0.0000000") {
            this.locationFlag = true;
        }
        this.page = "insertMainCategoryData.php";
        this.createContent = this.fb.group({
            mainCat: [this.detailItem.category_id],
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
    UpdatecontentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getLocations();
        this.getSelectedLocation();
        // get main category list
        this.ss.getMainCategory().then(function (res) {
            _this.mainCatRes = res;
            _this.mainCatList = _this.mainCatRes.Data;
        }, function (err) {
            console.log(err);
        });
    };
    UpdatecontentPage.prototype.deleteLocation = function (location) {
        var _this = this;
        var param = "content_id=" + this.detailItem.id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "deleteContent_Location.php").then(function (response) {
            loading.dismiss();
            _this.insertLocation(location);
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    UpdatecontentPage.prototype.insertLocation = function (location) {
        // console.log(location);
        var param = "location=" + location + "&content_id=" + this.detailItem.id + "&main_category_id=" + this.detailItem.category_id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "insertContent_Location.php").then(function (response) {
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    UpdatecontentPage.prototype.getSelectedLocation = function () {
        var _this = this;
        var param = "content_id=" + this.detailItem.id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getContent_Location.php").then(function (response) {
            _this.ob = response;
            _this.loc.push(_this.ob.Data[0].location);
            console.log(_this.loc);
            _this.loc = _this.ob.Data[0].location;
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    UpdatecontentPage.prototype.getLocations = function () {
        var _this = this;
        var i;
        var param = "main_category_id=" + this.detailItem.category_id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getMain_Location.php").then(function (response) {
            _this.obj = response;
            _this.locations = _this.obj.Data;
            // let json = this.obj.Data;
            // console.log(json);
            // for(i=0; i<=json.length; i++)
            // {
            // this.locations.push(this.obj.Data[i].name);
            // console.log(this.locations)
            // }
            loading.dismiss();
        }).catch(function (Error) {
            // console.log("Connection Error"+Error);
            loading.dismiss();
        });
    };
    UpdatecontentPage.prototype.removeLoc = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Attention!',
            message: 'You are trying to remove the GPS location, are you sure?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        _this.locationFlag = true;
                        _this.latitude = '';
                        _this.longitude = '';
                    }
                }
            ]
        });
        alert.present();
    };
    UpdatecontentPage.prototype.addLoc = function () {
        var _this = this;
        this.locationFlag = false;
        // this.latitude = this.coordinates.latitude;
        // this.longitude = this.coordinates.longitude;
        // get current location coordinates
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["f" /* Geolocation */].getCurrentPosition()
            .then(function (res) {
            console.log('location', res);
            _this.coordinates = res.coords;
            _this.latitude = res.coords.latitude;
            _this.longitude = res.coords.longitude;
        })
            .catch(function (err) {
            console.log('error', err);
        });
    };
    UpdatecontentPage.prototype.selectType = function () {
        if (this.type.value == 0) {
            console.log('ooo', 'zero');
            this.infoFlag = false;
        }
        else {
            console.log('ooo', 'one');
            this.infoFlag = true;
        }
    };
    UpdatecontentPage.prototype.upload = function (imgurl) {
        var _this = this;
        console.log('enter');
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_1_ionic_native__["m" /* Transfer */]();
        console.log('enter', imgurl);
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        targetPath = targetPath.replace('file://', '');
        console.log('lastpath', targetPath);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            params: {
                'fileName': filename,
            }
        };
        console.log('oprtion', options);
        console.log('url', this.ss.fileURL + filename);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        fileTransfer.upload(targetPath, this.ss.ServerURL + "uploadFile.php", options, true)
            .then(function (data) {
            loading.dismiss();
            console.log('aaa', data);
            _this.updateContent(imgurl, _this.createContent.value);
        }, function (err) {
            loading.dismiss();
            console.log('err', err);
        });
    };
    UpdatecontentPage.prototype.camer_upload = function () {
        var _this = this;
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_1_ionic_native__["m" /* Transfer */]();
        var options;
        options = {
            fileKey: 'file',
            fileName: 'bwlf.jpg',
        };
        fileTransfer.upload(this.image_path, this.ss.ServerURL + "upload.php", options)
            .then(function (data) {
            var datas = JSON.parse(JSON.stringify(data));
            _this.image_path = datas.response;
        }, function (err) {
            console.log(err);
            console.log("err" + JSON.stringify(err) + _this.ss.ServerURL + "upload.php");
        });
        //fileTransfer.abort();
    };
    UpdatecontentPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    UpdatecontentPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        console.log('namePath', namePath);
        console.log('currentName', currentName);
        console.log('cordova', cordova.file.dataDirectory);
        console.log('newFileName', newFileName);
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["c" /* File */].copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            console.log('Error while storing file.');
        });
    };
    UpdatecontentPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    UpdatecontentPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            // console.log('www', imageData);
            // this.base64Image = imageData;
            _this.image_path = imageData;
            // console.log('qqq', this.image_path);
            // this.imageUrl = imageData.replace('file://','');
            // this.imageName = imageData.substring(imageData.lastIndexOf("/") + 1);
            // console.log('222', imageData.replace('file://',''));
            // console.log('sub', imageData.substring(imageData.lastIndexOf("/") + 1));
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA) {
                __WEBPACK_IMPORTED_MODULE_1_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imageData.substring(imageData.lastIndexOf('/') + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    UpdatecontentPage.prototype.resizeImage = function (uri) {
        var _this = this;
        var options = {
            uri: uri,
            quality: 100,
            width: 800,
            height: 800
        };
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["g" /* ImageResizer */].resize(options).then(function (res) {
            console.log('resizepath', res);
            _this.image_path = res;
        }, function (err) {
            console.log('resizepath', err);
        });
    };
    UpdatecontentPage.prototype.browsePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            // console.log('browse', imageData)
            // this.base64Image = imageData;
            _this.image_path = imageData;
            // let imageSplit = imageData;
            // imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
            // this.imageUrl = imageSplit.replace('file://','');
            // this.imageName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
            // console.log('1', imageSplit);
            // console.log('2', this.imageUrl);
            // console.log('3', this.imageName);
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY) {
                __WEBPACK_IMPORTED_MODULE_1_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var imageSplit = imageData;
                    imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
                    var currentName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    UpdatecontentPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Image',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePicture(__WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Browser',
                    icon: 'image',
                    handler: function () {
                        _this.browsePicture(__WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    UpdatecontentPage.prototype.checkVerification = function () {
    };
    UpdatecontentPage.prototype.updateExistContent = function (imageUrl, form) {
        var _this = this;
        this.imgFileURL = imageUrl;
        console.log('sub', this.imgFileURL);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.updateContent("name=" + form.name + "&desc=" + form.desc + "&type=" + this.type.value + "&address=" + form.address + "&phone_office=" + form.phoneNo + "&phone_mobile=" + '' + "&weekday_business_hour=" + form.weekday + "&weekend_business_hour=" + form.weekend + "&website_url=" + form.website + "&latitude=" + this.latitude + "&longitude=" + this.longitude + "&image_path=" + this.imgFileURL + "&category_id=" + form.mainCat + "&id=" + this.detailItem.id, 'updateContent.php').then(function (res) {
            loading.dismiss();
            console.log('res', res);
            _this.insertRes = res;
            var resMsg = _this.insertRes.Response.responseMessage;
            // this.navCtrl.popTo(HomePage);
            _this.navCtrl.pop();
            _this.events.publish("edition", "true");
            _this.promptAlert('', resMsg);
        }, function (err) {
            loading.dismiss();
            console.log('err', err);
            _this.insertRes = err;
            var resMsg = _this.insertRes.Response.responseMessage;
            _this.promptAlert('', resMsg);
        });
    };
    UpdatecontentPage.prototype.updateContent = function (imageUrl, form) {
        var _this = this;
        var imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;
        console.log('sub', this.imgFileURL);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        console.log('form', form);
        this.ss.updateContent("name=" + form.name + "&desc=" + form.desc + "&type=" + this.type.value + "&address=" + form.address + "&phone_office=" + form.phoneNo + "&phone_mobile=" + '' + "&weekday_business_hour=" + form.weekday + "&weekend_business_hour=" + form.weekend + "&website_url=" + form.website + "&latitude=" + this.latitude + "&longitude=" + this.longitude + "&image_path=" + this.imgFileURL + "&category_id=" + form.mainCat + "&id=" + this.detailItem.id, 'updateContent.php').then(function (res) {
            loading.dismiss();
            console.log('res', res);
            _this.insertRes = res;
            var resMsg = _this.insertRes.Response.responseMessage;
            // this.navCtrl.popTo(HomePage);
            _this.navCtrl.pop();
            _this.events.publish("edition", "true");
            _this.promptAlert('', resMsg);
        }, function (err) {
            loading.dismiss();
            console.log('err', err);
            _this.insertRes = err;
            var resMsg = _this.insertRes.Response.responseMessage;
            _this.promptAlert('', resMsg);
        });
    };
    UpdatecontentPage.prototype.onCancelClick = function () {
        this.navCtrl.pop();
    };
    UpdatecontentPage.prototype.promptAlert = function (title, subTitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    UpdatecontentPage.prototype.submitForm = function () {
        var imgStr = this.image_path;
        if (imgStr.startsWith('http')) {
            console.log('exist', this.createContent.value);
            this.updateExistContent(this.image_path, this.createContent.value);
        }
        else {
            console.log('no', this.createContent.value);
            this.upload(this.lastImage);
        }
    };
    UpdatecontentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-updatecontent',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\updatecontent\updatecontent.html"*/'<ion-header>\n  <ion-navbar color="darkbule">\n    <ion-title>Create Category</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <form [formGroup]="createContent">\n        <ion-list>\n\n            <ion-item>\n                <div>\n                    <img [src]="image_path"  (click) ="presentActionSheet()"/>\n                </div>\n            </ion-item>\n\n            <ion-label style="padding: 0 0 0 16px; margin-bottom: 0;" no-lines>\n                Main Category\n            </ion-label>\n\n            <ion-item>\n                <ion-select no-padding no-margin formControlName="mainCat">\n                    <ion-option *ngFor="let cat of mainCatList" value="{{cat.id}}">{{cat.name}}</ion-option>\n                </ion-select>\n            </ion-item>\n\n            <ion-item>\n                <ion-label stacked>Name:</ion-label>\n                <ion-textarea rows="5" type="text" placeholder="Name" formControlName="name"></ion-textarea>\n            </ion-item>\n\n            <!--<ion-item>\n                <ion-label stacked>Description:</ion-label>\n                <ion-input type="text" placeholder="Description" formControlName="desc"></ion-input>\n            </ion-item>-->\n\n            <!--<ion-item>\n                <ion-label stacked>Address:</ion-label>\n                <ion-input type="text" placeholder="Address" formControlName="address"></ion-input>\n            </ion-item>-->\n\n            <ion-item>\n                <ion-label stacked>Description:</ion-label>\n                <ion-textarea rows="10" type="text" placeholder="Description" formControlName="desc"></ion-textarea>\n            </ion-item>\n\n            <ion-item>\n                <ion-label stacked>Address:</ion-label>\n                <ion-textarea rows="5"  type="text" placeholder="Address" formControlName="address"></ion-textarea>\n            </ion-item>\n\n            <ion-list radio-group formControlName="type" (ionChange)="selectType()" no-lines>\n              <ion-list-header>\n                Type\n              </ion-list-header>\n              <ion-item>\n                <ion-label>食尚</ion-label>\n                <img src="assets/foodicon.png" item-left width="27px" height="27px"/>\n                <ion-radio value="0"></ion-radio>\n              </ion-item>\n              <ion-item>\n                <ion-label>親子活动</ion-label>\n                <img src="assets/familyicon.png" item-left width="27px" height="27px"/>\n                <ion-radio value="2"></ion-radio>\n              </ion-item>\n              <ion-item>\n                <ion-label>發現之旅</ion-label>\n                <img src="assets/globe.png" item-left width="27px" height="27px"/>\n                <ion-radio value="1"></ion-radio>\n              </ion-item>\n            </ion-list>\n\n            <!-- <ion-item>\n                <ion-label>Type</ion-label>\n                <ion-select formControlName="type" (ionChange)="selectType()">\n                    <ion-option value="0">Food</ion-option>\n                    <ion-option value="1">Discovery</ion-option>\n                </ion-select>\n            </ion-item> -->\n\n            <ion-item [hidden]="infoFlag">\n                <ion-label stacked>Phone:</ion-label>\n                <ion-input type="text" placeholder="Phone" formControlName="phoneNo"></ion-input>\n            </ion-item>\n\n            <ion-label style="padding: 0 0 0 16px; margin-bottom: 0;" no-lines [hidden]="infoFlag">\n                Business Hour\n            </ion-label>\n\n            <!--<ion-item [hidden]="infoFlag">\n                <ion-label stacked>Weekday:</ion-label>\n                <ion-input type="text" placeholder="Weekday Business hour" formControlName="weekday"></ion-input>\n            </ion-item>-->\n\n            <!--<ion-item [hidden]="infoFlag">\n                <ion-label stacked>Weekend:</ion-label>\n                <ion-input type="text" placeholder="Weekend Business hour" formControlName="weekend"></ion-input>\n            </ion-item>-->\n\n            <ion-item [hidden]="infoFlag">\n                <ion-label stacked>Weekday:</ion-label>\n                <ion-textarea rows="8" type="text" placeholder="Weekday Business hour" formControlName="weekday"></ion-textarea>\n            </ion-item>\n\n            <ion-item [hidden]="infoFlag">\n                <ion-label stacked>Weekend:</ion-label>\n                <ion-textarea rows="8" type="text" placeholder="Weekend Business hour" formControlName="weekend"></ion-textarea>\n            </ion-item>\n\n            <ion-item>\n                <ion-label stacked>Website:</ion-label>\n                <ion-input type="text" placeholder="Website" formControlName="website"></ion-input>\n            </ion-item>\n\n            <ion-item [hidden]="locationFlag">\n                <ion-label>\n                    GPS: {{latitude}}, {{longitude}}\n                </ion-label>\n            </ion-item>\n\n          </ion-list>\n        </form>\n\n        <ion-label stacked>Tag Location:</ion-label>\n        <ion-select mode="wp" class="tag" [(ngModel)]="loc" (ionChange)="deleteLocation(loc)">\n          <ion-option *ngFor="let location of locations" value="{{location.name}}">{{location.name}}</ion-option>\n        </ion-select>\n            <!-- <ion-label stacked>Tag Location</ion-label>\n            <tag-input class="tag" [maxItems]="1" [ngModel]="loc" (onAdd)="insertLocation($event.value)" (onRemove)="deleteLocation()" [onlyFromAutocomplete]="true">\n              <tag-input-dropdown [showDropdownIfEmpty]="true"\n              [autocompleteItems]="locations">\n            </tag-input-dropdown>\n          </tag-input> -->\n\n        <button ion-button full color="secondary" [hidden]="locationFlag" (click)="removeLoc()">Remove Location</button>\n        <button ion-button full color="secondary" [hidden]="!locationFlag" (click)="addLoc()">Add Location</button>\n        <button ion-button full color="secondary" (click)="submitForm()">Save</button>\n        <button ion-button full color="danger" (click)="onCancelClick()">Cancel</button>\n\n    <!-- <ion-list radio-group [(ngModel)]="loc">\n      <ion-list-header>\n        Locations\n      </ion-list-header>\n\n      <ion-item *ngFor="let location of locations">\n        <ion-label>{{location.name}}</ion-label>\n        <ion-radio (ionSelect)="deleteLocation(location.name)" value="{{location.name}}"></ion-radio>\n      </ion-item> -->\n\n    <!-- </ion-list> -->\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\updatecontent\updatecontent.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* LoadingController */]])
    ], UpdatecontentPage);
    return UpdatecontentPage;
}());

//# sourceMappingURL=updatecontent.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EarthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sublist_sublist__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__addcategory_addcategory__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EarthPage = (function () {
    function EarthPage(alertCtrl, navCtrl, navParams, ss, loadingCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ss = ss;
        this.loadingCtrl = loadingCtrl;
        this.showme = false;
        this.addcategorypage = __WEBPACK_IMPORTED_MODULE_4__addcategory_addcategory__["a" /* AddcategoryPage */];
    }
    EarthPage.prototype.ionViewDidLoad = function () {
        this.listitem();
    };
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
    EarthPage.prototype.listitem = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList("type=1&start=0", "getMainCategoryDataByType.php").then(function (response) {
            _this.items = response;
            _this.items = _this.items.Data;
            _this.backup_items = _this.items;
            //console.log(JSON.parse(this.items));
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    EarthPage.prototype.listimage = function (imageurl) {
        var myStyles = {
            'background': 'url(' + imageurl + ') no-repeat',
            'background-size': '100% 100%'
        };
        return myStyles;
    };
    EarthPage.prototype.openPage = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__sublist_sublist__["b" /* SublistPage */], item);
    };
    EarthPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.items = this.backup_items;
        }
    };
    EarthPage.prototype.onCancel = function (onCancel) {
        this.items = this.backup_items;
        this.showme = false;
    };
    EarthPage.prototype.seachshow = function () {
        if (this.showme == false)
            this.showme = true;
        else
            this.showme = false;
    };
    EarthPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-earth',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\earth\earth.html"*/'<ion-header>\n  <ion-navbar color="darkbule">\n      <ion-title>Earth</ion-title>\n      <a tappable ion-button  clear menuToggle >\n        <ion-icon name="menu"></ion-icon>\n <!-- <img tappable src="assets/BLS_35.png"  class="logo_head"/> -->\n      </a>\n\n  </ion-navbar>\n   <ion-searchbar *ngIf="showme" (ionInput)="getItems($event)" [showCancelButton]="shouldShowCancel"  (ionCancel)="onCancel($event)">></ion-searchbar>\n\n</ion-header>\n\n<ion-content >\n\n  <div class="img_item" *ngFor="let item of items" [ngStyle]="listimage(item.image_path)" style =" transform: translate3d(0px, 0px, 0px);" (click)="openPage(item)">\n  <ion-badge *ngIf="item.count"  color ="danger" item-right style="margin: 8px; width: 40px;">{{item.count}}</ion-badge>\n   <div class="bottom_txt">\n   <p> {{item.name}} </p>\n     </div>\n\n  </div>\n<ion-fab right bottom>\n\n\n\n<button ion-fab color="light"><ion-icon name="arrow-dropup"></ion-icon></button>\n    <ion-fab-list side="top">\n       <button ion-fab color="light" (click)="seachshow()"><ion-icon name="search"></ion-icon></button>\n       <button ion-fab color="light" [navPush]="addcategorypage"><ion-icon name="add"></ion-icon></button>\n    </ion-fab-list>\n\n\n</ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\earth\earth.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_servercon__["a" /* Servercon */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], EarthPage);
    return EarthPage;
}());

//# sourceMappingURL=earth.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FavePage = (function () {
    function FavePage(navCtrl, navParams, ss, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ss = ss;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.showme = false;
    }
    FavePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FavePage');
        if (this.ss.dataIdentiCheck()) {
            this.listitem();
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'Sorry No Favorite items',
                duration: 3000,
                position: 'middle'
            });
            toast.present();
        }
    };
    FavePage.prototype.listitem = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        //loading.present();
        this.items = this.ss.favodataList();
        this.backup_items = this.items;
        //loading.dismiss();
    };
    FavePage.prototype.listimage = function (imageurl) {
        var myStyles = {
            'background': 'url(' + imageurl + ') no-repeat',
            'background-size': '100% 100%'
        };
        return myStyles;
    };
    FavePage.prototype.openPage = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], item);
    };
    FavePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.items = this.backup_items;
        }
    };
    FavePage.prototype.onCancel = function (onCancel) {
        this.items = this.backup_items;
        this.showme = false;
    };
    FavePage.prototype.seachshow = function () {
        if (this.showme == false)
            this.showme = true;
        else
            this.showme = false;
    };
    FavePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-fave',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\fave\fave.html"*/'<ion-header>\n  <ion-navbar color="darkbule">\n      <ion-title>Favorite</ion-title>\n\n      <a tappable ion-button  clear menuToggle >\n        <ion-icon name="menu"></ion-icon>\n <!-- <img tappable src="assets/BLS_35.png"  class="logo_head"/> -->\n      </a>\n\n\n  </ion-navbar>\n   <ion-searchbar *ngIf="showme" (ionInput)="getItems($event)" [showCancelButton]="shouldShowCancel"  (ionCancel)="onCancel($event)">></ion-searchbar>\n\n</ion-header>\n\n<ion-content >\n\n  <div class="img_item" *ngFor="let item of items" [ngStyle]="listimage(item.image_path)" style =" transform: translate3d(0px, 0px, 0px);" (click)="openPage(item)">\n\n   <div class="bottom_txt">\n   <p> {{item.name}} </p>\n     </div>\n\n  </div>\n\n<ion-fab right bottom>\n <button ion-fab color="light" (click)="seachshow()"><ion-icon name="search"></ion-icon></button>\n\n</ion-fab>\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\fave\fave.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */]])
    ], FavePage);
    return FavePage;
}());

//# sourceMappingURL=fave.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToptenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__aboutus_aboutus__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ToptenPage = (function () {
    function ToptenPage(navCtrl, navParams, loadingCtrl, ss) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.ss = ss;
        this.showme = false;
        this.aboutuspage = __WEBPACK_IMPORTED_MODULE_4__aboutus_aboutus__["a" /* AboutusPage */];
        this.tt = "malaysia";
        this.listitem("segment=1");
    }
    ToptenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ToptenPage');
        //this.listitem();
        // this.my= this.myfliter('1',this.items);
    };
    ToptenPage.prototype.listitem = function (param) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getContentTopCategory.php").then(function (response) {
            _this.items = response;
            _this.items = _this.items.Data;
            _this.backup_items = _this.items;
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    ToptenPage.prototype.listimage = function (imageurl) {
        var myStyles = {
            'background': 'url(' + imageurl + ') no-repeat',
            'background-size': '100% 100%'
        };
        return myStyles;
    };
    ToptenPage.prototype.openPage = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], item);
    };
    ToptenPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.items = this.backup_items;
        }
    };
    ToptenPage.prototype.onCancel = function (onCancel) {
        this.items = this.backup_items;
        this.showme = false;
    };
    ToptenPage.prototype.seachshow = function () {
        if (this.showme == false)
            this.showme = true;
        else
            this.showme = false;
    };
    ToptenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-topten',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\topten\topten.html"*/'<ion-header>\n  <ion-navbar color="darkbule">\n    <a tappable ion-button  clear menuToggle >\n      <ion-icon name="menu"></ion-icon>\n<!-- <img tappable src="assets/BLS_35.png"  class="logo_head"/> -->\n    </a>\n    <ion-title>Top Thirty</ion-title>\n  </ion-navbar>\n <ion-searchbar *ngIf="showme" (ionInput)="getItems($event)" [showCancelButton]="shouldShowCancel"  (ionCancel)="onCancel($event)">></ion-searchbar>\n\n\n <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="tt">\n      <ion-segment-button value="malaysia"  (ionSelect)="listitem(\'segment=1\')">\n        Malaysia\n      </ion-segment-button>\n      <ion-segment-button value="asia"  (ionSelect)="listitem(\'segment=2\')">\n        Asia Pacific\n      </ion-segment-button>\n      <ion-segment-button value="world"  (ionSelect)="listitem(\'segment=3\')">\n        World\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n\n</ion-header>\n\n<ion-content>\n  <div [ngSwitch]="tt">\n\n    <ion-list *ngSwitchCase="\'malaysia\'">\n\n  <div   class="img_item" *ngFor="let item of items " [ngStyle]="listimage(item.image_path)" style =" transform: translate3d(0px, 0px, 0px);" (click)="openPage(item)">\n\n   <div class="bottom_txt">\n   <p> {{item.name}} </p>\n     </div>\n\n  </div>\n\n\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'asia\'" >\n\n      <div   class="img_item" *ngFor="let item of items " [ngStyle]="listimage(item.image_path)" style =" transform: translate3d(0px, 0px, 0px);" (click)="openPage(item)">\n\n   <div class="bottom_txt">\n   <p> {{item.name}} </p>\n     </div>\n\n  </div>\n\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'world\'" >\n\n      <div   class="img_item" *ngFor="let item of items " [ngStyle]="listimage(item.image_path)" style =" transform: translate3d(0px, 0px, 0px);" (click)="openPage(item)">\n\n   <div class="bottom_txt">\n   <p> {{item.name}} </p>\n     </div>\n\n  </div>\n\n    </ion-list>\n  </div>\n\n<ion-fab right bottom>\n <button ion-fab color="light" (click)="seachshow()"><ion-icon name="search"></ion-icon></button>\n\n</ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\topten\topten.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_servercon__["a" /* Servercon */]])
    ], ToptenPage);
    return ToptenPage;
}());

//# sourceMappingURL=topten.js.map

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 158;

/***/ }),

/***/ 201:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 201;

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Servercon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Servercon = (function () {
    function Servercon(http) {
        this.http = http;
        this.HeaderURL = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.HeaderURL.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log('Hello Server Provider');
        this.ServerURL = "http://betweenlifestyle.com/android/webservice/public-v4/";
        this.ServerURLi = "http://betweenlifestyle.com/android/webservice/public-v3/";
        this.fileURL = "http://betweenlifestyle.com/android/upload/";
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: this.HeaderURL
        });
    }
    Servercon.prototype.deleteGallery = function (param, page) {
        var _this = this;
        console.log('param', param);
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURL + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.updateContentImage = function (param, page) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURL + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.updateMainCat = function (param, page) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURL + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.updateContent = function (param, page) {
        var _this = this;
        console.log('update param', param);
        console.log('update url', page);
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURL + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.banner = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.ServerURL + "getHomeTop10.php")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.verification = function (param, page) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURLi + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.uploadFile = function (param, page) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURLi + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.insertContent = function (param, page) {
        var _this = this;
        console.log('param', param);
        // let yy = 'website_url=&weekend_business_hour=&category_id=16&phone_mobile=&weekday_business_hour=&phone_office=&name=JJ Hotel &image_path=http://betweenlifestyle.com/android/upload/no_photo.png&type=0&address=&desc=&latitude=3.0312371&longitude=101.61576'
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURL + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.getMainCategory = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.ServerURL + "getMainCategoryData.php")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.getDatalist = function (page) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.ServerURL + page)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.createCategory = function (param, page) {
        var _this = this;
        console.log('parameter', param);
        console.log('url', this.ServerURL + page);
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURL + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.dataList = function (param, page) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURL + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    Servercon.prototype.isContentExist = function (param, page) {
        var _this = this;
        console.log('ppp', param);
        return new Promise(function (resolve) {
            _this.http.post(_this.ServerURL + page, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    // updateContent(param: any, page:string){
    //  return new Promise(resolve => {
    //       this.http.post(this.ServerURL+page,param,this.options)
    //         .map(res => res.json())
    //         .subscribe(data => {
    //           resolve(data);
    //         });
    //     }); 
    // }
    Servercon.prototype.favodataList = function () {
        var list = this.dataIdenti();
        var dataset = [];
        for (var i = 0; i < list.length; i++) {
            dataset[i] = this.readData(list[i]);
        }
        return JSON.parse(JSON.stringify(dataset));
    };
    Servercon.prototype.dataIdenti = function () {
        if (this.dataIdentiCheck()) {
            var records = void 0;
            records = this.readRecordIdentdity("record");
            var ids = records.split(",");
            return ids;
        }
    };
    Servercon.prototype.dataIdentiCheck = function () {
        var empty = this.readRecordIdentdity("record");
        if (empty === "")
            return false;
        else
            return true;
    };
    Servercon.prototype.saveData = function (name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    };
    Servercon.prototype.readData = function (name) {
        return JSON.parse(localStorage.getItem(name));
    };
    Servercon.prototype.readRecordIdentdity = function (name) {
        return JSON.parse(localStorage.getItem(name));
    };
    Servercon.prototype.addRecordIdentdity = function (name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    };
    Servercon.prototype.deleteData = function (name) {
        localStorage.removeItem(name);
    };
    Servercon.prototype.saveDataset = function (name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    };
    Servercon = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], Servercon);
    return Servercon;
}());

//# sourceMappingURL=servercon.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SubPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MorePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sublist_sublist__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__earth_earth__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__event_event__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__fave_fave__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__topten_topten__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__aboutus_aboutus__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__addcategory_addcategory__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__addcontent_addcontent__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__updatecategory_updatecategory__ = __webpack_require__(410);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var SubPage = (function () {
    function SubPage(viewCtrl, navParams, loadingCtrl, ss, toastCtrl, navCtrl, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.ss = ss;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.addCategory = __WEBPACK_IMPORTED_MODULE_11__addcategory_addcategory__["a" /* AddcategoryPage */];
        this.addContent = __WEBPACK_IMPORTED_MODULE_12__addcontent_addcontent__["a" /* AddcontentPage */];
    }
    SubPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Invalid verification code',
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    SubPage.prototype.presentPrompt = function (page) {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: function (data) {
                        _this.validateCode(data.password, page);
                    }
                }
            ]
        });
        alert.present();
    };
    SubPage.prototype.validateCode = function (pw, page) {
        var _this = this;
        this.ss.verification("verification_code=" + pw, 'validateVerificationCode.php').then(function (res) {
            console.log('res', res);
            _this.validateRes = res;
            var responseCode = _this.validateRes.Response.responseCode;
            var validateStatus = _this.validateRes.data.status;
            if (responseCode == 200) {
                if (validateStatus == 1) {
                    localStorage.setItem('verification_code', pw);
                    _this.navCtrl.push(page);
                }
                else {
                    _this.presentToast();
                }
            }
        }, function (err) {
            console.log('error', err);
            _this.presentToast();
        });
    };
    SubPage.prototype.openAddcategory = function (page) {
        this.navCtrl.push(page);
    };
    SubPage.prototype.openAddcontent = function (page) {
        this.navCtrl.push(page);
    };
    SubPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: "\n    <ion-list color=\"light\">\n      <button ion-item icon-right (click)=\"openAddcategory(addCategory)\">Add Main Category </button>\n      <button ion-item (click)=\"openAddcontent(addContent)\">Add Content</button>\n      <button ion-item  >Edit Subcategory</button>\n      </ion-list>\n      "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_servercon__["a" /* Servercon */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], SubPage);
    return SubPage;
}());

var MorePage = (function () {
    function MorePage(viewCtrl, navParams, loadingCtrl, ss, toastCtrl, popoverCtrl, navCtrl, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.ss = ss;
        this.toastCtrl = toastCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.id = this.navParams.get("id");
        this.aboutpage = __WEBPACK_IMPORTED_MODULE_10__aboutus_aboutus__["a" /* AboutusPage */];
    }
    MorePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    };
    MorePage.prototype.addme = function (seg) {
        this.viewCtrl.dismiss();
    };
    MorePage.prototype.validationPop = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Login',
                    handler: function (data) {
                        var loading = _this.loadingCtrl.create({
                            content: 'Please wait...'
                        });
                        loading.present();
                        _this.ss.dataList("verification_code=" + data.password, "newVVC.php").then(function (response) {
                            var myname = data.username;
                            loading.dismiss();
                            data = response;
                            console.log(data);
                            if (data.data.status) {
                                _this.ss.saveData("myname", myname);
                                _this.ss.saveData("loginSts", "1");
                                _this.ss.saveData("delete_action", data.data.delete_action);
                                _this.presentToast("login successful");
                            }
                            else {
                                _this.presentToast("login failed");
                            }
                        }).catch(function (Error) {
                            console.log("Connection Error" + Error);
                            loading.dismiss();
                        });
                    }
                }
            ]
        });
        alert.present();
        this.viewCtrl.dismiss();
    };
    MorePage.prototype.page = function () {
        this.viewCtrl.dismiss();
    };
    MorePage.prototype.presentPopover = function (myEvent) {
        if (this.ss.readData("loginSts")) {
            this.viewCtrl.dismiss();
            var popover = this.popoverCtrl.create(SubPage);
            popover.present({
                ev: myEvent
            });
        }
        else {
        }
    };
    MorePage.prototype.logout = function () {
        this.ss.deleteData("loginSts");
        this.ss.deleteData("myname");
        this.presentToast("Logout successful");
        this.viewCtrl.dismiss();
    };
    MorePage.prototype.adminonly = function () {
        if (this.ss.readData("loginSts"))
            return true;
        else
            return false;
    };
    MorePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: "\n     <ion-list color=\"light\">\n      <button ion-item icon-right (click)=\"presentPopover($event)\">Admin</button>\n       <button ion-item (click)=\"validationPop()\">Validation Code</button>\n      <button *ngIf=\"adminonly()\"  ion-item  (click)=\"logout()\">Logout</button>\n       </ion-list>\n      "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_servercon__["a" /* Servercon */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], MorePage);
    return MorePage;
}());

var HomePage = (function () {
    function HomePage(navCtrl, navParams, ss, loadingCtrl, popoverCtrl, alertCtrl, events, actionSheetCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ss = ss;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.showme = false;
        this.showpopover = false;
        this.locations = [];
        this.countries = [];
        this.earthpage = __WEBPACK_IMPORTED_MODULE_6__earth_earth__["a" /* EarthPage */];
        this.eventpage = __WEBPACK_IMPORTED_MODULE_7__event_event__["a" /* EventPage */];
        this.favepage = __WEBPACK_IMPORTED_MODULE_8__fave_fave__["a" /* FavePage */];
        this.toptenpage = __WEBPACK_IMPORTED_MODULE_9__topten_topten__["a" /* ToptenPage */];
        this.showme = false;
        this.addcategorypage = __WEBPACK_IMPORTED_MODULE_11__addcategory_addcategory__["a" /* AddcategoryPage */];
        events.subscribe("maincatedit", function (data) {
            _this.listitem();
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.listBanner();
        this.listitem();
    };
    HomePage.prototype.goSublist = function (locname, id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sublist_sublist__["b" /* SublistPage */], { locname: locname, id: id });
    };
    HomePage.prototype.filterRight = function (item, index) {
        var _this = this;
        var j;
        for (j = 0; j < this.countries.length; j++) {
            this.countries[j].selected = false;
        }
        this.countries[index].selected = true;
        var i;
        this.locations = [];
        var param = "main_category_id=" + item.id;
        console.log("Sending" + param);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getMain_Location.php").then(function (response) {
            _this.display = response;
            _this.display = _this.display.Data;
            for (i = 0; i <= _this.display.length; i++) {
                var name_1 = _this.display[i].name;
                var pipeline = name_1.split("/");
                var chinese = pipeline[0];
                var english = pipeline[1];
                _this.locations.push({
                    name: name_1,
                    chinese: chinese,
                    english: english,
                    id: item.id,
                });
            }
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    HomePage.prototype.goBLS = function () {
        window.open("http://www.citytour.com.my/");
    };
    HomePage.prototype.updateMainCat = function () {
        var urlSearchParams = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
        urlSearchParams.append('id', '');
        urlSearchParams.append('type', '');
        urlSearchParams.append('name', '');
        urlSearchParams.append('iamge_path', '');
        this.ss.updateMainCat(urlSearchParams, 'updateMainCategoryData.php')
            .then(function (res) {
            console.log('res', res);
        })
            .catch(function (err) {
            console.log('res', err);
        });
    };
    HomePage.prototype.promptActionSheet = function (catItem) {
        var _this = this;
        if (this.adminonly()) {
            var actionSheet = this.actionSheetCtrl.create({
                buttons: [
                    {
                        text: 'Edit',
                        handler: function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__updatecategory_updatecategory__["a" /* UpdatecategoryPage */], { catItem: catItem });
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
        }
    };
    HomePage.prototype.listBanner = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.banner().then(function (response) {
            _this.slides = response;
            _this.slides = _this.slides.Data;
            console.log();
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    HomePage.prototype.listitem = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList("type=1&start=0", "getMainCategoryDataByType.php").then(function (response) {
            _this.items = response;
            _this.items = _this.items.Data;
            console.log(_this.items);
            _this.backup_items = _this.items;
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    HomePage.prototype.listimage = function (imageurl) {
        var myStyles = {
            'background': 'url(' + imageurl + ') no-repeat',
            'background-size': '100% 100%'
        };
        return myStyles;
    };
    HomePage.prototype.openPage = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sublist_sublist__["b" /* SublistPage */], item);
    };
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
    HomePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.items = this.backup_items;
        }
    };
    HomePage.prototype.onCancel = function (onCancel) {
        this.items = this.backup_items;
        this.showme = false;
    };
    HomePage.prototype.seachshow = function () {
        if (this.showme == true) {
            this.showme = false;
        }
        else {
            this.showme = true;
        }
    };
    HomePage.prototype.showLP = function () {
        var i;
        this.showme = false;
        if (this.showpopover == false) {
            for (i = 0; i < this.items.length; i++) {
                // console.log(this.items[i].name);
                // console.log(this.items[i].id);
                this.countries.push({
                    name: this.items[i].name,
                    id: this.items[i].id,
                    selected: false,
                });
            }
            this.showpopover = true;
        }
        else
            this.showpopover = false;
    };
    HomePage.prototype.view_photo = function (image_path, title) {
        __WEBPACK_IMPORTED_MODULE_3_ionic_native__["i" /* PhotoViewer */].show(image_path, title);
    };
    HomePage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(MorePage);
        popover.present({
            ev: myEvent
        });
    };
    HomePage.prototype.adminonly = function () {
        if (this.ss.readData("loginSts"))
            return true;
        else
            return false;
    };
    HomePage.prototype.checkPermission = function () {
        if (this.ss.readData("delete_action"))
            return true;
        else
            return false;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="darkbule">\n      <a tappable ion-button  clear menuToggle >\n        <ion-icon name="menu"></ion-icon>\n <!-- <img tappable src="assets/BLS_35.png"  class="logo_head"/> -->\n      </a>\n\n <ion-buttons end>\n        <button ion-button  (click)="presentPopover($event)">\n      <ion-icon name="more"></ion-icon>\n      </button>\n </ion-buttons>\n\n    <ion-title>Between Lifestyle</ion-title>\n\n  </ion-navbar>\n  <ion-searchbar class="sb" *ngIf="showme" (search)="getItems($event)" [showCancelButton]="shouldShowCancel"  (ionCancel)="onCancel($event)">></ion-searchbar>\n   <button *ngIf="showme" ion-button icon-only class="sbl" (click)="showLP()">\n     <ion-icon name="arrow-dropdown"></ion-icon>\n   </button>\n\n</ion-header>\n\n  <!-- slider area -->\n  <!--<div class="slideshow">-->\n  <div class="superfilter" *ngIf="showpopover">\n        <ion-list class="leftpanel" no-lines>\n            <button [style.background-color]="country.selected ? \'#A9A9A9\' : \'#D3D3D3\'" ion-button *ngFor="let country of countries ; let i = index" color="lightgrey" block (click)="filterRight(country, i)">{{country.name}}</button>\n        </ion-list>\n\n        <ion-list class="rightpanel" no-lines>\n          <button *ngFor="let location of locations" ion-button block (click)="goSublist(location.name, location.id)">{{location.chinese}}<br>{{location.english}}</button>\n        </ion-list>\n  </div>\n\n  <ion-content *ngIf="!showpopover">\n\n\n\n<ion-slides class="slideshow">\n  <ion-slide *ngFor="let slide of slides">\n    <img [src]="slide.Image_Path" class="slideimg" (click)="view_photo(slide.Image_Path,slide.name)"/>\n  </ion-slide>\n</ion-slides>\n\n<!--</div>-->\n\n<!-- end slide -->\n\n<!-- Side 3 icons area -->\n\n\n<div  class="social_blk">\n\n  <img class="sb1" src="assets/earth45.png"  [navPush]="earthpage" />\n\n<img class="sb2" src="assets/mark45.png" [navPush]="eventpage" />\n\n<img class="sb3" src="assets/citytour1.png" (click)="goBLS()" />\n  </div>\n\n<!-- end icons -->\n\n<!-- items scrolling part  -->\n\n<div class="items_top">\n\n  <div class="img_item" *ngFor="let item of items" [ngStyle]="listimage(item.image_path)" style =" transform: translate3d(0px, 0px, 0px);" (tap)="openPage(item)" (press)="promptActionSheet(item)">\n    <!-- <div class="img_item" *ngFor="let item of items" [ngStyle]="listimage(item.image_path)" style =" transform: translate3d(0px, 0px, 0px);" (click)="openPage(item)"> -->\n <ion-badge *ngIf="item.count"  color ="danger" item-right style="margin:0px; width: 40px;">{{item.count}}</ion-badge>\n   <div class="bottom_txt">\n   <p> {{item.name}} </p>\n     </div>\n\n  </div>\n</div>\n<ion-fab right bottom>\n\n\n\n\n\n<button ion-fab color="light"><ion-icon name="arrow-dropup"></ion-icon></button>\n    <ion-fab-list side="top">\n       <button ion-fab color="light" (click)="seachshow()"><ion-icon name="search"></ion-icon></button>\n       <button *ngIf="adminonly()" ion-fab color="light"  [navPush]="addcategorypage"><ion-icon name="add"></ion-icon></button>\n    </ion-fab-list>\n\n\n</ion-fab>\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdategalleryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gallery_gallery__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UpdategalleryPage = (function () {
    function UpdategalleryPage(navCtrl, navParams, actionSheetCtrl, ss, loadingCtrl, viewCtrl, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ss = ss;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.galleryData = this.navParams.get('galleryItem');
        this.desc = this.galleryData.sub;
        this.image_path = this.galleryData.tmp;
        this.imgFileURL = this.galleryData.tmp;
        this.imageId = this.galleryData.id;
        this.page = "insertContentImageBatch.php";
        this.param = "";
        this.retrunPage = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        this.status = true;
    }
    UpdategalleryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BannersPage');
        if (this.navParams.get("page")) {
            this.page = this.navParams.get("page");
            this.param = this.navParams.get("param") + "&";
            this.retrunPage = __WEBPACK_IMPORTED_MODULE_5__gallery_gallery__["a" /* GalleryPage */];
            this.status = false;
            console.log('getparam', this.param);
        }
    };
    UpdategalleryPage.prototype.updateContentImg = function (imageUrl) {
        var _this = this;
        var imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;
        var param = "image_id=" + this.imageId + "&name=" + '' + "&description=" + this.desc + "&image_path=" + this.imgFileURL;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.updateContentImage(param, 'updateContentImage.php')
            .then(function (res) {
            loading.dismiss();
            console.log('res', res);
            _this.imgUpdateRes = res;
            _this.navCtrl.pop();
            var alert = _this.alertCtrl.create({
                subTitle: _this.imgUpdateRes.Response.responseMessage,
                buttons: ['OK']
            });
            alert.present();
        })
            .catch(function (err) {
            loading.dismiss();
            console.log('err', err);
        });
    };
    UpdategalleryPage.prototype.updateContentImgExist = function () {
        var _this = this;
        var param = "image_id=" + this.imageId + "&name=" + '' + "&description=" + this.desc + "&image_path=" + this.image_path;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.updateContentImage(param, 'updateContentImage.php')
            .then(function (res) {
            loading.dismiss();
            console.log('res', res);
            _this.imgUpdateRes = res;
            _this.navCtrl.pop();
            var alert = _this.alertCtrl.create({
                subTitle: _this.imgUpdateRes.Response.responseMessage,
                buttons: ['OK']
            });
            alert.present();
        })
            .catch(function (err) {
            loading.dismiss();
            console.log('err', err);
        });
    };
    UpdategalleryPage.prototype.insertContentImg = function (imageUrl) {
        var _this = this;
        var imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;
        this.param = this.param + "description_list=" + this.desc +
            "&image_path_list=" + this.imgFileURL;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        console.log(this.page + "?" + this.param);
        loading.present();
        this.ss.dataList(this.param, this.page).then(function (response) {
            console.log('res', response);
            loading.dismiss();
            _this.presentToast("uploaded successfully");
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            _this.presentToast(Error);
            loading.dismiss();
        });
    };
    UpdategalleryPage.prototype.uploadFile = function (imgurl) {
        var _this = this;
        console.log('enter');
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["m" /* Transfer */]();
        console.log('enter', imgurl);
        var options = {
            fileKey: 'file',
            fileName: this.imageName,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            params: {
                'file': this.imageName,
            }
        };
        console.log('oprtion', options);
        console.log('url', this.ss.fileURL + this.imageName);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        fileTransfer.upload(imgurl, this.ss.ServerURL + "uploadFile.php", options, true)
            .then(function (data) {
            loading.dismiss();
            console.log('aaa', data);
            _this.updateContentImg(imgurl);
        }, function (err) {
            loading.dismiss();
            console.log('err', err);
        });
    };
    UpdategalleryPage.prototype.takePicture = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].getPicture({
            destinationType: 1,
            correctOrientation: true
        }).then(function (imageData) {
            _this.base64Image = imageData;
            _this.image_path = imageData;
            _this.imageUrl = imageData.replace('file://', '');
            _this.imageName = imageData.substring(imageData.lastIndexOf("/") + 1);
            console.log('222', imageData.replace('file://', ''));
            console.log('sub', imageData.substring(imageData.lastIndexOf("/") + 1));
        }, function (err) {
            console.log(err);
        });
    };
    UpdategalleryPage.prototype.browsePicture = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].getPicture({
            sourceType: 2,
            correctOrientation: true
        }).then(function (imageData) {
            console.log('browse', imageData);
            // imageData is a base64 encoded string
            _this.base64Image = imageData;
            _this.image_path = imageData;
            var imageSplit = imageData;
            imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
            _this.imageUrl = imageSplit.replace('file://', '');
            _this.imageName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
            console.log('1', imageSplit);
            console.log('2', _this.imageUrl);
            console.log('3', _this.imageName);
            // this.camer_upload();
        }, function (err) {
            console.log(err);
        });
    };
    UpdategalleryPage.prototype.upload = function () {
        var _this = this;
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["m" /* Transfer */]();
        var options;
        options = {
            fileKey: 'file',
            fileName: 'bwlf.jpg',
            mimeType: "multipart/form-data"
        };
        fileTransfer.upload(this.image_path, this.ss.ServerURL + "upload.php", options)
            .then(function (data) {
            var datas = JSON.parse(JSON.stringify(data));
            _this.image_path = datas.response;
        }, function (err) {
            console.log(err);
            console.log("err" + JSON.stringify(err) + _this.ss.ServerURL + "upload.php");
        });
        //fileTransfer.abort();
    };
    UpdategalleryPage.prototype.camer_upload = function () {
        var _this = this;
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["m" /* Transfer */]();
        var options;
        options = {
            fileKey: 'file',
            fileName: 'bwlf.jpg',
        };
        fileTransfer.upload(this.image_path, this.ss.ServerURL + "upload.php", options)
            .then(function (data) {
            var datas = JSON.parse(JSON.stringify(data));
            _this.image_path = datas.response;
        }, function (err) {
            console.log(err);
            console.log("err" + JSON.stringify(err) + _this.ss.ServerURL + "upload.php");
        });
        //fileTransfer.abort();
    };
    UpdategalleryPage.prototype.presentToast = function (info) {
        var toast = this.toastCtrl.create({
            message: info,
            duration: 3000
        });
        toast.present();
    };
    UpdategalleryPage.prototype.savebanner = function () {
        console.log('enter');
        if (this.imageUrl) {
            console.log('camera');
            this.uploadFile(this.imageUrl);
        }
        else {
            console.log('exist');
            this.updateContentImgExist();
        }
    };
    UpdategalleryPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Image',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePicture();
                    }
                },
                {
                    text: 'Browser',
                    icon: 'image',
                    handler: function () {
                        _this.browsePicture();
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    UpdategalleryPage.prototype.cancel = function () {
        this.navCtrl.pop();
        //   if(this.status)
        //   {
        //  this.navCtrl.setRoot(this.retrunPage);
        // }
        // else
        // {
        //   this.viewCtrl.dismiss();
        // }
    };
    UpdategalleryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-updategallery',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\updategallery\updategallery.html"*/'\n<ion-header>\n    <ion-navbar color="darkbule">\n        <ion-title>Upload Image</ion-title>\n        <button ion-button clear menuToggle >\n        <img src="assets/head_logo.png"  class="logo_head"/>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div>\n        <ion-list color="light">\n\n            <ion-item >\n                <div>\n                <img [src]="image_path"  (click) ="presentActionSheet()"/>\n                </div>\n            </ion-item>\n\n            <ion-item>\n                <ion-label floating>Description</ion-label>\n                <!--<ion-input type="text" [(ngModel)]="desc"></ion-input>-->\n                <ion-textarea rows="3" type="text" [(ngModel)]="desc"></ion-textarea>\n            </ion-item>\n\n        </ion-list>\n    </div>\n    <button ion-button full color="secondary" (click)="savebanner()">Save</button>\n    <button ion-button full color="danger"  (click)="cancel()">Cancel</button>\n\n</ion-content>'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\updategallery\updategallery.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], UpdategalleryPage);
    return UpdategalleryPage;
}());

//# sourceMappingURL=updategallery.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddcontentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AddcontentPage = (function () {
    function AddcontentPage(platform, navCtrl, actionSheetCtrl, ss, fb, imagePicker, alertCtrl, loadingCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ss = ss;
        this.fb = fb;
        this.imagePicker = imagePicker;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.lastImage = null;
        this.locationFlag = false;
        this.infoFlag = false;
        this.image_path = "assets/upi.jpg";
        this.page = "insertMainCategoryData.php";
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
    AddcontentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // get main category list
        this.ss.getMainCategory().then(function (res) {
            _this.mainCatRes = res;
            _this.mainCatList = _this.mainCatRes.Data;
        }, function (err) {
            console.log(err);
        });
        // get current location coordinates
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["f" /* Geolocation */].getCurrentPosition()
            .then(function (res) {
            _this.coordinates = res.coords;
            _this.latitude = res.coords.latitude;
            _this.longitude = res.coords.longitude;
        })
            .catch(function (err) {
            console.log('error', err);
        });
    };
    AddcontentPage.prototype.removeLoc = function () {
        this.locationFlag = true;
        this.latitude = '';
        this.longitude = '';
    };
    AddcontentPage.prototype.addLoc = function () {
        this.locationFlag = false;
        this.latitude = this.coordinates.latitude;
        this.longitude = this.coordinates.longitude;
    };
    AddcontentPage.prototype.selectType = function () {
        console.log("this is " + this.type.value);
        if (this.type.value == 0) {
            console.log('ooo', 'zero');
            this.infoFlag = false;
        }
        else {
            console.log('ooo', 'one');
            this.infoFlag = true;
        }
    };
    AddcontentPage.prototype.upload = function (imgurl) {
        var _this = this;
        console.log('enter');
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_1_ionic_native__["m" /* Transfer */]();
        console.log('enter', imgurl);
        var url = "http://yoururl/upload.php";
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        targetPath = targetPath.replace('file://', '');
        console.log('lastpath', targetPath);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            params: {
                'fileName': filename,
            }
        };
        console.log('oprtion', options);
        console.log('url', this.ss.fileURL + filename);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        fileTransfer.upload(targetPath, this.ss.ServerURL + "uploadFile.php", options, true)
            .then(function (data) {
            loading.dismiss();
            console.log('aaa', data);
            _this.uploadRes = data;
            var errStr = _this.uploadRes.response;
            var subStr = "-100";
            console.log('qqqq', errStr.includes(subStr));
            if (errStr.includes(subStr)) {
                _this.promptAlert('', 'File size is too big');
                _this.insertContent(imgurl, _this.retrieveForm);
                console.log('haserror');
            }
            else {
                _this.insertContent(imgurl, _this.retrieveForm);
            }
        }, function (err) {
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
    };
    AddcontentPage.prototype.camer_upload = function () {
        var _this = this;
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_1_ionic_native__["m" /* Transfer */]();
        var options;
        options = {
            fileKey: 'file',
            fileName: 'bwlf.jpg',
        };
        fileTransfer.upload(this.image_path, this.ss.ServerURL + "upload.php", options)
            .then(function (data) {
            var datas = JSON.parse(JSON.stringify(data));
            _this.image_path = datas.response;
        }, function (err) {
            console.log(err);
            console.log("err" + JSON.stringify(err) + _this.ss.ServerURL + "upload.php");
        });
        //fileTransfer.abort();
    };
    AddcontentPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    AddcontentPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        console.log('namePath', namePath);
        console.log('currentName', currentName);
        console.log('cordova', cordova.file.externalRootDirectory);
        console.log('newFileName', newFileName);
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["c" /* File */].copyFile(namePath, currentName, cordova.file.externalRootDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            console.log('Error while storing file.');
        });
    };
    AddcontentPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.externalRootDirectory + img;
        }
    };
    AddcontentPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            // console.log('take', imageData);
            // this.base64Image = imageData;
            _this.image_path = imageData;
            // this.imageUrl = imageData.replace('file://','');
            // this.imageName = imageData.substring(imageData.lastIndexOf("/") + 1);
            // console.log('222', imageData.replace('file://',''));
            // console.log('sub', imageData.substring(imageData.lastIndexOf("/") + 1));
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA) {
                __WEBPACK_IMPORTED_MODULE_1_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imageData.substring(imageData.lastIndexOf('/') + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    AddcontentPage.prototype.resizeImage = function (uri) {
        var _this = this;
        var options = {
            uri: uri,
            quality: 100,
            width: 800,
            height: 800
        };
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["g" /* ImageResizer */].resize(options).then(function (res) {
            console.log('resizepath', res);
            _this.image_path = res;
        }, function (err) {
            console.log('resizepath', err);
        });
    };
    AddcontentPage.prototype.browse = function (sourceType) {
        var _this = this;
        this.imagePicker.getPictures({
            maximumImagesCount: 1
        }).then(function (res) {
            console.log('Image URI: ', res);
            for (var i = 0; i < res.length; i++) {
                console.log('Image URI: ' + res[i]);
                var imageData = res[i];
                _this.image_path = res[i];
            }
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY) {
                __WEBPACK_IMPORTED_MODULE_1_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    console.log('photo');
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imageData.substring(imageData.lastIndexOf('/') + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log('Image URI err: ' + err);
        });
    };
    AddcontentPage.prototype.browsePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            console.log('browse', imageData);
            // this.image_path = imageData;
            // this.base64Image = imageData;
            _this.image_path = imageData;
            // let imageSplit = imageData;
            // imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
            // this.imageUrl = imageSplit.replace('file://','');
            // this.imageName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
            // console.log('1', imageSplit);
            // console.log('2', this.imageUrl);
            // console.log('3', this.imageName);
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY) {
                __WEBPACK_IMPORTED_MODULE_1_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var imageSplit = imageData;
                    imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
                    var currentName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    AddcontentPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Image',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePicture(__WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Browser',
                    icon: 'image',
                    handler: function () {
                        _this.browsePicture(__WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    AddcontentPage.prototype.checkVerification = function () {
    };
    AddcontentPage.prototype.insertContent = function (imageUrl, form) {
        var _this = this;
        var imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;
        console.log('sub', this.imgFileURL);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.insertContent("name=" + form.name + "&desc=" + form.desc + "&type=" + this.type.value + "&address=" + form.address + "&phone_office=" + form.phoneNo + "&phone_mobile=" + '' + "&weekday_business_hour=" + form.weekday + "&weekend_business_hour=" + form.weekend + "&website_url=" + form.website + "&latitude=" + this.latitude + "&longitude=" + this.longitude + "&image_path=" + this.imgFileURL + "&category_id=" + form.mainCat, 'insertContent.php').then(function (res) {
            loading.dismiss();
            console.log('res', res);
            _this.insertRes = res;
            var resMsg = _this.insertRes.Response.responseMessage;
            _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            _this.promptAlert('', resMsg);
        }, function (err) {
            loading.dismiss();
            console.log('err', err);
            _this.insertRes = err;
            var resMsg = _this.insertRes.Response.responseMessage;
            _this.promptAlert('', resMsg);
        });
    };
    AddcontentPage.prototype.onCancelClick = function () {
        this.navCtrl.pop();
    };
    AddcontentPage.prototype.promptAlert = function (title, subTitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    AddcontentPage.prototype.submitForm = function () {
        var _this = this;
        this.retrieveForm = this.createContent.value;
        if (this.retrieveForm.name && this.retrieveForm.mainCat) {
            //check data duplication
            this.ss.isContentExist("content_id=" + this.retrieveForm.name + "&main_category_id=" + this.retrieveForm.mainCat, 'isContentExist.php').then(function (res) {
                console.log('success', res);
                _this.isExistRes = res;
                var responseCode = _this.isExistRes.Response.responseCode;
                if (responseCode == 200) {
                    if (_this.lastImage) {
                        console.log('imgae', _this.lastImage);
                        _this.upload(_this.lastImage);
                    }
                    else {
                        console.log('ni imgae');
                        // this.insertContent('http://202.71.107.231:81/betweenai/no_photo.png', this.retrieveForm);
                    }
                }
            }, function (err) {
                console.log('error', err);
            });
        }
    };
    AddcontentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addcontent',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\addcontent\addcontent.html"*/'<ion-header>\n  <ion-navbar color="darkbule">\n    <ion-title>Create Category</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <form [formGroup]="createContent">\n        <ion-list>\n\n            <ion-item>\n                <div>\n                    <img [src]="image_path"  (click) ="presentActionSheet()"/>\n                </div>\n            </ion-item>\n\n            <ion-list-header no-margin no-lines>\n                Main Category\n            </ion-list-header>\n\n            <ion-item>\n                <ion-select no-padding no-margin formControlName="mainCat">\n                    <ion-option *ngFor="let cat of mainCatList" value="{{cat.id}}">{{cat.name}}</ion-option>\n                </ion-select>\n            </ion-item>\n\n            <ion-item>\n                <ion-label stacked>Name:</ion-label>\n                <ion-textarea rows="5" type="text" placeholder="Name" formControlName="name"></ion-textarea>\n            </ion-item>\n\n            <!--<ion-item>\n                <ion-label stacked>Description:</ion-label>\n                <ion-input type="text" placeholder="Description" formControlName="desc"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label stacked>Address:</ion-label>\n                <ion-input type="text" placeholder="Address" formControlName="address"></ion-input>\n            </ion-item>-->\n\n\n            <ion-item>\n                <ion-label stacked>Description:</ion-label>\n                <ion-textarea rows="10" type="text" placeholder="Description" formControlName="desc"></ion-textarea>\n            </ion-item>\n\n            <ion-item>\n                <ion-label stacked>Address:</ion-label>\n                <ion-textarea rows="5" type="text" placeholder="Address" formControlName="address"></ion-textarea>\n            </ion-item>\n\n\n            <ion-list radio-group formControlName="type" (ionChange)="selectType()" no-lines>\n              <ion-list-header>\n                Type\n              </ion-list-header>\n              <ion-item>\n                <ion-label>食尚</ion-label>\n                <img src="assets/foodicon.png" item-left width="27px" height="27px"/>\n                <ion-radio value="0"></ion-radio>\n              </ion-item>\n              <ion-item>\n                <ion-label>親子活动</ion-label>\n                <img src="assets/familyicon.png" item-left width="27px" height="27px"/>\n                <ion-radio value="2"></ion-radio>\n              </ion-item>\n              <ion-item>\n                <ion-label>發現之旅</ion-label>\n                <img src="assets/globe.png" item-left width="27px" height="27px"/>\n                <ion-radio value="1"></ion-radio>\n              </ion-item>\n            </ion-list>\n\n            <!-- <hr> -->\n            <!-- <ion-item>\n                <ion-label>Type</ion-label>\n                <ion-select formControlName="type" (ionChange)="selectType()">\n                    <ion-option value="0">食尚</ion-option>\n                    <ion-option value="2">親子活动</ion-option>\n                    <ion-option value="1">發現之旅</ion-option>\n                </ion-select>\n            </ion-item> -->\n\n            <ion-item [hidden]="infoFlag">\n                <ion-label stacked>Phone:</ion-label>\n                <ion-input type="text" placeholder="Phone(Office)" formControlName="phoneNo"></ion-input>\n            </ion-item>\n\n            <ion-list-header no-lines [hidden]="infoFlag">\n                Business Hour\n            </ion-list-header>\n\n            <!--<ion-item [hidden]="infoFlag">\n                <ion-label stacked>Weekday:</ion-label>\n                <ion-input type="text" placeholder="Weekday Business hour" formControlName="weekday"></ion-input>\n            </ion-item>\n\n            <ion-item [hidden]="infoFlag">\n                <ion-label stacked>Weekend:</ion-label>\n                <ion-input type="text" placeholder="Weekend Business hour" formControlName="weekend"></ion-input>\n            </ion-item>-->\n\n            <ion-item [hidden]="infoFlag">\n                <ion-label stacked>Weekday:</ion-label>\n                <ion-textarea rows="8" type="text" placeholder="Weekday Business hour" formControlName="weekday"></ion-textarea>\n            </ion-item>\n\n            <ion-item [hidden]="infoFlag">\n                <ion-label stacked>Weekend:</ion-label>\n                <ion-textarea rows="8" type="text" placeholder="Weekend Business hour" formControlName="weekend"></ion-textarea>\n            </ion-item>\n\n            <ion-item>\n                <ion-label stacked>Website:</ion-label>\n                <ion-input type="text" placeholder="Website" formControlName="website"></ion-input>\n            </ion-item>\n\n            <ion-item [hidden]="locationFlag">\n                <ion-label>\n                    GPS: {{latitude}}, {{longitude}}\n                </ion-label>\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full color="secondary" [hidden]="locationFlag" (click)="removeLoc()">Remove Location</button>\n        <button ion-button full color="secondary" [hidden]="!locationFlag" (click)="addLoc()">Add Location</button>\n        <button ion-button full color="secondary" (click)="submitForm()">Save</button>\n        <button ion-button full color="danger" (click)="onCancelClick()">Cancel</button>\n    </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\addcontent\addcontent.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */]])
    ], AddcontentPage);
    return AddcontentPage;
}());

//# sourceMappingURL=addcontent.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatecategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_event__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UpdatecategoryPage = (function () {
    function UpdatecategoryPage(platform, navCtrl, navParams, actionSheetCtrl, ss, events, loadingCtrl, viewCtrl, toastCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ss = ss;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.lastImage = null;
        this.locations = [];
        this.image_path = "assets/upi.jpg";
        this.page = "updateMainCategoryData.php";
        this.homepage = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.eventpage = __WEBPACK_IMPORTED_MODULE_4__event_event__["a" /* EventPage */];
        this.name = "";
        this.rate = "";
        this.retrunPage = this.homepage;
    }
    UpdatecategoryPage.prototype.ionViewDidLoad = function () {
        this.catItem = this.navParams.get('catItem');
        this.image_path = this.catItem.image_path;
        this.name = this.catItem.name;
        this.catId = this.catItem.id;
        this.type = 1;
        this.getLocations();
    };
    UpdatecategoryPage.prototype.getLocations = function () {
        var _this = this;
        var i;
        var param = "main_category_id=" + this.catItem.id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getMain_Location.php").then(function (response) {
            _this.obj = response;
            _this.locations = _this.obj.Data;
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    UpdatecategoryPage.prototype.insertLocation = function (newlocation) {
        var _this = this;
        var param = "main_category_id=" + this.catItem.id + "&name=" + newlocation;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "insertMain_Location.php").then(function (response) {
            loading.dismiss();
            _this.getLocations();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    UpdatecategoryPage.prototype.delLocation = function (id) {
        var _this = this;
        var param = "id=" + id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "deleteMain_LocationbyID.php").then(function (response) {
            // alert("Data successfully deleted!");
            loading.dismiss();
            _this.getLocations();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    UpdatecategoryPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    UpdatecategoryPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        console.log('namePath', namePath);
        console.log('currentName', currentName);
        console.log('cordova', cordova.file.dataDirectory);
        console.log('newFileName', newFileName);
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["c" /* File */].copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            console.log('Error while storing file.');
        });
    };
    UpdatecategoryPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    UpdatecategoryPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            // this.base64Image = "data:image/jpeg;base64," + imageData;
            _this.image_path = imageData;
            // this.imageUrl = imageData.replace('file://','');
            // this.imageName = imageData.substring(imageData.lastIndexOf("/") + 1);
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA) {
                __WEBPACK_IMPORTED_MODULE_1_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imageData.substring(imageData.lastIndexOf('/') + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    UpdatecategoryPage.prototype.resizeImage = function (uri) {
        var _this = this;
        var options = {
            uri: uri,
            quality: 100,
            width: 800,
            height: 800
        };
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["g" /* ImageResizer */].resize(options).then(function (res) {
            console.log('resizepath', res);
            _this.image_path = res;
        }, function (err) {
            console.log('resizepath', err);
        });
    };
    UpdatecategoryPage.prototype.browsePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            // console.log('browse', imageData)
            // this.base64Image = imageData;
            _this.image_path = imageData;
            // let imageSplit = imageData;
            // imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
            // this.imageUrl = imageSplit.replace('file://','');
            // this.imageName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
            // console.log('1', imageSplit);
            // console.log('2', this.imageUrl);
            // console.log('3', this.imageName);
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY) {
                __WEBPACK_IMPORTED_MODULE_1_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var imageSplit = imageData;
                    imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
                    var currentName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    UpdatecategoryPage.prototype.upload = function (imgurl) {
        var _this = this;
        console.log('enter');
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_1_ionic_native__["m" /* Transfer */]();
        console.log('enter', imgurl);
        var targetPath = this.pathForImage(this.lastImage);
        targetPath = targetPath.replace('file://', '');
        console.log('lastpath', targetPath);
        var filename = this.lastImage;
        var options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            params: {
                'fileName': filename,
            }
        };
        console.log('oprtion', options);
        console.log('url', this.ss.fileURL + filename);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        fileTransfer.upload(targetPath, this.ss.ServerURL + "uploadFile.php", options, true)
            .then(function (data) {
            loading.dismiss();
            console.log('aaa', data);
            _this.updataCategory(imgurl);
        }, function (err) {
            loading.dismiss();
            console.log('err', err);
        });
    };
    UpdatecategoryPage.prototype.updateExistCategory = function (imageUrl) {
        var _this = this;
        this.imgFileURL = imageUrl;
        this.param = "id=" + this.catId + "&name=" + this.name + "&image_path=" + this.imgFileURL + "&type=" + this.type;
        console.log('aaa', this.imgFileURL);
        console.log('bbb', this.param);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        console.log("use existing image " + this.page + "?" + this.param);
        loading.present();
        this.ss.updateMainCat(this.param, this.page).then(function (response) {
            console.log('resres', response);
            loading.dismiss();
            _this.navCtrl.pop();
            _this.events.publish("maincatedit", "true");
            _this.presentToast("uploaded successfully");
            // if(this.type=='1')
            //   this.navCtrl.push(this.homepage);
            // else
            //   this.navCtrl.push(this.eventpage);
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            _this.presentToast(Error);
            loading.dismiss();
        });
    };
    UpdatecategoryPage.prototype.updataCategory = function (imageUrl) {
        var _this = this;
        var imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;
        this.param = "id=" + this.catId + "&name=" + this.name + "&image_path=" + this.imgFileURL + "&type=" + this.type;
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
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        // alert("Using new image " + this.page+"?"+this.param);
        loading.present();
        this.ss.updateMainCat(this.param, this.page).then(function (response) {
            console.log('resres', response);
            loading.dismiss();
            _this.navCtrl.pop();
            _this.presentToast("uploaded successfully");
            _this.events.publish("maincatedit", "true");
            // if(this.type=='1')
            //   this.navCtrl.push(this.homepage);
            // else
            //   this.navCtrl.push(this.eventpage);
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            _this.presentToast(Error);
            loading.dismiss();
        });
    };
    UpdatecategoryPage.prototype.camer_upload = function () {
        var _this = this;
        console.log('camupload');
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_1_ionic_native__["m" /* Transfer */]();
        var options;
        options = {
            fileKey: 'file',
            fileName: 'bwlf.jpg',
        };
        fileTransfer.upload(this.image_path, this.ss.ServerURL + "upload.php", options)
            .then(function (data) {
            console.log('cam upload', data);
            var datas = JSON.parse(JSON.stringify(data));
            _this.image_path = datas.response;
        }, function (err) {
            console.log(err);
            console.log("err" + JSON.stringify(err) + _this.ss.ServerURL + "upload.php");
        });
        //fileTransfer.abort();
    };
    UpdatecategoryPage.prototype.presentToast = function (info) {
        var toast = this.toastCtrl.create({
            message: info,
            duration: 3000
        });
        toast.present();
    };
    UpdatecategoryPage.prototype.save = function () {
        var imgStr = this.image_path;
        if (imgStr.startsWith('http')) {
            this.updateExistCategory(this.image_path);
        }
        else {
            this.upload(this.lastImage);
        }
    };
    UpdatecategoryPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Image',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePicture(__WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Browser',
                    icon: 'image',
                    handler: function () {
                        _this.browsePicture(__WEBPACK_IMPORTED_MODULE_1_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    UpdatecategoryPage.prototype.cancel = function () {
        this.navCtrl.setRoot(this.retrunPage);
    };
    UpdatecategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-updatecategory',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\updatecategory\updatecategory.html"*/'\n<ion-header>\n\n  <ion-navbar color="darkbule">\n    <ion-title>Update Category</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n<ion-list>\n\n  <ion-item>\n    <div>\n      <img [src]="image_path"  (click) ="presentActionSheet()"/>\n    </div>\n  </ion-item>\n\n  <ion-item>\n    <ion-label stacked>Category Name:</ion-label>\n    <ion-input type="text" [(ngModel)]="name"></ion-input>\n  </ion-item>\n\n<ion-item>\n    <ion-label>Type</ion-label>\n    <ion-select [(ngModel)]="type">\n     <ion-option value="1">Earth</ion-option>\n      <ion-option value="2">Location</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label stacked>Top</ion-label>\n    <ion-input  type="number" step="any" name="topRate" [(ngModel)]="rate" min="1"\n               max="20"></ion-input>\n  </ion-item>\n\n  <!-- <ion-item> -->\n  <ion-label stacked>Locations</ion-label>\n  <tag-input class="tag" [ngModel]="locations" [identifyBy]="\'id\'" [displayBy]="\'name\'" (onAdd)="insertLocation($event.name)" (onRemove)="delLocation($event.id)" theme=\'minimal\'>\n  </tag-input>\n<!-- </ion-item> -->\n\n</ion-list>\n\n<button ion-button full color="secondary" (click)="save()">Save</button>\n <button ion-button full color="danger"  (click)="cancel()">Cancel</button>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\updatecategory\updatecategory.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["r" /* ToastController */]])
    ], UpdatecategoryPage);
    return UpdatecategoryPage;
}());

//# sourceMappingURL=updatecategory.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(416);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_screen_orientation__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_sublist_sublist__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_earth_earth__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_event_event__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_topten_topten__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_tabtopten_tabtopten__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_fave_fave__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_detail_detail__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_banners_banners__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_aboutus_aboutus__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_gallery_gallery__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_video_video__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_addvideo_addvideo__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_file_transfer__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_media_capture__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_file__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_transfer__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_file_path__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_camera__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_video_editor__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_image_picker__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_addcategory_addcategory__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_addcontent_addcontent__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_updatecategory_updatecategory__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_updatecontent_updatecontent__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_updategallery_updategallery__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_ng2_tag_input__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_ng2_tag_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_34_ng2_tag_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__angular_platform_browser_animations__ = __webpack_require__(736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_ionic_gallery_modal__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_streaming_media__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_video_player__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_in_app_browser__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// import { SocialSharing } from '@ionic-native/social-sharing';


































 // this is needed!





var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_earth_earth__["a" /* EarthPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_event_event__["a" /* EventPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_topten_topten__["a" /* ToptenPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_fave_fave__["a" /* FavePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_detail_detail__["c" /* PopoverPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_banners_banners__["a" /* BannersPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_aboutus_aboutus__["a" /* AboutusPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sublist_sublist__["b" /* SublistPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_gallery_gallery__["a" /* GalleryPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_video_video__["a" /* VideoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["b" /* MorePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sublist_sublist__["a" /* FilterPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["c" /* SubPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_tabtopten_tabtopten__["a" /* TabtoptenPage */],
                // GalleryModal,
                // ZoomableImage,
                __WEBPACK_IMPORTED_MODULE_29__pages_addcategory_addcategory__["a" /* AddcategoryPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_addvideo_addvideo__["a" /* AddvideoPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_addcontent_addcontent__["a" /* AddcontentPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_updatecategory_updatecategory__["a" /* UpdatecategoryPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_updatecontent_updatecontent__["a" /* UpdatecontentPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_detail_detail__["b" /* PopoverEdit */],
                __WEBPACK_IMPORTED_MODULE_33__pages_updategallery_updategallery__["a" /* UpdategalleryPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_37__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_36_ionic_gallery_modal__["b" /* GalleryModalModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */]),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_34_ng2_tag_input__["TagInputModule"],
                __WEBPACK_IMPORTED_MODULE_35__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_earth_earth__["a" /* EarthPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_event_event__["a" /* EventPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_topten_topten__["a" /* ToptenPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_banners_banners__["a" /* BannersPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_detail_detail__["c" /* PopoverPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_fave_fave__["a" /* FavePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_aboutus_aboutus__["a" /* AboutusPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sublist_sublist__["b" /* SublistPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_gallery_gallery__["a" /* GalleryPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_video_video__["a" /* VideoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["b" /* MorePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sublist_sublist__["a" /* FilterPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["c" /* SubPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_tabtopten_tabtopten__["a" /* TabtoptenPage */],
                // GalleryModal,
                // ZoomableImage,
                __WEBPACK_IMPORTED_MODULE_29__pages_addcategory_addcategory__["a" /* AddcategoryPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_addvideo_addvideo__["a" /* AddvideoPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_addcontent_addcontent__["a" /* AddcontentPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_updatecategory_updatecategory__["a" /* UpdatecategoryPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_updatecontent_updatecontent__["a" /* UpdatecontentPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_detail_detail__["b" /* PopoverEdit */],
                __WEBPACK_IMPORTED_MODULE_33__pages_updategallery_updategallery__["a" /* UpdategalleryPage */]
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_18__providers_servercon__["a" /* Servercon */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["i" /* PhotoViewer */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["h" /* LaunchNavigator */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_media_capture__["a" /* MediaCapture */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_streaming_media__["a" /* StreamingMedia */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_video_player__["a" /* VideoPlayer */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_video_editor__["a" /* VideoEditor */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["j" /* SocialSharing */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PopoverPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PopoverEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_screen_orientation__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_media_capture__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_transfer__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_streaming_media__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_video_editor__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_video_player__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__gallery_gallery__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__banners_banners__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic_gallery_modal__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__updatecontent_updatecontent__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__updategallery_updategallery__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_in_app_browser__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













// import {StreamingMedia, StreamingVideoOptions} from 'ionic-native';
// import { MediaCapture, MediaFile, CaptureError } from 'ionic-native';








var PopoverPage = (function () {
    function PopoverPage(viewCtrl, navParams, loadingCtrl, ss, toastCtrl, camera, transfer, file, filePath) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.ss = ss;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.id = this.navParams.get("id");
    }
    PopoverPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Added Successfully',
            duration: 3000
        });
        toast.present();
    };
    PopoverPage.prototype.addme = function (seg) {
        var _this = this;
        var param = "id=" + this.id + "&segment=" + seg;
        //alert(param);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "updateContentSegments.php").then(function (response) {
            loading.dismiss();
            _this.presentToast();
        }).catch(function (Error) {
            //console.log("Connection Error"+Error);
            loading.dismiss();
        });
        this.viewCtrl.dismiss();
    };
    PopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: "\n    <ion-list color=\"light\">\n      <button ion-item (click)=\"addme(1)\">Malaysia</button>\n      <button ion-item (click)=\"addme(2)\">Asia Pacific</button>\n      <button ion-item (click)=\"addme(3)\">World</button>\n     <!-- <button ion-item (click)=\"addme(3)\">Remove</button>\n     -->\n      </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_13__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path__["a" /* FilePath */]])
    ], PopoverPage);
    return PopoverPage;
}());

// Popoveredit component
var PopoverEdit = (function () {
    function PopoverEdit(viewCtrl, ss, events, navCtrl, alertCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.ss = ss;
        this.events = events;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.getDetailItem = this.navParams.get('detailItem');
    }
    PopoverEdit.prototype.checkPermission = function () {
        if (this.ss.readData("delete_action") == 1)
            return true;
        else
            return false;
    };
    PopoverEdit.prototype.deleteItem = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete?',
            message: 'Do you really want to delete this item?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.delContent();
                    }
                }
            ]
        });
        alert.present();
    };
    PopoverEdit.prototype.delContent = function () {
        var _this = this;
        this.viewCtrl.dismiss();
        var newparam = "content_id=" + this.getDetailItem.id + "&category_id=" + this.getDetailItem.category_id;
        this.ss.dataList(newparam, "deleteContent.php")
            .then(function (response) {
            alert("Item successfully deleted!");
            _this.events.publish("deletion", "true");
        })
            .catch(function (Error) {
            // alert("Insert Data Error");
        });
    };
    PopoverEdit.prototype.close = function () {
        var _this = this;
        this.viewCtrl.dismiss().then(function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_17__updatecontent_updatecontent__["a" /* UpdatecontentPage */], {
                detailItem: _this.getDetailItem
            });
        });
    };
    PopoverEdit = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: "\n    <ion-list>\n      <ion-list-header>Admin</ion-list-header>\n      <button ion-item (click)=\"close()\">Edit</button>\n      <button ion-item *ngIf=\"checkPermission()\" (click)=\"deleteItem()\">Delete</button>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_13__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], PopoverEdit);
    return PopoverEdit;
}());

// End of popoveredit component
var DetailPage = (function () {
    function DetailPage(mediaCapture, transfer, navCtrl, navParams, Photoviewer, loadingCtrl, ss, popoverCtrl, toastCtrl, modalCtrl, events, screenOrientation, actionSheetCtrl, platform, streamingMedia, videoPlayer, camera, iab, videoEditor, alertCtrl) {
        var _this = this;
        this.mediaCapture = mediaCapture;
        this.transfer = transfer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Photoviewer = Photoviewer;
        this.loadingCtrl = loadingCtrl;
        this.ss = ss;
        this.popoverCtrl = popoverCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.screenOrientation = screenOrientation;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.streamingMedia = streamingMedia;
        this.videoPlayer = videoPlayer;
        this.camera = camera;
        this.iab = iab;
        this.videoEditor = videoEditor;
        this.alertCtrl = alertCtrl;
        this.showaddvideopage = false;
        this.thumbpath = "assets/upv.jpg";
        this.gallerypage = __WEBPACK_IMPORTED_MODULE_14__gallery_gallery__["a" /* GalleryPage */];
        this.banner = __WEBPACK_IMPORTED_MODULE_15__banners_banners__["a" /* BannersPage */];
        this.items = {
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
        this.tt = "details";
        //ScreenOrientation.lockOrientation('portrait');
        events.subscribe('deletion', function (data) {
            // user and time are the same arguments passed in `events.publish(user, time)`
            _this.navCtrl.pop();
        });
        events.subscribe('edition', function (data) {
            // user and time are the same arguments passed in `events.publish(user, time)`
            _this.listitem(_this.param);
        });
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        this.screenOrientation.unlock();
        this.item = this.navParams.data;
        // this.image_path=this.navParams.get("image_path");
        // this.title=this.navParams.get("content_name");
        console.log(this.item);
        if (this.item.content_id)
            this.param = "category_id=" + this.item.category_id + "&content_id=" + this.item.content_id;
        else
            this.param = "category_id=" + this.item.category_id + "&content_id=" + this.item.id;
        this.listitem(this.param);
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* DeviceOrientation */].getCurrentHeading().then(function (data) { return console.log(JSON.stringify(data)); }, function (error) { return console.log("err" + JSON.stringify(error)); });
    };
    DetailPage.prototype.selectVideo = function (vid) {
        this.selected = vid;
        console.log(this.selected);
    };
    DetailPage.prototype.deleteGal = function (gal) {
        var _this = this;
        // console.log(item);
        var alert = this.alertCtrl.create({
            title: 'Confirm delete?',
            message: 'Do you really want to delete this photo?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.deleteImage(gal);
                    }
                }
            ]
        });
        alert.present();
    };
    DetailPage.prototype.deleteVid = function (vid) {
        var _this = this;
        if (this.adminonly()) {
            var alert_1 = this.alertCtrl.create({
                title: 'Confirm delete?',
                message: 'Do you really want to delete this video?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Delete',
                        handler: function () {
                            _this.delVid(vid);
                        }
                    }
                ]
            });
            alert_1.present();
        }
    };
    DetailPage.prototype.delVid = function (item) {
        var _this = this;
        var newparam = "play_id=" + item.play_id + "&content_id=" + item.content_id + "&category_id=" + item.category_id;
        this.ss.dataList(newparam, "deleteContentPlay.php")
            .then(function (response) {
            alert("Video successfully deleted!");
            _this.getVGallery(_this.param);
        })
            .catch(function (Error) {
            // alert("Insert Data Error");
        });
    };
    DetailPage.prototype.deleteImage = function (galleryItem) {
        var _this = this;
        var param = this.param + "&image_id=" + galleryItem.id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.deleteGallery(param, 'deleteContentImage.php')
            .then(function (res) {
            loading.dismiss();
            _this.deleteRes = res;
            alert("Image successfully deleted!");
            _this.getGallery(_this.param);
            console.log('deletesuccess', res);
        })
            .catch(function (err) {
            _this.deleteRes = err;
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                subTitle: _this.deleteRes.Response.responseMessage,
                buttons: ['OK']
            });
            alert.present();
            console.log('deleteerr', err);
        });
    };
    DetailPage.prototype.adminonly = function () {
        if (this.ss.readData("loginSts") == 1)
            return true;
        else
            return false;
    };
    DetailPage.prototype.checkPermission = function () {
        if (this.ss.readData("delete_action") == 1)
            return true;
        else
            return false;
    };
    DetailPage.prototype.openEdit = function (galleryItem) {
        var _this = this;
        if (this.adminonly()) {
            // if(this.checkPermission())
            // {
            var actionSheet = this.actionSheetCtrl.create({
                buttons: [
                    {
                        text: 'Edit',
                        handler: function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_18__updategallery_updategallery__["a" /* UpdategalleryPage */], {
                                galleryItem: galleryItem
                            });
                        }
                    },
                    {
                        text: 'Delete',
                        handler: function () {
                            _this.deleteGal(galleryItem);
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
        }
    };
    /* detail of item */
    DetailPage.prototype.popOverEdit = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverEdit, {
            detailItem: this.items
        });
        popover.present({
            ev: myEvent
        });
    };
    DetailPage.prototype.listitem = function (param) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getContentDetail.php").then(function (response) {
            _this.obj = response;
            _this.items = _this.obj.Data;
            _this.image_path = _this.items.image_path;
            _this.title = _this.items.name;
            console.log(_this.items);
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
        //ScreenOrientation.lockOrientation('portrait');
    };
    DetailPage.prototype.view_photo = function (image_path, title) {
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["i" /* PhotoViewer */].show(image_path, title);
    };
    DetailPage.prototype.navigater = function (address) {
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["h" /* LaunchNavigator */].navigate(address)
            .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    DetailPage.prototype.navigaterll = function (address) {
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["h" /* LaunchNavigator */].navigate(address)
            .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    DetailPage.prototype.presentPopover = function (myEvent, itemid) {
        var popover = this.popoverCtrl.create(PopoverPage, { id: itemid });
        popover.present({
            ev: myEvent
        });
    };
    // sharing link
    DetailPage.prototype.sharelink = function (category_id, content_id) {
        var link = this.ss.ServerURL + "content.php?id=" + category_id + "&content_id=" + content_id;
        //alert(link);
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["j" /* SocialSharing */].share(this.title, 'Betweenlifestyle', this.image_path, link).then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    DetailPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'favourite added successfully',
            duration: 3000
        });
        toast.present();
    };
    // favourite save
    DetailPage.prototype.favo = function (item) {
        this.ss.saveDataset(item.id, item);
        this.presentToast();
        if (this.ss.readData("record")) {
            var a = this.ss.readData("record") + "," + item.id;
            this.ss.addRecordIdentdity("record", a);
        }
        else {
            this.ss.addRecordIdentdity("record", item.id);
        }
        console.log(this.dataIdenti());
    };
    DetailPage.prototype.removfavo = function (id) {
        this.dataidneti_remove(id);
    };
    DetailPage.prototype.checkfavo = function (id) {
        if (this.ss.readData(id)) {
            return 1;
        }
        else {
            return 2;
        }
    };
    DetailPage.prototype.dataIdenti = function () {
        var records;
        records = this.ss.readRecordIdentdity("record");
        var ids = records.split(",");
        return ids;
    };
    DetailPage.prototype.dataidneti_remove = function (id) {
        var list = this.dataIdenti();
        for (var i = 0; i < list.length; i++) {
            if (list[i] === id) {
                list.splice(i, 1);
            }
        }
        this.ss.addRecordIdentdity("record", list.toString());
        this.ss.deleteData(id);
    };
    /* detail of item  end*/
    /* Image Gallery */
    DetailPage.prototype.getGallery = function (param) {
        var _this = this;
        console.log('ppp', param);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getContentGallery.php").then(function (response) {
            _this.obj = response;
            console.log('galleryres', response);
            _this.gallery = _this.obj.Data;
            console.log(_this.gallery);
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    DetailPage.prototype.getGallery2 = function () {
        var _this = this;
        if (this.item.content_id)
            this.param = "category_id=" + this.item.category_id + "&content_id=" + this.item.content_id;
        else
            this.param = "category_id=" + this.item.category_id + "&content_id=" + this.item.id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(this.param, "getContentGallery.php").then(function (response) {
            _this.obj = response;
            console.log('galleryres', response);
            _this.gallery = _this.obj.Data;
            console.log(_this.gallery);
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    DetailPage.prototype.getVGallery = function (param) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getContentPlay.php").then(function (response) {
            _this.obj = response;
            _this.vgallery = response;
            _this.vgallery = _this.obj.Data;
            console.log(_this.vgallery);
            _this.selectVideo(_this.vgallery[0]);
            //console.log(JSON.stringify(this.vgallery));
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    DetailPage.prototype.openVideo = function (v) {
        var browser = this.iab.create(v, "_self", "location=no,fullscreen=yes");
    };
    DetailPage.prototype.openGallery = function (index) {
        this.photos = [];
        for (var key in this.gallery) {
            this.photos.push({
                url: this.gallery[key]['src'],
                // title: "Testing caption with very very very long caption and description and something outside there to test this thing very long sentence i think its okay by nw can already enough long gua"
                title: this.gallery[key]['sub']
            });
        }
        //ScreenOrientation.unlockOrientation();
        //ScreenOrientation.unlockOrientation();
        //console.log( this.photos);
        // let profileModal = this.modalCtrl.create(this.gallerypage,{cindex:index,gallery:this.gallery})
        console.log(this.photos);
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_16_ionic_gallery_modal__["a" /* GalleryModal */], {
            photos: this.photos,
            initialSlide: index,
            closeIcon: "close",
        });
        profileModal.present();
        profileModal.onDidDismiss(function (data) {
        });
    };
    /* Image Gallery End */
    DetailPage.prototype.openBanner = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create(this.banner, { param: "content_id=" + this.item.content_id + "&name_list=" + this.items.name, page: "insertContentImageBatch.php" });
        profileModal.onDidDismiss(function () {
            _this.getGallery(_this.param);
        });
        profileModal.present();
    };
    DetailPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Video',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takeVideo();
                    }
                },
                {
                    text: 'Browser',
                    icon: 'image',
                    handler: function () {
                        _this.browseVideo();
                    }
                },
            ]
        });
        actionSheet.present();
    };
    DetailPage.prototype.cancel = function () {
        this.showaddvideopage = false;
    };
    DetailPage.prototype.promptVideo = function () {
        this.showaddvideopage = true;
        this.vidpath = undefined;
        this.vidtitle = undefined;
        this.viddesc = undefined;
        this.thumbpath = "assets/upv.jpg";
    };
    DetailPage.prototype.saveVideo = function () {
        if (this.viddesc == undefined) {
            this.viddesc = "";
        }
        if (this.vidpath !== undefined && this.vidtitle !== undefined) {
            this.showaddvideopage = false;
            this.insertData(this.vidpath, this.thumbpath, this.vidtitle, this.viddesc);
        }
    };
    DetailPage.prototype.browseVideo = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: 1,
            sourceType: 2,
            mediaType: 1,
        };
        this.camera.getPicture(options).then(function (imageData) {
            var fullPath = "file://" + imageData;
            _this.oriname = imageData.split(/[/ ]+/).pop();
            _this.compressVideo(fullPath);
        }, function (err) {
            // Handle error
        });
    };
    DetailPage.prototype.takeVideo = function () {
        var _this = this;
        var options = { limit: 1 };
        this.mediaCapture.captureVideo(options)
            .then(function (data) {
            var datasource = data[0];
            _this.oriname = datasource.name;
            _this.compressVideo(datasource.fullPath);
        })
            .catch(function (err) {
            console.log("Capture Error");
            return;
        });
    };
    DetailPage.prototype.compressVideo = function (fullPath) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Uploading Video...'
        });
        this.loading.present();
        var options = {
            fileUri: fullPath,
            outputFileName: "output_" + this.oriname,
            outputFileType: this.videoEditor.OutputFileType.MPEG4,
            maintainAspectRatio: true,
            width: 1920,
            height: 1200,
        };
        this.videoEditor.transcodeVideo(options)
            .then(function (fileUri) {
            // alert(fileUri);
            _this.createThumb(fileUri);
        })
            .catch(function (err) {
            alert("Compress Error");
        });
    };
    DetailPage.prototype.createThumb = function (fileUri) {
        var _this = this;
        var options = {
            fileUri: fileUri,
            outputFileName: "thumbsnail_" + this.oriname,
            atTime: 2,
        };
        this.videoEditor.createThumbnail(options)
            .then(function (thumbUri) {
            // alert(thumbUri);
            // this.thumburi = thumbUri;
            _this.uploadThumb(fileUri, thumbUri);
        })
            .catch(function (err) {
            alert("Create Thumb Error!");
        });
    };
    DetailPage.prototype.uploadThumb = function (fileUri, thumbUri) {
        var _this = this;
        //upload Thumbsnail
        var fileTransfer = this.transfer.create();
        var options;
        options = {
            fileName: 'bwls.jpg',
            mimeType: 'image/jpeg',
            chunkedMode: false,
        };
        var uploadPHP = this.ss.ServerURL + "videoupload.php";
        fileTransfer.upload(thumbUri, encodeURI(uploadPHP), options)
            .then(function (data) {
            var datas = JSON.parse(JSON.stringify(data));
            var thumbPath = datas.response;
            // alert(thumbPath);
            _this.uploadVideo(fileUri, thumbPath);
        })
            .catch(function (err) {
            alert("Upload Thumb Error!");
        });
    };
    DetailPage.prototype.uploadVideo = function (fileUri, thumbPath) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var options;
        options = {
            fileName: 'bwls.mp4',
            mimeType: 'video/mp4',
            chunkedMode: false,
        };
        var uploadPHP = this.ss.ServerURL + "videoupload.php";
        fileTransfer.upload(fileUri, encodeURI(uploadPHP), options)
            .then(function (data) {
            var datas = JSON.parse(JSON.stringify(data));
            var videoPath = datas.response;
            // alert(videoPath);
            _this.vidpath = videoPath;
            _this.thumbpath = thumbPath;
            _this.loading.dismiss();
            // this.insertData(videoPath, thumbPath);
        })
            .catch(function (err) {
            alert("Upload Video Error!");
        });
    };
    DetailPage.prototype.insertData = function (videoPath, thumbPath, title, desc) {
        var _this = this;
        var newparam = this.param + "&image_path=" + thumbPath + "&video_path=" + videoPath + "&datetime=&name=" + title + "&description=" + desc;
        this.ss.dataList(newparam, "videoaddtest.php")
            .then(function (response) {
            alert("Video successfully uploaded!\n");
            _this.getVGallery(_this.param);
        })
            .catch(function (Error) {
            alert("Insert Data Error");
        });
    };
    DetailPage.prototype.checkme = function (sts) {
        if (sts == "" || sts == "-1.0000000" || sts == "0.0000000") {
            return false;
        }
        else {
            return true;
        }
    };
    DetailPage.prototype.open_url = function (link) {
        var url = "http://" + link;
        window.open(url);
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-detail',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\detail\detail.html"*/'\n<ion-header *ngIf="!showaddvideopage">\n <ion-navbar color="darkbule">\n    <ion-title>{{title}}</ion-title>\n    <ion-buttons end>\n      <button *ngIf="adminonly()" ion-button (click)="popOverEdit($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="tt" mode="ios">\n      <ion-segment-button value="details" (ionSelect)="listitem(param)">\n     Details\n      </ion-segment-button>\n      <ion-segment-button value="gallery" (ionSelect)="getGallery(param)" >\n      <img src="assets/gallery.png"/>\n      </ion-segment-button>\n      <ion-segment-button value="Videos" (ionSelect)="getVGallery(param)" >\n       <img src="assets/play.png"/>\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<div class="addvidpage" *ngIf="showaddvideopage">\n  <ion-item >\n    <div>\n    <img class="addvid" [src]="thumbpath"  (click) ="presentActionSheet()"/>\n    </div>\n  </ion-item>\n\n  <ion-list color="light">\n    <ion-item>\n      <ion-label floating>Title</ion-label>\n      <ion-textarea rows="1" type="text" [(ngModel)]="vidtitle"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Description</ion-label>\n      <ion-textarea rows="3" type="text" [(ngModel)]="viddesc"></ion-textarea>\n    </ion-item>\n  </ion-list>\n  <button ion-button full color="secondary" (click)="saveVideo()">Save</button>\n  <button ion-button full color="danger"  (click)="cancel()">Cancel</button>\n</div>\n\n\n\n\n\n<ion-content class="bgcolor" *ngIf="!showaddvideopage">\n\n<!-- <ion-fab left bottom>\n  <button *ngIf="!isDelete" (click)="toggleDelete()" ion-fab color="danger"><ion-icon name="trash"></ion-icon></button>\n  <button *ngIf="isDelete" (click)="toggleDelete()" ion-fab color="light"><ion-icon name="trash"></ion-icon></button>\n</ion-fab> -->\n\n<div [ngSwitch]="tt">\n\n    <ion-list *ngSwitchCase="\'details\'">\n\n\n<div  class="img_item">\n <img *ngIf="image_path" [src]="image_path"  (click)="view_photo(image_path,title)"  style="height: 200px;  width: 100%;" />\n\n<div class="top_text" >\n    <img *ngIf="checkfavo(items.id)==1" src="assets/LoveY_40.png" (click)=removfavo(items.id)/>\n      <img *ngIf="checkfavo(items.id)==2" src="assets/LoveG_40.png" (click)=favo(items)/><br>\n      <img src="assets/Tten_40.png" (click)="presentPopover($event,items.id)" style="margin-right: 3px;" />\n     </div>\n</div>\n\n<div class="deatils">\n<!-- working area -->\n\n<div class="info" *ngIf="items.categoryName">\n <label>  Main Category : </label>\n {{items.categoryName}}\n</div>\n\n<div class="info" *ngIf="items.name">\n<!--\n<label style="">Name : </label>\n -->\n <p text-justify class="name_box">{{items.name}} </p>\n</div>\n\n<div class="info" *ngIf="items.description">\n <label> Description : </label>\n<div text-justify style="white-space: pre-line;">{{items.description}}</div>\n</div>\n\n<div class="info" *ngIf="items.address">\n<label> Address : </label>\n<div style="text-align: left; white-space: pre-line;" text-justify (click)="navigater(items.address)">{{items.address }}</div>\n</div>\n\n<div  class="info" *ngIf="items.phone_mobile">\n<label> Mobile : </label>\n{{items.phone_mobile}}\n</div>\n\n<div class="info" *ngIf="items.phone_office">\n<label> Phone : </label>\n<a href="tel:{{items.phone_office}}" class="phone_num"> {{items.phone_office}} </a>\n</div>\n\n<div style="padding: 0;" class="info" *ngIf="items.weekday_business_hour">\n <label> Business Hour : </label>\n</div>\n\n<div class="info" *ngIf="items.weekday_business_hour">\n<label>Weekday : </label><br>\n<p text-justify class="wday_box" style="text-align-last: white-space: pre-line;"> {{items.weekday_business_hour}} </p>\n</div>\n\n<div class="info" *ngIf="items.weekend_business_hour">\n<label> Weekend : </label><br>\n<p text-justify class="wday_box" style="text-align-last: white-space: pre-line;">{{items.weekend_business_hour}}</p>\n</div>\n\n<div class="info" *ngIf="items.website_url">\n<label> Website : </label>\n<a text-justify (click)="open_url(items.website_url)">{{items.website_url}}</a>\n</div>\n\n<div  class="info" *ngIf="checkme(items.latitude)"   >\n<label> Latitude / Longitude : </label>\n<div text-justify (click)="navigater([items.latitude,items.longitude])" >{{items.latitude }} - {{items.longitude }}</div>\n</div>\n\n<div class="info" *ngIf="items.latitude">\n<label> created : </label>\n{{items.timestamp | date: \'MMMM/y\'}}\n</div>\n\n<!-- end area  -->\n</div>\n\n\n\n\n   </ion-list>\n\n    <ion-list *ngSwitchCase="\'gallery\'" >\n\n<!-- <ion-grid *ngIf="!isDelete">\n  <ion-row wrap>\n    <ion-col col-4 *ngFor="let pic of gallery ; let i = index">\n        <img [src]="pic.tmp" width="400px" height="75px" (click)="openGallery(i)">\n    </ion-col>\n  </ion-row>\n</ion-grid> -->\n\n<ion-grid>\n  <ion-row wrap>\n    <ion-col col-4 *ngFor="let pic of gallery ; let i = index">\n        <img [src]="pic.tmp" width="400px" height="75px" (press)="openEdit(pic)" (click)="openGallery(i)">\n    </ion-col>\n  </ion-row>\n</ion-grid>\n\n<!--\n<ion-fab right bottom>\n <button ion-fab color="light" (click)="openBanner()" ><ion-icon name="add" ></ion-icon></button>\n\n</ion-fab>\n-->\n\n       </ion-list>\n\n    <ion-list *ngSwitchCase="\'Videos\'" >\n\n      <div class="deatils" *ngIf="selected" (click)="openVideo(selected.video_path)">\n        <img class="vid" [src]="selected.image_path">\n        <img class="playicon" src="assets/playbutton.png">\n\n        <!-- <ion-icon class="playicon" name="play"></ion-icon> -->\n        <!-- <h3 style="padding-left: 10px"> {{selected.name}} </h3>\n        <p style="padding-left: 10px"> {{selected.description}} </p> -->\n        <div class="info">\n         <label> <b>{{selected.name}}</b> </label>\n        <div text-justify style="white-space: pre-line;">{{selected.description}}</div>\n        </div>\n      </div>\n\n      <ion-grid>\n        <ion-row wrap>\n          <ion-col col-4 *ngFor="let vid of vgallery" >\n            <div >\n              <img [src]="vid.image_path" width="400px" height="75px" (click)="selectVideo(vid)" (press)="deleteVid(vid)">\n            </div>\n\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n\n      <!-- <ion-item>\n\n         <ion-scroll scrollX style="height:100px;">\n        <div class="scroll-item">\n        <ion-col col-33 *ngFor="let vid of vgallery">\n       <div class="card card-1" (click)="selectVideo(vid)">\n\n         <img src="{{vid.image_path}}">\n         </div>\n          </ion-col>\n         </div>\n         </ion-scroll>\n\n      </ion-item> -->\n\n\n\n    </ion-list>\n\n\n</div>\n<ion-fab right bottom>\n<button ion-fab color="light"><ion-icon name="arrow-dropup"></ion-icon></button>\n    <ion-fab-list side="top">\n       <button *ngIf="adminonly()"  ion-fab color="light" (click)="openBanner()"><ion-icon name="image"></ion-icon></button>\n     <button *ngIf="adminonly()"  ion-fab color="light" (click)="promptVideo()"><ion-icon name="videocam"></ion-icon></button>\n\n     <button ion-fab color="light" (click)="sharelink(items.category_id,items.id)"><ion-icon name="share"></ion-icon></button>\n\n\n         </ion-fab-list>\n\n\n</ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\detail\detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["i" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_13__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_streaming_media__["a" /* StreamingMedia */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_video_player__["a" /* VideoPlayer */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_video_editor__["a" /* VideoEditor */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SublistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__updatecontent_updatecontent__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FilterPage = (function () {
    function FilterPage(viewCtrl, popoverCtrl, events) {
        this.viewCtrl = viewCtrl;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
    }
    FilterPage.prototype.filterSub = function (filtercode) {
        this.events.publish("filtercode", filtercode);
        this.viewCtrl.dismiss();
    };
    FilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: "\n     <ion-list color=\"light\">\n     <ion-item (click)=\"filterSub(99)\">\n     <img src=\"assets/eye.png\" item-left width=\"20%\" height=\"20%\"/>\n             \u6240\u6709\n    </ion-item>\n       <ion-item (click)=\"filterSub(0)\">\n       <img src=\"assets/foodicon1.png\" item-left width=\"27px\" height=\"27px\"/>\n               \u98DF\u5C1A\n      </ion-item>\n      <ion-item (click)=\"filterSub(2)\">\n      <img src=\"assets/familyicon1.png\" item-left width=\"27px\" height=\"27px\"/>\n      \u89AA\u5B50\u6D3B\u52A8\n      </ion-item>\n      <ion-item (click)=\"filterSub(1)\">\n      <img src=\"assets/globe1.png\" item-left width=\"27px\" height=\"27px\"/>\n              \u767C\u73FE\u4E4B\u65C5\n     </ion-item>\n     </ion-list>\n      "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], FilterPage);
    return FilterPage;
}());

var SublistPage = (function () {
    function SublistPage(actionSheetCtrl, alertCtrl, events, popoverCtrl, navCtrl, navParams, loadingCtrl, ss) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.ss = ss;
        this.items = [];
        this.backup_items = [];
        this.code = 0;
        this.locations = [];
        this.showlocpage = false;
        this.showme = false;
        this.start = 10;
        this.end = 10;
        this.total = 0;
    }
    SublistPage.prototype.ionViewDidLoad = function () {
        this.content.scrollToTop();
        this.locations = [];
        var direct = this.navParams.get('locname');
        if (direct !== undefined) {
            console.log("Direct Wash: " + this.navParams.get("id"));
            this.washData(direct);
        }
        else {
            console.log("Normal Clicked: " + this.navParams.get("id"));
            var param = "id=" + this.navParams.get("id") + "&subid=0&start=0&end=10&type=0";
            this.title = this.navParams.get("name");
            // console.log(this.navParams.data);
            this.listitem(param);
            this.subFilter();
            this.getLocation();
        }
    };
    SublistPage.prototype.showLP = function () {
        this.showlocpage = true;
        this.showme = false;
    };
    SublistPage.prototype.presentAS = function (item) {
        var _this = this;
        console.log(this.adminonly());
        console.log(this.checkPermission());
        if (this.adminonly() == true) {
            if (this.checkPermission() == true) {
                var actionSheet = this.actionSheetCtrl.create({
                    buttons: [
                        {
                            text: 'Edit',
                            handler: function () {
                                _this.editSublist(item);
                            }
                        },
                        {
                            text: 'Delete',
                            handler: function () {
                                _this.delSublist(item);
                            }
                        },
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        }
                    ]
                });
                actionSheet.present();
            }
            else {
                var actionSheet = this.actionSheetCtrl.create({
                    buttons: [
                        {
                            text: 'Edit',
                            handler: function () {
                                _this.editSublist(item);
                            }
                        }
                    ]
                });
                actionSheet.present();
            }
        }
        else {
        }
    };
    SublistPage.prototype.adminonly = function () {
        if (this.ss.readData("loginSts") == 1)
            return true;
        else
            return false;
    };
    SublistPage.prototype.checkPermission = function () {
        if (this.ss.readData("delete_action") == 1)
            return true;
        else
            return false;
    };
    SublistPage.prototype.delSublist = function (item) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete?',
            message: 'Do you really want to delete this item?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.delContent(item);
                    }
                }
            ]
        });
        alert.present();
    };
    SublistPage.prototype.delContent = function (item) {
        var _this = this;
        console.log(item);
        var newparam = "content_id=" + item.content_id + "&category_id=" + item.category_id;
        this.ss.dataList(newparam, "deleteContent.php")
            .then(function (response) {
            alert("Item successfully deleted!");
            _this.ionViewDidLoad();
        })
            .catch(function (Error) {
            // alert("Insert Data Error");
        });
    };
    SublistPage.prototype.editSublist = function (item) {
        var _this = this;
        var param = "category_id=" + item.category_id + "&content_id=" + item.content_id;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getContentDetail.php").then(function (response) {
            _this.obj = response;
            var detailItem = _this.obj.Data;
            loading.dismiss();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__updatecontent_updatecontent__["a" /* UpdatecontentPage */], { detailItem: detailItem });
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    SublistPage.prototype.washData = function (loc) {
        var _this = this;
        this.lokasi = loc;
        this.start = 10;
        this.showlocpage = false;
        this.popo = "main_category_id=" + this.navParams.get("id") + "&location=" + loc + "&start=0&end=10";
        console.log(this.popo);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(this.popo, "washDatabyLocation.php").then(function (response) {
            _this.content.scrollToTop();
            _this.items = undefined;
            _this.items = response;
            // this.total= this.items.total;
            //this.start=this.items.start;
            //this.end=this.items.end;
            _this.items = _this.items.Data;
            console.log(_this.items);
            _this.backup_items = _this.items;
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    SublistPage.prototype.getLocation = function () {
        var _this = this;
        var i;
        var param = "main_category_id=" + this.navParams.get("id");
        console.log("Sending" + param);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getMain_Location.php").then(function (response) {
            _this.display = response;
            _this.display = _this.display.Data;
            for (i = 0; i <= _this.display.length; i++) {
                var name_1 = _this.display[i].name;
                var pipeline = name_1.split("/");
                var chinese = pipeline[0];
                var english = pipeline[1];
                _this.locations.push({
                    name: name_1,
                    chinese: chinese,
                    english: english
                });
            }
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    SublistPage.prototype.subFilter = function () {
        var _this = this;
        this.events.subscribe("filtercode", function (code) {
            if (code == 99) {
                _this.papa = undefined;
                _this.ionViewDidLoad();
            }
            else {
                _this.code = code;
                // this.start = 0;
                // this.end = 0;
                // this.lokasi = undefined;
                _this.papa = "id=" + _this.navParams.get("id") + "&subid=0&start=0&end=10&type=" + code;
                _this.filteritem(_this.papa);
            }
        });
        this.events.subscribe("deletion", function (data) {
            if (_this.papa !== undefined) {
                //means its filtered before, need to show filtered result
                _this.filteritem(_this.papa);
            }
            else if (_this.popo !== undefined) {
                //means its filtered by location before, need show filtered result;
                _this.washData(_this.lokasi);
            }
            else {
                //means it does not filtered before, need to show full list with refresh
                var param = "id=" + _this.navParams.get("id") + "&subid=0&start=0&end=10&type=0";
                _this.listitem(param);
            }
        });
        this.events.subscribe("edition", function (data) {
            if (_this.papa !== undefined) {
                //means its filtered before, need to show filtered result
                _this.filteritem(_this.papa);
            }
            else if (_this.popo !== undefined) {
                //means its filtered by location before, need show filtered result;
                _this.washData(_this.lokasi);
            }
            else {
                //means it does not filtered before, need to show full list with refresh
                var param = "id=" + _this.navParams.get("id") + "&subid=0&start=0&end=10&type=0";
                _this.listitem(param);
            }
        });
    };
    SublistPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(FilterPage);
        popover.present({
            ev: myEvent
        });
    };
    SublistPage.prototype.filteritem = function (param) {
        var _this = this;
        this.lokasi = undefined;
        this.start = 10;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getSubCategoryById_BK.php").then(function (response) {
            _this.items = undefined;
            _this.items = response;
            _this.total = _this.items.total;
            //this.start=this.items.start;
            //this.end=this.items.end;
            _this.items = _this.items.Data;
            console.log(_this.items);
            _this.backup_items = _this.items;
            loading.dismiss();
            _this.content.scrollToTop();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    SublistPage.prototype.listitem = function (param) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList(param, "getSubCategoryById.php").then(function (response) {
            // console.log("Initialized item: ");
            // console.log(this.items);
            _this.items = undefined;
            _this.items = response;
            _this.total = _this.items.total;
            //this.start=this.items.start;
            //this.end=this.items.end;
            _this.items = _this.items.Data;
            console.log(_this.items);
            _this.backup_items = _this.items;
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    SublistPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.lokasi !== undefined) {
            console.log("doing infinite scroll for location");
            this.papa = undefined;
            // if(this.total>=this.start &&  this.showme==false)
            // {
            var param = "main_category_id=" + this.navParams.get("id") + "&location=" + this.lokasi + "&start=" + this.start + "&end=" + this.end;
            console.log("param limit" + param);
            this.ss.dataList(param, "washDatabyLocation.php").then(function (response) {
                _this.limititem = response;
                _this.total = _this.limititem.total;
                _this.start = parseInt(_this.limititem.start) + 10;
                console.log(_this.limititem.Data);
                if (_this.limititem.Data != null) {
                    _this.limititem.Data.forEach(function (element) {
                        _this.items.push(element);
                        //this.backup_items.push(element);
                    });
                }
                _this.limititem = "";
                infiniteScroll.complete();
            });
            // }
            //  else
            //  {
            // infiniteScroll.complete();
            //
            // }
        }
        else if (this.papa !== undefined) {
            console.log("doing infinite scroll for type filtering");
            this.lokasi = undefined;
            var param = "id=" + this.navParams.get("id") + "&subid=0&start=" + this.start + "&end=" + this.end + "&type=" + this.code;
            console.log("Doing infinite for " + param);
            this.ss.dataList(param, "getSubCategoryById_BK.php").then(function (response) {
                _this.limititem = undefined;
                _this.limititem = response;
                _this.total = _this.limititem.total;
                _this.start = parseInt(_this.limititem.start) + 10;
                console.log(_this.limititem.Data);
                _this.limititem.Data.forEach(function (element) {
                    _this.items.push(element);
                    //this.backup_items.push(element);
                });
                _this.limititem = "";
                infiniteScroll.complete();
            }).catch(function (Error) {
                console.log("Connection Error" + Error);
            });
        }
        else {
            console.log("doing infinite scroll for normal occasion");
            // if(this.total>=this.start &&  this.showme==false)
            // {
            var param = "id=" + this.navParams.get("id") + "&subid=0&start=" + this.start + "&end=" + this.end;
            console.log("param limit" + param);
            this.ss.dataList(param, "getSubCategoryById.php").then(function (response) {
                console.log("");
                _this.limititem = response;
                _this.total = _this.limititem.total;
                _this.start = parseInt(_this.limititem.start) + 10;
                _this.limititem.Data.forEach(function (element) {
                    _this.items.push(element);
                    //this.backup_items.push(element);
                });
                _this.limititem = "";
                infiniteScroll.complete();
            });
            // }
            //  else
            //  {
            // infiniteScroll.complete();
            //
            //  }
        }
    };
    SublistPage.prototype.listimage = function (imageurl) {
        var myStyles = {
            'background': 'url(' + imageurl + ') no-repeat',
            'background-size': '100% 100%'
        };
        return myStyles;
    };
    SublistPage.prototype.openPage = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], item);
    };
    SublistPage.prototype.getItems = function (ev) {
        var _this = this;
        // Reset items back to all of the items
        this.items = [];
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '' && val.length > 1) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            var id = this.navParams.get('id');
            var param = "search_string=" + val + "&id=" + id + "&subid=0&start=0&end=25";
            // console.log(this)
            //console.log("param limit"+param);
            this.ss.dataList(param, "searchEngine.php").then(function (response) {
                loading_1.dismiss();
                _this.limititem = response;
                _this.total = _this.limititem.total;
                //this.start=parseInt(this.limititem.start)+10;
                _this.limititem.Data.forEach(function (element) {
                    _this.items.push(element);
                    //this.backup_items.push(element);
                });
                _this.limititem = "";
            });
            /*
                  this.items = this.items.filter((item) => {
                    return (item.content_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
               })
            
               */
        }
        else {
            this.items = this.backup_items;
        }
    };
    SublistPage.prototype.onCancel = function (onCancel) {
        this.items = this.backup_items;
        this.showme = false;
    };
    SublistPage.prototype.seachshow = function () {
        if (this.showme == false)
            this.showme = true;
        else
            this.showme = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], SublistPage.prototype, "content", void 0);
    SublistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sublist',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\sublist\sublist.html"*/'\n<ion-header>\n <ion-navbar color="darkbule" class="navbar">\n    <ion-title>{{title}}</ion-title>\n    <ion-buttons end>\n      <button *ngIf="!showlocpage" color="white" ion-button icon-only (click)="presentPopover($event)">\n        <ion-icon name="list"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n <ion-searchbar class="sb" *ngIf="showme" (search)="getItems($event)" [showCancelButton]="shouldShowCancel"  (ionCancel)="onCancel($event)">></ion-searchbar>\n  <button *ngIf="showme" ion-button icon-only class="sbl" (click)="showLP()">\n    <ion-icon name="arrow-dropdown"></ion-icon>\n  </button>\n\n   <!-- <ion-select class="sbl" *ngIf="showme" placeholder="V" [(ngModel)]="loc" (ionChange)="washData(loc)" interface="action-sheet">\n     <ion-option *ngFor="let location of locations" value="{{location.name}}">{{location.name}}</ion-option>\n   </ion-select> -->\n</ion-header>\n\n<div class="locpage" *ngIf="showlocpage">\n  <ion-grid>\n    <ion-row>\n      <ion-col *ngFor="let location of locations" col-6>\n        <button ion-button block (click)="washData(location.name)">{{location.chinese}}<br>{{location.english}}</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</div>\n\n<ion-content >\n\n\n  <div class="img_item" *ngFor="let item of items" [ngStyle]="listimage(item.image_path)" style =" transform: translate3d(0px, 0px, 0px);" (click)="openPage(item)" (press)="presentAS(item)">\n\n   <div class="bottom_txt">\n   <p> {{item.content_name}} </p>\n     </div>\n\n  </div>\n\n<ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n\n<ion-fab right bottom>\n <button ion-fab color="light" (click)="seachshow()"><ion-icon name="search"></ion-icon></button>\n\n</ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\sublist\sublist.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_servercon__["a" /* Servercon */]])
    ], SublistPage);
    return SublistPage;
}());

//# sourceMappingURL=sublist.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sublist_sublist__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__addcategory_addcategory__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EventPage = (function () {
    function EventPage(alertCtrl, navCtrl, navParams, ss, loadingCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ss = ss;
        this.loadingCtrl = loadingCtrl;
        this.showme = false;
        this.addcategorypage = __WEBPACK_IMPORTED_MODULE_4__addcategory_addcategory__["a" /* AddcategoryPage */];
    }
    EventPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventPage');
        this.listitem();
    };
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
    EventPage.prototype.listitem = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.dataList("type=2&start=0", "getMainCategoryDataByType.php").then(function (response) {
            _this.items = response;
            _this.items = _this.items.Data;
            _this.backup_items = _this.items;
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    EventPage.prototype.listimage = function (imageurl) {
        var myStyles = {
            'background': 'url(' + imageurl + ') no-repeat',
            'background-size': '100% 100%'
        };
        return myStyles;
    };
    EventPage.prototype.openPage = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__sublist_sublist__["b" /* SublistPage */], item);
    };
    EventPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.items = this.backup_items;
        }
    };
    EventPage.prototype.onCancel = function (onCancel) {
        this.items = this.backup_items;
        this.showme = false;
    };
    EventPage.prototype.seachshow = function () {
        if (this.showme == false)
            this.showme = true;
        else
            this.showme = false;
    };
    EventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\event\event.html"*/'<ion-header>\n  <ion-navbar color="darkbule">\n      <ion-title>Location</ion-title>\n\n      <a tappable ion-button  clear menuToggle >\n        <ion-icon name="menu"></ion-icon>\n <!-- <img tappable src="assets/BLS_35.png"  class="logo_head"/> -->\n      </a>\n\n\n  </ion-navbar>\n   <ion-searchbar *ngIf="showme" (ionInput)="getItems($event)" [showCancelButton]="shouldShowCancel"  (ionCancel)="onCancel($event)">></ion-searchbar>\n\n</ion-header>\n\n<ion-content >\n\n  <div class="img_item" *ngFor="let item of items" [ngStyle]="listimage(item.image_path)" style =" transform: translate3d(0px, 0px, 0px);" (click)="openPage(item)">\n    <ion-badge *ngIf="item.count"  color ="danger" item-right style="margin:0px; width: 40px;">{{item.count}}</ion-badge>\n   <div class="bottom_txt">\n   <p> {{item.name}} </p>\n     </div>\n\n  </div>\n\n<ion-fab right bottom>\n\n\n\n<button ion-fab color="light"><ion-icon name="arrow-dropup"></ion-icon></button>\n    <ion-fab-list side="top">\n       <button ion-fab color="light" (click)="seachshow()"><ion-icon name="search"></ion-icon></button>\n       <button ion-fab color="light" [navPush]="addcategorypage"><ion-icon name="add"></ion-icon></button>\n    </ion-fab-list>\n\n\n</ion-fab>\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\event\event.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_servercon__["a" /* Servercon */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], EventPage);
    return EventPage;
}());

//# sourceMappingURL=event.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutusPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AboutusPage = (function () {
    function AboutusPage(navCtrl, iab, navParams, loadingCtrl, ss) {
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.ss = ss;
        ;
    }
    AboutusPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutusPage');
        this.loadinfo();
    };
    AboutusPage.prototype.subPage = function (event) {
    };
    AboutusPage.prototype.loadinfo = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ss.getDatalist("getAboutUs.php").then(function (response) {
            _this.htmlinfo = response;
            _this.htmlinfo = _this.htmlinfo.data;
            loading.dismiss();
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            loading.dismiss();
        });
    };
    AboutusPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-aboutus',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\aboutus\aboutus.html"*/'<ion-header>\n  <ion-navbar color="darkbule">\n    <a tappable ion-button  clear menuToggle >\n      <ion-icon name="menu"></ion-icon>\n<!-- <img tappable src="assets/BLS_35.png"  class="logo_head"/> -->\n    </a>\n\n    <ion-title>About Us</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="bg" padding [innerHTML]="htmlinfo"></div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\aboutus\aboutus.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_servercon__["a" /* Servercon */]])
    ], AboutusPage);
    return AboutusPage;
}());

//# sourceMappingURL=aboutus.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_earth_earth__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_event_event__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_topten_topten__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_fave_fave__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_banners_banners__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_aboutus_aboutus__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_screen_orientation__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import{TabtoptenPage} from '../pages/tabtopten/tabtopten';



//import { GalleryPage } from '../pages/gallery/gallery';


var MyApp = (function () {
    function MyApp(platform, screenOrientation, ss) {
        this.platform = platform;
        this.screenOrientation = screenOrientation;
        this.ss = ss;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        if (this.platform.is("ios")) {
            this.mystyle = { 'margin-right': '12px' };
        }
        else {
            this.mystyle = { 'margin-right': '29px' };
        }
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */], 'icon': 'home', 'img': '', 'adminonly': false },
            { title: 'Earth', component: __WEBPACK_IMPORTED_MODULE_4__pages_earth_earth__["a" /* EarthPage */], 'icon': '', 'img': 'assets/globe.png', 'adminonly': false },
            { title: 'Location', component: __WEBPACK_IMPORTED_MODULE_5__pages_event_event__["a" /* EventPage */], 'icon': '', 'img': 'assets/pin.png', 'adminonly': false },
            { title: 'Favorite', component: __WEBPACK_IMPORTED_MODULE_7__pages_fave_fave__["a" /* FavePage */], 'icon': 'heart', 'img': '', 'adminonly': false },
            { title: 'Top 30', component: __WEBPACK_IMPORTED_MODULE_6__pages_topten_topten__["a" /* ToptenPage */], 'icon': '', 'img': 'assets/Top30_50.png', 'adminonly': false },
            { title: 'Upload', component: __WEBPACK_IMPORTED_MODULE_8__pages_banners_banners__["a" /* BannersPage */], 'icon': 'images', 'img': '', 'adminonly': true },
            { title: 'About Us', component: __WEBPACK_IMPORTED_MODULE_9__pages_aboutus_aboutus__["a" /* AboutusPage */], 'icon': 'log-out', 'img': '', 'adminonly': false }
        ];
        if (this.ss.readData("loginSts")) {
            this.myname = this.ss.readData("myname");
        }
        else {
            this.myname = "Hi Guest";
        }
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
            // .then((data) => {
            //   alert(data);
            // })
            // .catch((error) => {
            //   alert("Error " + error);
            // })
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["l" /* StatusBar */].styleDefault();
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["k" /* Splashscreen */].hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.adminonly = function (check) {
        if (check) {
            if (this.ss.readData("loginSts"))
                return true;
            else
                return false;
        }
        else {
            return true;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\app\app.html"*/'<ion-menu [content]="content" >\n  <ion-header >\n    <ion-toolbar color="darkcray">\n      <div padding>\n        <div class="topmenutitle">{{myname}}</div>\n     \n    </div> \n    </ion-toolbar>\n   \n  </ion-header>\n\n  <ion-content >\n    <ion-list>\n <div *ngFor="let p of pages">     \n<ion-item  menuClose  (click)="openPage(p)" *ngIf="adminonly(p.adminonly)" >\n       <ion-icon *ngIf="p.icon" [name]="p.icon" item-left></ion-icon>\n<img *ngIf="p.img" [src]="p.img" item-left width="27px" height="27px" [ngStyle]="mystyle"/>\n        {{p.title}}\n      </ion-item>\n </div>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_10__providers_servercon__["a" /* Servercon */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabtoptenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__aboutus_aboutus__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabtoptenPage = (function () {
    function TabtoptenPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.page = __WEBPACK_IMPORTED_MODULE_2__aboutus_aboutus__["a" /* AboutusPage */];
        this.page1 = __WEBPACK_IMPORTED_MODULE_2__aboutus_aboutus__["a" /* AboutusPage */];
        this.page2 = __WEBPACK_IMPORTED_MODULE_2__aboutus_aboutus__["a" /* AboutusPage */];
    }
    TabtoptenPage.prototype.ionViewDidLoad = function () {
    };
    TabtoptenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tabtopten',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\tabtopten\tabtopten.html"*/'\n<ion-tabs >\n  <ion-tab [root]="page" tabTitle="Home" tabIcon="contact"></ion-tab>\n  <ion-tab [root]="page1" tabTitle="About" tabIcon="compass"></ion-tab>\n  <ion-tab [root]="page2" tabTitle="Exit" tabIcon="analytics"></ion-tab>\n</ion-tabs>\n\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\tabtopten\tabtopten.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], TabtoptenPage);
    return TabtoptenPage;
}());

//# sourceMappingURL=tabtopten.js.map

/***/ }),

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the Video page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var VideoPage = (function () {
    function VideoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    VideoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VideoPage');
    };
    VideoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-video',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\video\video.html"*/'<!--\n  Generated template for the Video page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>video</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\video\video.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], VideoPage);
    return VideoPage;
}());

//# sourceMappingURL=video.js.map

/***/ }),

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddvideoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the Addvideo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AddvideoPage = (function () {
    function AddvideoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AddvideoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddvideoPage');
    };
    AddvideoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addvideo',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\addvideo\addvideo.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>addvideo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\addvideo\addvideo.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], AddvideoPage);
    return AddvideoPage;
}());

//# sourceMappingURL=addvideo.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GalleryPage = (function () {
    function GalleryPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.mygallery = this.navParams.get("gallery");
        console.log(this.navParams.get("cindex"));
        this.init = this.navParams.get("cindex");
    }
    GalleryPage.prototype.ngAfterViewInit = function () {
        // ScreenOrientation.unlockOrientation();
        this.slides.initialSlide = this.navParams.get("cindex");
        this.slides.zoom = true;
        this.slides.zoomMax = 10;
    };
    GalleryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GalleryPage');
    };
    GalleryPage.prototype.closePage = function () {
        //
        //   ScreenOrientation.lockOrientation('portrait-primary').then(data => {
        //
        // console.log(data);
        // })
        // .catch(error => {
        // console.log(error);
        //    });
        //
        //  this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
    ], GalleryPage.prototype, "slides", void 0);
    GalleryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-gallery',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\gallery\gallery.html"*/'\n\n<ion-content >\n\n <ion-fab top right edge style="padding-top: 50px; padding-right: 20px">\n    <button ion-fab mini color="danger"  (click)="closePage()"  ><ion-icon  name="close"  ></ion-icon></button>\n    </ion-fab>\n\n<ion-slides #slides progress zoom>\n  <ion-slide  *ngFor="let pic of mygallery"   padding>\n    <img [src]="pic.src">\n     <ion-fab bottom right style="padding-right: 20px" >\n   <button ion-fab mini >info</button>\n   <ion-fab-list side="top" style="left: -250px; font-size: small; padding: 5px;">\n     <p  wrap>\nThere are a myriad of satellites in orbit of Earth with cameras that can send back amazing photos, but they can’t snap a photo of the entire planet at once. NASA’s Earth Polychromatic Imaging Camera (EPIC) camera can, though. It sends back thousands of amazing photos every year, and now you can peruse them more easily with the new website. It is, dare I say, epic.\n</p>\n   </ion-fab-list>\n  \n </ion-fab>\n   </ion-slide>\n </ion-slides>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\gallery\gallery.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */]])
    ], GalleryPage);
    return GalleryPage;
}());

//# sourceMappingURL=gallery.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddcategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_servercon__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__event_event__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddcategoryPage = (function () {
    function AddcategoryPage(platform, navCtrl, navParams, actionSheetCtrl, ss, events, imagePicker, loadingCtrl, viewCtrl, toastCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ss = ss;
        this.events = events;
        this.imagePicker = imagePicker;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.lastImage = null;
        this.image_path = "assets/upi.jpg";
        this.page = "insertMainCategoryData.php";
        this.homepage = __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */];
        this.eventpage = __WEBPACK_IMPORTED_MODULE_6__event_event__["a" /* EventPage */];
        this.name = "";
        this.type = "1";
        this.rate = "";
        this.retrunPage = this.homepage;
    }
    AddcategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddcategoryPage');
    };
    AddcategoryPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    AddcategoryPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        console.log('namePath', namePath);
        console.log('currentName', currentName);
        console.log('cordova', cordova.file.externalRootDirectory);
        console.log('newFileName', newFileName);
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* File */].copyFile(namePath, currentName, cordova.file.externalRootDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            console.log('Error while storing file.');
        });
    };
    AddcategoryPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.externalRootDirectory + img;
        }
    };
    AddcategoryPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            // this.base64Image = "data:image/jpeg;base64," + imageData;
            _this.image_path = imageData;
            // this.imageUrl = imageData.replace('file://','');
            // this.imageName = imageData.substring(imageData.lastIndexOf("/") + 1);
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA) {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imageData.substring(imageData.lastIndexOf('/') + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    AddcategoryPage.prototype.resizeImage = function (uri) {
        var _this = this;
        var options = {
            uri: uri,
            quality: 100,
            width: 800,
            height: 800
        };
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["g" /* ImageResizer */].resize(options).then(function (res) {
            console.log('resizepath', res);
            _this.image_path = res;
        }, function (err) {
            console.log('resizepath', err);
        });
    };
    AddcategoryPage.prototype.browsePicture = function (sourceType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].getPicture({
            quality: 100,
            // targetWidth: 900,
            // targetHeight: 900,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            console.log('browse', imageData);
            // imageData is a base64 encoded string
            // this.base64Image = imageData;
            _this.image_path = imageData;
            // let imageSplit = imageData;
            // imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
            // this.imageUrl = imageSplit.replace('file://','');
            // this.imageName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
            // console.log('1', imageSplit);
            // console.log('2', this.imageUrl);
            // console.log('3', this.imageName);
            // this.camer_upload();
            if (_this.platform.is('android') && sourceType === __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY) {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["e" /* FilePath */].resolveNativePath(imageData)
                    .then(function (filePath) {
                    console.log('filepath', filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var imageSplit = imageData;
                    imageSplit = imageSplit.substring(0, imageSplit.indexOf('?'));
                    var currentName = imageSplit.substring(imageData.lastIndexOf("/") + 1);
                    console.log('currentfilename', currentName);
                    console.log('currentfilename', imageData.substring(imageData.lastIndexOf('/') + 1));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            console.log(err);
        });
    };
    AddcategoryPage.prototype.upload = function (imgurl) {
        var _this = this;
        console.log('enter');
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["m" /* Transfer */]();
        console.log('enter', imgurl);
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        targetPath = targetPath.replace('file://', '');
        console.log('lastpath', targetPath);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            params: {
                'fileName': filename,
            }
        };
        console.log('oprtion', options);
        console.log('url', this.ss.fileURL + filename);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        fileTransfer.upload(targetPath, this.ss.ServerURL + "uploadFile.php", options, true)
            .then(function (data) {
            loading.dismiss();
            console.log('aaa', data);
            _this.addCategory(imgurl);
        }, function (err) {
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
    };
    AddcategoryPage.prototype.addCategory = function (imageUrl) {
        var _this = this;
        var imgName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        this.imgFileURL = this.ss.fileURL + imgName;
        this.param = "name=" + this.name + "&image_path=" + this.imgFileURL + "&type=" + this.type + "&valid_flag=" + "1";
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
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        console.log(this.page + "?" + this.param);
        loading.present();
        this.ss.createCategory(this.param, this.page).then(function (response) {
            console.log('resres', response);
            loading.dismiss();
            _this.navCtrl.pop();
            _this.events.publish("maincatedit", "true");
            _this.presentToast("uploaded successfully");
            // if(this.type=='1')
            //   this.nav.push(this.homepage);
            // else
            //   this.nav.push(this.eventpage);
        }).catch(function (Error) {
            console.log("Connection Error" + Error);
            _this.presentToast(Error);
            loading.dismiss();
        });
    };
    AddcategoryPage.prototype.camer_upload = function () {
        var _this = this;
        console.log('camupload');
        var fileTransfer = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["m" /* Transfer */]();
        var options;
        options = {
            fileKey: 'file',
            fileName: 'bwlf.jpg',
        };
        fileTransfer.upload(this.image_path, this.ss.ServerURL + "upload.php", options)
            .then(function (data) {
            console.log('cam upload', data);
            var datas = JSON.parse(JSON.stringify(data));
            _this.image_path = datas.response;
        }, function (err) {
            console.log(err);
            console.log("err" + JSON.stringify(err) + _this.ss.ServerURL + "upload.php");
        });
        //fileTransfer.abort();
    };
    AddcategoryPage.prototype.presentToast = function (info) {
        var toast = this.toastCtrl.create({
            message: info,
            duration: 3000
        });
        toast.present();
    };
    AddcategoryPage.prototype.save = function () {
        this.upload(this.lastImage);
    };
    AddcategoryPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Image',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePicture(__WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Browser',
                    icon: 'image',
                    handler: function () {
                        _this.browsePicture(__WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    AddcategoryPage.prototype.cancel = function () {
        this.navCtrl.pop();
        // this.navCtrl.setRoot(this.retrunPage);
    };
    AddcategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addcategory',template:/*ion-inline-start:"C:\Users\131216\Crappy\BLS\src\pages\addcategory\addcategory.html"*/'\n<ion-header>\n\n  <ion-navbar color="darkbule">\n    <ion-title>Add Category</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n<ion-list>\n\n <ion-item>\n    <div>\n    <img [src]="image_path"  (click) ="presentActionSheet()"/>\n    </div>\n  </ion-item>\n\n  <ion-item>\n    <ion-label stacked>Category Name:</ion-label>\n    <ion-input type="text" [(ngModel)]="name"></ion-input>\n  </ion-item>\n\n<ion-item>\n    <ion-label>Type</ion-label>\n    <ion-select [(ngModel)]="type">\n     <ion-option value="1">Earth</ion-option>\n      <ion-option value="2">Location</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label stacked>Top</ion-label>\n    <ion-input  type="number" step="any" name="topRate" [(ngModel)]="rate" min="1"\n               max="20"></ion-input>\n  </ion-item>\n\n</ion-list>\n\n<button ion-button full color="secondary" (click)="save()">Save</button>\n <button ion-button full color="danger"  (click)="cancel()">Cancel</button>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\131216\Crappy\BLS\src\pages\addcategory\addcategory.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_servercon__["a" /* Servercon */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */]])
    ], AddcategoryPage);
    return AddcategoryPage;
}());

//# sourceMappingURL=addcategory.js.map

/***/ })

},[411]);
//# sourceMappingURL=main.js.map