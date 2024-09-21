import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, User } from '../task.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Output() taskUpdated = new EventEmitter<void>(); 
  taskForm: FormGroup;
  submitted: boolean = false; 
  message: string = '';  
  alertType: string = 'success';  
  users: User[] = []; 

  constructor(private taskservice:TaskService, private fb:FormBuilder, private router: Router){
  
    this.taskForm = this.fb.group({
      assignedTo: ['', Validators.required],
      status: ['Not Started', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['Normal', Validators.required],
      comments: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();  
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }

   
  }


  loadUsers(): void {
    this.taskservice.getUsers().subscribe(users => {
      this.users = users;  // Populate the users array
    }, error => {
      console.error('Error fetching users:', error);
    });
  }
 
  get formControls() {
    return this.taskForm.controls;
  }


  


  

  onSubmit(): void {
    this.submitted = true;

    if (this.taskForm.invalid) {
      this.message = 'Please fill out all required fields.';
      this.alertType = 'danger';  
      return;
    }

    const taskOperation: Observable<Task> = this.task ?
      this.taskservice.updateTask({ ...this.task, ...this.taskForm.value }) :
      this.taskservice.addTask(this.taskForm.value);

    taskOperation.subscribe({
      next: () => {
        const action = this.task ? 'updated' : 'added';
        this.alertType = 'success';  
        this.taskUpdated.emit();  
      },
      error: (error) => {
        console.error('Error occurred:', error);
        this.message = 'Error occurred while submitting the task.';
        this.alertType = 'danger';
      }
    });
  }
}
