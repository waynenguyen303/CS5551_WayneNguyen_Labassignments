import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Toast} from 'ionic-angular';
import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from 'ionic-angular';
import { ToastController, ModalController } from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {
  private lib2:any;


  library= ['bkg.jpg','ball.jpg','ball2.jpg','kc.jpg','kc2.jpg','cat.jpg','cat2.jpg','football.jpg'];

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private modalCtrl: ModalController, private platform: Platform, public navParams: NavParams,private photoLibrary:PhotoLibrary) {


  }






}
