import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.scss'],
})
export class UserRegComponent implements OnInit {

  constructor(private nav:NavController,private url:UrlService,private http:HttpClient,private toast:ToastController,private alert:AlertController) { }
  private uname="";
  private isName=0;
  private upwd="";
  private isUpwd=0;
  private cpwd="";
  private isSame=0;
  private email="";
  private phone="";
  private gender=1;
  @ViewChild('manChecked',{static:true})
  private manChecked;
  doCheckName(){
    if(this.uname==""){
      this.isName=1;
    }
    var reg=/^[a-zA-Z]\w{5,11}$/i
    if(!reg.test(this.uname)){
      this.isName=2;
      return;
    }else{
      this.http.get(this.url.testApi+this.uname).subscribe((res:any)=>{
        console.log(res)
        if(res.code==1){
          this.isName=3
        }else{
          this.isName=4
        }
      })
    }
  }
  doCheckupwd(){
    if(this.upwd==""){
      this.isUpwd=1;
      return
    }
    var reg=/\w{6,12}/i
    if(!reg.test(this.upwd)){
      this.isUpwd=2;
      this.upwd=""
      return ;
    }else{
      this.isUpwd=3
    }
  }
  doCheck(){
    console.log(1231)
    if(this.cpwd==this.upwd){
      this.isSame=1;
    }else{
      this.isSame=2;
      this.cpwd=""
    }
  }
  goback(){
    this.nav.back()
  }
  useToast(msg){
    const toast=this.toast.create({
      color:'medium',
      duration:2000,
      message:msg,
      position:'middle',
      showCloseButton:true
    }).then(toast=>{
      toast.present()
    })
  }
  doReg(){
    let uname=this.uname;
    let upwd=this.upwd;
    let email=this.email;
    let phone=this.phone;
    let gender=this.gender;
    if(uname==""){
      this.useToast('用户名不能为空');
      return
    }
    if(upwd==""){
      this.useToast('密码不能为空');
      return
    }
    if(email==""){
      this.useToast('请输入您的邮箱');
      return
    }
    if(phone==""){
      this.useToast("请输入您的联系电话");
      return
    }
    if(this.manChecked.checked){
      gender=1
    }else{
      gender=0
    }
    let url=this.url.regApi;
    let body=`uname=${uname}&upwd=${upwd}&email=${email}&phone=${phone}&gender=${gender}`
    let options={
      headers:{'Content-Type':'application/x-www-form-urlencoded'}
    }
    this.http.post(url,body,options).subscribe((res:any)=>{
      if(res.code==1){
        const alert=this.alert.create({
          header:'恭喜',
          message:'注册成功',
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
      }else{
        const alert=this.alert.create({
          header:'提示',
          message:'注册失败',
          buttons:[
            {
              text:'我再试试',
              handler:()=>{
               //尚未制作
              }
            }
          ]
        }).then(alert=>{alert.present()})
      }
    })
  }
  ngOnInit() {}

}
