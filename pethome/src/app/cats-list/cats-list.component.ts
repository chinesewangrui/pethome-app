import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss'],
})
export class CatsListComponent implements OnInit {

  constructor(private nav:NavController,private http:HttpClient,private url:UrlService) { }
  private cats=[];
  private pno=0;
  private hasMore=true;
  //无限滚动组件
  @ViewChild('MoreCats',{static:false})
  private moreCats:IonInfiniteScroll;
  //加载下一页商品数据
  loadMore(){
    if(!this.hasMore){
      return
    }
    this.pno++;
    this.http.get(this.url.catsApi+this.pno).subscribe((res:any)=>{     
      this.cats=this.cats.concat(res.data)
      if(this.pno>=res.pageCount){
        this.hasMore=false
      }
      console.log(this.cats)
      //通知无限滚动事件数据加载完成
      this.moreCats.complete();

    })
  }
  // 返回到历史记录的上一页
  goback(){
    this.nav.back()
  }
  ngOnInit() {
    this.loadMore()
  }

}
