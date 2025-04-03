import { Component, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ToDoItem } from '../../models/todo-item';

@Component({
  selector: 'app-to-do-list-item',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.css'
})

export class ToDoListItemComponent {
  @Input() task!: ToDoItem;

  constructor(private taskService: TasksService) {}

  completeTask() {
    this.taskService.toggleCompleteTask(this.task.id);
  }

  deleteTask() {
    this.taskService.removeTask(this.task.id);
  }
}
