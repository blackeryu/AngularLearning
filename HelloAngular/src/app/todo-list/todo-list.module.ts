import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component'



@NgModule({
  imports: [
    CommonModule
  ],
  exports:[TodoListComponent],
  declarations: [TodoListComponent]
})
export class TodoListModule { }
