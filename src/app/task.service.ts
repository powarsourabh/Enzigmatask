import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, User } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private apiUrl = 'http://localhost:3000/tasks'; 
  private userApiUrl = 'http://localhost:3000/users';  



  constructor(private http: HttpClient) { }


  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

 
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task); 
  }
  

 
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }

}
