import { Injectable } from '@angular/core';



@Injectable({
    providedIn:'root'
})

export class UrlService{
    //服务器主机地址
    public host='http://127.0.0.1:5050/';
    //首页数据Api地址
    public indexApi=this.host+'products/index'
    //商品列表页Api地址 ?pno=0&kw=xx
    public productListApi=this.host+'products/list?pno='
    //猫咪列表页Api地址
    public catsApi=this.host+'products/cats?pno='
    //商品详情Api地址
    public productDetailApi=this.host+'products/details?pid='
    //猫咪详情Api地址
    public catDetailApi=this.host+'products/petdetails?aid='
    //用户登录Api地址
    public loginApi=this.host+'user/login'
    //用户注册Api地址
    public regApi=this.host+'user/reg'
    //用户名验证Api
    public testApi=this.host+'user/check?uname='
    //获取宠物知识Api地址
    public knowledgeApi=this.host+'products/knowledge?pno=';
    // 获取购物车Api
    public cartApi=this.host+'products/carts'
    //添加商品到购物车
    public addCartApi=this.host+'products/addcart'
    // 获得首页轮播图数据Api
    public bannerApi=this.host+'products/getbanners'
    //删除购物车中商品
    public delApi=this.host+'products/delItem?id='
}