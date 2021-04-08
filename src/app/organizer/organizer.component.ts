import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../shared/date.service';
import { Task, TasksService } from '../shared/tasks.service';
import { } from "rxjs/";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  public form: FormGroup;
  public tasks: Task[] = [];

  constructor(
    public dateService: DateService,
    private tasksService: TasksService
  ) { }

  public ngOnInit() {
    this.dateService.date
      .pipe(switchMap(val => this.tasksService.loadTasks(val)))
      .subscribe(tasks => {
        this.tasks = tasks;
      })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  public submitForm() {
    const { title } = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.tasksService.createTask(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
    }, err => console.error(err))
  }

  public removeTask(task: Task) {
    this.tasksService.removeTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.error(err))
  }

}
