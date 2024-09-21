import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task, User } from './task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should retrieve tasks from the API via GET', () => {
    const mockTasks: Task[] = [
      { id: 1, assignedTo: 'User A', status: 'Not Started', dueDate: '2024-09-21', priority: 'Low', comments: '', title: 'Task 1', description: 'Description', completed: false },
      { id: 2, assignedTo: 'User B', status: 'In Progress', dueDate: '2024-09-22', priority: 'High', comments: '', title: 'Task 2', description: 'Description', completed: false }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should add a task via POST', () => {
    const newTask: Task = { id: 3, assignedTo: 'User C', status: 'Completed', dueDate: '2024-09-23', priority: 'Normal', comments: '', title: 'New Task', description: 'New Description', completed: true };

    service.addTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(newTask);
  });

  it('should update a task via PUT', () => {
    const updatedTask: Task = { id: 1, assignedTo: 'User A', status: 'Completed', dueDate: '2024-09-21', priority: 'Low', comments: '', title: 'Updated Task', description: 'Updated Description', completed: true };

    service.updateTask(updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(updatedTask);
  });

  it('should delete a task via DELETE', () => {
    const taskId = 1;
  
    service.deleteTask(taskId).subscribe(response => {
      expect(response).toBeNull(); 
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });
  
  it('should retrieve users from the API via GET', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'User A' },
      { id: 2, name: 'User B' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(service['userApiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
