import { Injectable } from '@angular/core';
import { ToDoItem } from '../models/todo-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks = new BehaviorSubject<ToDoItem[]>([]);

  constructor() {
    this.loadTasks();
   }

  private loadTasks(): void {
    const storedTasks = window.localStorage.getItem('tasks');
    if(storedTasks) {
      this.tasks.next(JSON.parse(storedTasks));
    }
    else {
      this.tasks.next([]);
    }
  }

  private saveTask(tasks: ToDoItem[]) {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addTask(task: string): void {
    if(task.trim() === '') {
      console.error('Task cannot be empty');
      return;
    }

    const newTask: ToDoItem = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 9), //generate a random id
      name: task.trim(),
      completed: false
    };

    const updatedTasks = [newTask, ...this.tasks.value]
    this.tasks.next(updatedTasks);
    this.saveTask(updatedTasks);
  }

  removeTask(id: string): void {
    const currentTasks = [...this.tasks.value];
    const updatedTasks = currentTasks.filter(task => task.id !== id)

    this.tasks.next(updatedTasks)
    this.saveTask(updatedTasks);
  }

  toggleCompleteTask(id: string): void {
    const currentTasks = [...this.tasks.value];
    const taskIndex = currentTasks.findIndex(task => task.id === id);

    currentTasks[taskIndex] = {
      ...currentTasks[taskIndex],
      completed: !currentTasks[taskIndex].completed
    };
    this.tasks.next(currentTasks);
    this.saveTask(currentTasks);
  }
}