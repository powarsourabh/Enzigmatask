import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceMock: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskServiceMock = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask', 'updateTask']);
    
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: taskServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  

  
  

  it('should not delete a task if confirmation is canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false); 

    component.deleteTask(1);
    expect(taskServiceMock.deleteTask).not.toHaveBeenCalled(); 
  });

  it('should edit a task', () => {
    const task: Task = {
      id: 1, assignedTo: 'User A', status: 'Not Started', dueDate: '2024-09-21', priority: 'Normal', comments: 'First task', completed: false,
      title: '',
      description: ''
    };

    component.editTask(task);
    fixture.detectChanges();

    expect(component.selectedTask).toEqual(task);
    expect(component.showForm).toBeTrue();
  });

  it('should navigate to the next page', () => {
    component.totalPages = 3;
    component.currentPage = 1;

    component.nextPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);
  });

  it('should not navigate beyond the total pages', () => {
    component.totalPages = 3;
    component.currentPage = 3;

    component.nextPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(3); 
  });

  it('should navigate to the previous page', () => {
    component.currentPage = 2;

    component.previousPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
  });

  it('should not navigate before the first page', () => {
    component.currentPage = 1;

    component.previousPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(1); 
  });

  it('should toggle the form visibility', () => {
    component.toggleForm();
    fixture.detectChanges();
    expect(component.showForm).toBeTrue();

    component.toggleForm();
    fixture.detectChanges();
    expect(component.showForm).toBeFalse();
  });
});
