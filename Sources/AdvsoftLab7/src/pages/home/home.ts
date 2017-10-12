import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {query} from "@angular/core/src/animation/dsl";
import {HttpClient} from "@angular/common/http";
import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';
import { PhotoPage } from '../photo/photo';
import {PhotoViewer} from "@ionic-native/photo-viewer";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private query: string="";
  private googleAPIkey: string="&key=AIzaSyAIJC4iA7279Vyq2gLVfzzDmZUooqShUhI";
  private URL: string="https://kgsearch.googleapis.com/v1/entities:search?query=";
  private result:any;
  private subresult: any;
  private PixabayKey: string="6627635-091e9de4bc6b9740a958fffa2";
  private Pixabay_URL: string="https://pixabay.com/api/?key=";
  private url:any;
  private album:any;
  public libnum:any;


  gsearch(){
    this.http.get(this.URL+this.query+this.googleAPIkey+"&limit=15").subscribe(data=>{
      console.log(data);
      this.result =data;
      this.result = this.result.itemListElement;
    })

  }

  Pixsearch(clicked){
      console.log("hello");
    this.http.get(this.Pixabay_URL+this.PixabayKey+"&q="+encodeURIComponent(clicked)).subscribe(data=>{
      console.log(data);
      this.subresult= data;
      this.subresult = this.subresult.hits;
    })
  }

  Photoadd(photourl){
    console.log(photourl);

    var url = photourl; // file or remote URL. url can also be dataURL, but giving it a file path is much faster
    var album = 'PixaBay Photos';

    this.pViewer.show(url);
    this.photoLibrary.saveImage(url,album);
  }

  showphoto(){

  this.libnum = this.photoLibrary.getLibrary();

  }
  showPhotoPage(){
    this.navCtrl.push(PhotoPage);

  }
  constructor(public navCtrl: NavController, private http:HttpClient, private photoLibrary: PhotoLibrary, private pViewer:PhotoViewer) {


  }
}
