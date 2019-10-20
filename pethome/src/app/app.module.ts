import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { IndexComponent } from './index/index.component';
import { MainComponent } from './main/main.component';
import { ProducListComponent } from './produc-list/produc-list.component';
import { CatsListComponent } from './cats-list/cats-list.component';
import { CatDetailComponent } from './cat-detail/cat-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AboutCatComponent } from './about-cat/about-cat.component';
import { CartComponent } from './cart/cart.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoreKnowledgeComponent } from './more-knowledge/more-knowledge.component';

const routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:IndexComponent},//首页
  {path:'product-list',component:ProducListComponent},//商品列表
  {path:'about-cat',component:AboutCatComponent},//宠物知识
  {path:'user-login',component:UserLoginComponent},//登录
  {path:'cats-list',component:CatsListComponent},//猫咪列表
  {path:'cat-detail/:aid',component:CatDetailComponent},//猫咪详情
  {path:'product-detail/:pid',component:ProductDetailComponent},//商品详情
  {path:'cart',component:CartComponent},//购物车
  {path:'user-reg',component:UserRegComponent},//用户登录
  {path:'more-knowledge/:title',component:MoreKnowledgeComponent},//宠物饲养知识详情
  {path:'**',component:NotFoundComponent},//404
]
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MainComponent,
    ProducListComponent,
    CatsListComponent,
    CatDetailComponent,
    ProductDetailComponent,
    AboutCatComponent,
    CartComponent,
    UserLoginComponent,
    UserRegComponent,
    NotFoundComponent,
    MainComponent,
    MoreKnowledgeComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
