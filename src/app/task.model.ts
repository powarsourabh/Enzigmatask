export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    assignedTo: string;
    status: string;
    dueDate: string;
    priority: string;
    comments: string;
  }
  
  export interface User {
    id: number;
   name : string;
  }