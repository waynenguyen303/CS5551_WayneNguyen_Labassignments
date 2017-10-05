import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {query} from "@angular/core/src/animation/dsl";
import {HttpClient} from "@angular/common/http";

export class type{

  private query: string="";
  private googleAPIkey: string="&key=AIzaSyAIJC4iA7279Vyq2gLVfzzDmZUooqShUhI";
  private URL: string="https://kgsearch.googleapis.com/v1/entities:search?query=";
  private result:any;
  private subresult: any;
  private PixabayKey: string="6627635-091e9de4bc6b9740a958fffa2";
  private Pixabay_URL: string="https://pixabay.com/api/?key=";

  gsearch(){
    this.http.get(this.URL+this.query+this.googleAPIkey+"&limit=5").subscribe(data=>{
      if(console.log("Test Passed")){return true;}
      else{console.log("Test Failed"); return false;}
    })

  }

  Pixsearch(clicked){
    console.log("hello");
    this.http.get(this.Pixabay_URL+this.PixabayKey+"&q="+encodeURIComponent(clicked)).subscribe(data=>{
      if(console.log("Test Passed")){return true;}
      else{console.log("Test Failed"); return false;}
    })
  }
  constructor(public navCtrl: NavController, private http:HttpClient) {

  }
}
