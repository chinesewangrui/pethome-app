import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-more-knowledge',
  templateUrl: './more-knowledge.component.html',
  styleUrls: ['./more-knowledge.component.scss'],
})
export class MoreKnowledgeComponent implements OnInit {

  constructor(private route:ActivatedRoute,private nav:NavController) { }
  private title="";
  goback(){
    this.nav.back()
  }
  ngOnInit() {
    // 组件初始化完成后，读取当前路由地址中的参数——文章标题
    this.route.params.subscribe((data)=>{
      this.title=data.title
    })
  }

}
