import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {query} from "@angular/core/src/animation/dsl";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private query: string="blah";
  private googleAPIkey: string="&key=AIzaSyAIJC4iA7279Vyq2gLVfzzDmZUooqShUhI";
  private URL: string="https://kgsearch.googleapis.com/v1/entities:search?query=";
  private result:any;
  private subresult: any;
  private AWSKey: string="AKIAIMW4HKVNZ7252WLA";
  private AWSID: string="4588-7443-9718";
  private AWS_URL: string="https://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=AKIAIMW4HKVNZ7252WLA&AssociateTag=4588-7443-9718&Operation=ItemSearch&SearchIndex=Books&Keywords=";



  gsearch(){
    this.http.get(this.URL+this.query+this.googleAPIkey).subscribe(data=>{
      console.log(data);
      this.result =data;
      this.result = this.result.itemListElement;
    })

  }

  amzsearch(clicked){
      console.log("hello");
    this.http.get(this.AWS_URL+clicked).subscribe(data=>{
      console.log(data);
      this.subresult= data;
    })
  }



  constructor(public navCtrl: NavController, private http:HttpClient) {

  }

}
