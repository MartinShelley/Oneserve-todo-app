import { Component } from '@angular/core';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToDoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'oneserve-todo-app';
}
