import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {

  constructor(private nav:NavController,private http:HttpClient,private url:UrlService,private router:Router,public toastController:ToastController,private alert:AlertController) { }
  private uname="";
  private upwd="";
  private testStr="";
  private n=60;
  private canGet=true;
  private entry={ischecked:true}
  goback(){
    this.nav.back()
  }
  getTest(){
    this.canGet=false;
    let timer=setInterval(()=>{
      this.n--;
      if(this.n==0){
        clearInterval(timer)
        this.n=60;
        this.canGet=true;
      }
    },1000)
  }
  doLogin(){
    if(this.uname===""){
      const toast =this.toastController.create({
        color: 'light',
        duration: 2000,
        message: "用户名不能为空",
        position:'middle',
        showCloseButton:true
      }).then(toast => {
        toast.present();
      });
      return;
    }else if(this.upwd===""){
      const toast =this.toastController.create({
        color: 'light',
        duration: 2000,
        message: "密码不能为空",
        position:'middle',
        showCloseButton:true
      }).then(toast => {
        toast.present();
      });
      return;
    }else{
      //向服务器发送异步登录请求,验证登录信息
      let url=this.url.loginApi;
      let body=`uname=${this.uname}&upwd=${this.upwd}`;
      let options={
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        withCredentials : true//设置发送请求的时候带cookie保存session
      }
      this.http.post(url,body,options).subscribe((res:any)=>{
        if(res.code=='-1'){
          const alert=this.alert.create({
            header:'提示',
            message:'用户名或密码错误',
            buttons:[
              {
                text:'OK',
                handler:()=>{
                  this.uname="";
                  this.upwd="";
                  this.testStr=""
                }
              }
            ]
          }).then(alert=>{alert.present()})
          return;
        }else{
          sessionStorage.setItem("isLogin","true")
          const alert=this.alert.create({
            header:'提示',
            message:'登陆成功',
            buttons:[
              {
                text:'前往用户中心',
                handler:()=>{
                 //尚未制作
                }
              },
              {
                text:'返回上一页',
                handler:()=>{
                  this.nav.back();
                }
              }
            ]
          }).then(alert=>{alert.present()})
        }
      })
    }
  }
  ngOnInit() {}

}
