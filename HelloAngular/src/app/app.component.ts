import { Component } from '@angular/core';
// Constant
import { stationList } from './station-list.const';
import { Message } from './message'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * 所有列車到站站名之資料
   *
   * @memberof AppComponent
   */
  list = stationList;
  color = 'yellow';

  power = 5;
  factor = 5;
  
  name = "";
  content = "";
  
  
  /**
  * 所有留言都放在這裡
  *
  * @type {Message[]}
  * @memberof AppComponent
  */
  messages: Message[] = [];
  /**
 * 新增留言
 *
 * @memberof AppComponent
 */
  addMessage(): void {

  // 防呆，避免名稱或內容是空值時也可以留言
   if (
     !this.name.trim() || 
     !this.content.trim()
   ) {
     return;
   }
 
   // 用名稱跟內容產生一個留言的資料物件
   const message = new Message(this.name, this.content);
 
   // 將留言的資料物件放進容器裡
   this.messages.push(message);
 
   // 清空內容
   this.content = '';
 
 }
}