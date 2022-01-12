import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status } = filterDto;
    let tasks = this.tasks;
    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }
    return tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    console.log(title, description);
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    console.log(task);
    return task;
  }
  getTaskById(id: string): Task {
    let found;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == id) {
        found = this.tasks[i];
      }
    }
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }
  deleteTaskById(id: string): void {
    // for (let i = 0; i < this.tasks.length; i++) {
    //   if (this.tasks[i].id == id) {
    //     delete this.tasks[i];
    //   }
    // }
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  updateTaskStatusById(id: string, status: TaskStatus): Task {
    // for (let i = 0; i < this.tasks.length; i++) {
    //   if (this.tasks[i].id == id) {
    //     this.tasks[i].status = status;
    //   }
    // }
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
