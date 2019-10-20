import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  constructor(private nav:NavController,private route:ActivatedRoute,private http:HttpClient,private url:UrlService,private alert:AlertController,private router:Router,private toast:ToastController) { }
  private pid=0;
  private product={
    pid:0,price:0,title:'',subtitle:'',sm:'',lg:''
  };
  private picList=[];
  private count=1;
  //找到轮播图
  @ViewChild('myCarousel',{static:true})
  private mybanners:IonSlides;
  goback(){
    this.nav.back()
  }
  // 数量减少
  doLess(){
    this.count--;
    if(this.count<=1){
      this.count=1
    }
  }
  //数量增加
  doAdd(){
    this.count++;
  }
  //购买
  doBuy(){
    console.log("买买买")
  };
  //添加到购物车
  doAddCart(){
    let pid=this.product.pid;
    let price=this.product.price;
    let title=this.product.title;
    let subtitle=this.product.subtitle;
    let count=this.count;
    let pic=this.product.sm;
    let url=this.url.addCartApi;
    let body=`pid=${pid}&price=${price}&title=${title}&subtitle=${subtitle}&pic=${pic}&count=${count}`;
    let options={
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      withCredentials : true//设置发送请求的时候带cookie保存session
    }
    this.http.post(url,body,options).subscribe((res:any)=>{
      console.log(res)
      if(res.code==-1){//未登录,跳转到登录页
        const alert=this.alert.create({
          header:'提示',
          message:'您尚未登录,是否跳转到登录页面',
          buttons:[
            {
              text:'我再逛逛',
              handler:()=>{
                this.router.navigateByUrl("product-list")
              }
            },
            {
              text:'好的',
              handler:()=>{
                this.router.navigateByUrl("user-login")
              }
            }
          ]
        }).then(alert=>{alert.present()})
      }else if(res.code==-2){//添加失败
        const toast=this.toast.create({
          color:'medium',
          duration:2000,
          message:'添加失败',
          position:'middle',
          showCloseButton:true
        }).then(toast=>{toast.present()})
        return;
      }else{//添加成功
        const toast=this.toast.create({
          color:'medium',
          duration:1000,
          message:'添加成功',
          position:'middle'
        }).then(toast=>{toast.present()})
      }
    })
  }
  //前往购物车
  doGoCart(){
    let isLogin=sessionStorage.getItem("isLogin");
    if(isLogin){
      this.router.navigateByUrl("cart")
    }else{
      const alert=this.alert.create({
        header:'提示',
        message:'您尚未登录,是否跳转到登录页面',
        buttons:[
          {
            text:'我再逛逛',
            handler:()=>{
              this.router.navigateByUrl("product-list")
            }
          },
          {
            text:'好的',
            handler:()=>{
              this.router.navigateByUrl("user-login")
            }
          }
        ]
      }).then(alert=>{alert.present()})
    }
  }
  ngOnInit() {
    //组件化初始完成后,读取当前路由地址中的参数--要查询的商品编号
    this.route.params.subscribe(data=>{
      this.pid=data.pid;
      this.http.get(this.url.productDetailApi+this.pid)
      .subscribe((res:any)=>{
        this.product=res.data;
        this.picList=res.others.map((elem,i)=>{
          return {pic:elem.md,pid:elem.pid}
        })
      })
    })
    //启动轮播图
    this.mybanners.startAutoplay()
  }

}
