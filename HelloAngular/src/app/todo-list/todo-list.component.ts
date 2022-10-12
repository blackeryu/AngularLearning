import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { TodoStatusType } from './todo-status-type';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoListService: TodoListService) { }
  /**
   * 待辦事項狀態的列舉
   *
   * @memberof TodoListComponent
   */
  todoStatusType = TodoStatusType;

  /**
    * 目前狀態
    *
    * @private
    * @memberof TodoListComponent
    */
  private status = TodoStatusType.All;

  ngOnInit(): void {
  }
  
  /**
   * 新增代辦事項
   *
   * @param {HTMLInputElement} inputRef - 輸入框的元素實體
   * @memberof TodoListComponent
   */
   addTodo(inputRef: any): void {
    const todo = inputRef.value.trim();
    
    if (todo) {
      this.todoListService.add(inputRef.value);
      inputRef.value = '';
    }
  }
  
  /**
 * 取得待辦事項清單
 *
 * @returns {Todo[]}
 * @memberof TodoListComponent
 */
getList(): Todo[] {

  let list: Todo[] = [];

  switch (this.status) {

    case TodoStatusType.Active:
      list = this.getRemainingList();
      break;

    case TodoStatusType.Completed:
      list = this.getCompletedList();
      break;

    default:
      list = this.todoListService.getList();
      break;

  }

  return list;

}

  delTodo(index : number):void{
    this.todoListService.del(index);
  }

  /**
 * 開始編輯待辦事項
 *
 * @param {Todo} todo
 * @memberof TodoListComponent
 */
  edit(todo: Todo): void {
    todo.editable = true;
  }

  /**
   * 更新待辦事項
   *
   * @param {Todo} todo - 原本的待辦事項
   * @param {string} newTitle - 新的事項名稱
   * @memberof TodoListComponent
   */
  update(todo: Todo, newTitle: string): void {

    if (!todo.editing) {
      return;
    }

    const title = newTitle.trim();

    // 如果有輸入名稱則修改事項名稱
    if (title) {
      todo.setTitle(title);
      todo.editable = false;

    // 如果沒有名稱則刪除該項待辦事項
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.delTodo(index);
      }
    }

}

  /**
   * 取消編輯狀態
   *
   * @param {Todo} todo - 欲取消編輯狀態的待辦事項
   * @memberof TodoListComponent
   */
  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }

  /**
   * 取得未完成的待辦事項清單
   *
   * @returns {Todo[]}
   * @memberof TodoListComponent
   */
  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }

  /**
   * 取得已完成的待辦事項
   *
   * @returns {Todo[]}
   * @memberof TodoListComponent
   */
  getCompletedList(): Todo[] {
    return this.todoListService.getWithCompleted(true);
  }

  /**
   * 設定狀態
   *
   * @param {number} status - 欲設定的狀態
   * @memberof TodoListComponent
   */
  setStatus(status: number): void {
    this.status = status;
  }

  /**
   * 檢查目前狀態
   *
   * @param {number} status - 欲檢查的狀態
   * @returns {boolean}
   * @memberof TodoListComponent
   */
  checkStatus(status: number): boolean {
    return this.status === status;
  }
}
