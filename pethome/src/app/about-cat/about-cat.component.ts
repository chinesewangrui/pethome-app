import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about-cat',
  templateUrl: './about-cat.component.html',
  styleUrls: ['./about-cat.component.scss'],
})
export class AboutCatComponent implements OnInit {

  constructor(private nav:NavController,private url:UrlService,private http:HttpClient) { }
  private news=[];
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
    this.http.get(this.url.knowledgeApi+this.pno).subscribe((res:any)=>{
      if(this.pno>=res.pageCount){
        this.hasMore=false;
      }
      this.news=this.news.concat(res.data);
      console.log(this.news)
      //通知无限滚动事件数据加载完成
      this.myScroll.complete();
    })
  }
  //返回到历史记录的上一个页面
  goback(){
    this.nav.back()
  }
  ngOnInit() {
    this.loadMore()
  }

}
