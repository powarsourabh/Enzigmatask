import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  {
    path:'tasks', component:TaskListComponent
  },
  {path:'add-task', component:TaskFormComponent},
  {path:'edit-task/:id', component:TaskFormComponent},
  {path: '', redirectTo:'/tasks', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
