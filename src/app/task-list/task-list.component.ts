import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  showForm: boolean = false;
  selectedTask?: Task; 
  searchText: string = '';
  currentPage: number = 1; 
  tasksPerPage: number = 5; 
  totalPages: number = 1; 




  constructor(private taskservice: TaskService){}

ngOnInit(): void {
  this.loadTasks();

}

loadTasks(): void {
  this.taskservice.getTasks().subscribe(tasks => this.filteredTasks = tasks);

  this.filterTasks();
}

filterTasks(): void {
  const searchTextLower = this.searchText.toLowerCase();
  this.filteredTasks = this.filteredTasks.filter(task => 
    task.assignedTo.toLowerCase().includes(searchTextLower) ||
    task.status.toLowerCase().includes(searchTextLower) ||
    task.priority.toLowerCase().includes(searchTextLower) ||
    task.comments.toLowerCase().includes(searchTextLower)
  );

  this.totalPages = Math.ceil(this.filteredTasks.length / this.tasksPerPage);
  this.currentPage = 1; 
}


deleteTask(id: number): void {
  const confirmation = confirm('Are you sure you want to delete this task?');
  if (confirmation) {
    this.taskservice.deleteTask(id).subscribe(() => {
      console.log(`Task with ID ${id} deleted`);
      this.loadTasks(); 
    }, error => {
      console.error('Error deleting task:', error);
    });
  } else {
    console.log('Deletion canceled');
  }
}

toggleForm(): void {
  this.showForm = !this.showForm;
  this.selectedTask = undefined;
}

onTaskUpdated(): void {
  this.loadTasks();  
  this.showForm = false;  
}

toggleCompletion(task: Task): void {
  task.completed = !task.completed; 
  this.taskservice.updateTask(task).subscribe(() => {
    console.log('Task completion status updated');
  }, error => {
    console.error('Error updating task:', error);
  });
}

editTask(task: Task): void {
  console.log('Edit task:', task); 
  this.selectedTask = task; 
    this.showForm = true; 
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}


}
