import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TodoListModule } from './todo-list/todo-list.module';

import { ChangeThemeDirective } from './app-highlight.directive';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangeThemeDirective,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TodoListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
