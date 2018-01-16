import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { PhotoViewer,LaunchNavigator, SocialSharing} from 'ionic-native';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IonicStorageModule } from '@ionic/storage'
import { HttpModule } from '@angular/http';
// import { SocialSharing } from '@ionic-native/social-sharing';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FilterPage } from '../pages/sublist/sublist';

import { MorePage } from '../pages/home/home';
import { SubPage } from '../pages/home/home';
import { EarthPage } from '../pages/earth/earth';
import { EventPage } from '../pages/event/event';
import { ToptenPage } from '../pages/topten/topten';
import{TabtoptenPage} from '../pages/tabtopten/tabtopten';
import { FavePage } from '../pages/fave/fave';
import { SublistPage } from '../pages/sublist/sublist';
import { DetailPage } from '../pages/detail/detail';
import { PopoverPage } from '../pages/detail/detail';
import { BannersPage } from '../pages/banners/banners';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { GalleryPage } from '../pages/gallery/gallery';
import { Servercon } from '../providers/servercon';
import {VideoPage} from  '../pages/video/video';
import {AddvideoPage} from  '../pages/addvideo/addvideo';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { VideoEditor } from '@ionic-native/video-editor';
import { ImagePicker } from '@ionic-native/image-picker';
import { AddcategoryPage } from '../pages/addcategory/addcategory';
import { AddcontentPage } from '../pages/addcontent/addcontent';
import { UpdatecategoryPage } from '../pages/updatecategory/updatecategory';
import { UpdatecontentPage } from '../pages/updatecontent/updatecontent';
import { PopoverEdit } from '../pages/detail/detail';
import { UpdategalleryPage } from '../pages/updategallery/updategallery';

import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!


import * as ionicGalleryModal from 'ionic-gallery-modal';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

import { VideoPlayer } from '@ionic-native/video-player';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EarthPage,
    EventPage,
    ToptenPage,
    FavePage,
    PopoverPage,
    BannersPage,
    AboutusPage,
    SublistPage,
    DetailPage,
    GalleryPage,
    VideoPage,
    MorePage,
    FilterPage,
    SubPage,
    TabtoptenPage,

    // GalleryModal,
    // ZoomableImage,
    AddcategoryPage,
    AddvideoPage,
    AddcontentPage,
    UpdatecategoryPage,
    UpdatecontentPage,
    PopoverEdit,
    UpdategalleryPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TagInputModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EarthPage,
    EventPage,
    ToptenPage,
    BannersPage,
    PopoverPage,
    FavePage,
    AboutusPage,
    SublistPage,
    DetailPage,
    GalleryPage,
    VideoPage,
    MorePage,
    FilterPage,
    SubPage,
    TabtoptenPage,

    // GalleryModal,
    // ZoomableImage,
    AddcategoryPage,
    AddvideoPage,
    AddcontentPage,
    UpdatecategoryPage,
    UpdatecontentPage,
    PopoverEdit,
    UpdategalleryPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Servercon,
    PhotoViewer,
    LaunchNavigator,
    ScreenOrientation,
    FileTransfer,
    MediaCapture,
    File,
    Transfer,
    Camera,
    FilePath,
    StreamingMedia,
    VideoPlayer,
    InAppBrowser,
    VideoEditor,
    ImagePicker,
    SocialSharing,
  ]
})
export class AppModule {}
