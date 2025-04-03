import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { TasksService } from '../../services/tasks.service';
import { ToDoItem } from '../../models/todo-item';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [ReactiveFormsModule, ToDoListItemComponent],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent implements OnInit {
  tasks: ToDoItem[] = [];
  taskName = new FormControl('');

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.taskService.tasks.subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  addTask(): void {
    if(this.taskName.value) {
      this.taskService.addTask(this.taskName.value);
      this.taskName.reset();
    }
  }
}
