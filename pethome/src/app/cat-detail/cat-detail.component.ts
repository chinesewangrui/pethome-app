import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.scss'],
})
export class CatDetailComponent implements OnInit {

  constructor(private nav:NavController,private http:HttpClient,private url:UrlService,private route:ActivatedRoute) { }
  private aid=0;
  private cat={};
  private pics=[];
  //找到轮播图子组件
  @ViewChild("myCats",{static:true})
  private myCats:IonSlides;
  goback(){
    this.nav.back()
  }
  doBuy(){
    console.log("Just Buy It")
  }
  ngOnInit() {
    // 组件初始化完成后,读取当前路由中的地址中的参数--传递过来的商品编号
    this.route.params.subscribe(data=>{
      this.aid=data.aid;
      this.http.get(this.url.catDetailApi+this.aid).subscribe((res:any)=>{
        this.cat=res.data.pet;
        this.pics=res.data.pics;
      })
    })
    //启动轮播图
    this.myCats.startAutoplay()
  }

}
