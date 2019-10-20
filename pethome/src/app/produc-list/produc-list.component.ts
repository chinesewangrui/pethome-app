import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';
import { NavController, IonInfiniteScroll, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produc-list',
  templateUrl: './produc-list.component.html',
  styleUrls: ['./produc-list.component.scss'],
})
export class ProducListComponent implements OnInit {
  // 依赖注入
  constructor(private nav:NavController,private http:HttpClient,private url:UrlService,private router:Router,private alert:AlertController) { }
  private productList=[];
  private pno=0;
  private hasMore=true;//是否还有更多数据可供加载
  // 无限滚动组件
  @ViewChild('myScroll',{static:false})
  private myScroll:IonInfiniteScroll;
  //加载下一页商品数据
  loadMore(){
    if(!this.hasMore){
      return
    }
    this.pno++;
    this.http.get(this.url.productListApi+this.pno).subscribe((res:any)=>{
      if(this.pno>=res.pageCount){
        this.hasMore=false;
      }
      this.productList=this.productList.concat(res.data);
     
      //通知无限滚动事件数据加载完成
      this.myScroll.complete();
    })
  }
  //返回到历史记录的上一个页面
  goback(){
    this.nav.back()
  }
  goCart(){
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
    this.loadMore()
  }

}
