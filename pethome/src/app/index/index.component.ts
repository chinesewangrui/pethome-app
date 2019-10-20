import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  // 依赖注入:导航控制器 Http服务 url服务
  constructor(private http:HttpClient,private url:UrlService) { }
  @ViewChild('myCarousel',{static:true})
  private myCarousel:IonSlides;
  private cats=[];
  private products=[];
  private banners=[];
  loadData(){
    this.http.get(this.url.indexApi).subscribe((res:any)=>{
      this.cats=res.cutepet;
      this.products=res.supply.slice(0,-1);
    })
    this.http.get(this.url.bannerApi).subscribe((res:any)=>{
      this.banners=res.data;
    })
  }

  ngOnInit() {
    this.loadData();
    this.myCarousel.startAutoplay();
  }

}
