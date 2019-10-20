import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  constructor(private nav:NavController,private url:UrlService,private http:HttpClient,private alert:AlertController) { }
  private products=[];
  private total=0;
  goback(){
    this.nav.back()
  }
  doLess(i){
    let count=this.products[i].count
    if(count>1){
      count-=1;
      this.products[i].count=count;
      this.getTotal()
    }else{
      this.doDel(this.products[i].id,i);
      this.getTotal()
    }
  }
  doAdd(i){
    let count=this.products[i].count
    count+=1;
    this.products[i].count=count;
    this.getTotal()
  }
  doDel(id,i){
      const alert=this.alert.create({
        header:'提醒',
        message:'是否确定删除该商品?',
        buttons:[
          {
            text:'我再想想',
            handler:()=>{}
          },
          {
            text:'确认',
            handler:()=>{
              this.http.get(this.url.delApi+id).subscribe((res:any)=>{
                this.products.splice(i,1)
              })
            }
          }
        ]
      }).then(alert=>alert.present())
  }
  doBuy(){
    console.log("支付功能尚未上线!")
  }
  getTotal(){
    this.total=(()=>{
      return this.products.reduce((prev,elem)=>
        prev+elem.count*elem.price
      ,0)
    })()
  }
  ngOnInit() {
    this.http.get(this.url.cartApi,{withCredentials:true}).subscribe((res:any)=>{
      console.log(res.data)
      this.products=res.data;
      this.getTotal()
    })
  }

}
