import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
declare var $: any;
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  projectId: any;
  projectInfo: any;
  taskForm!: FormGroup;
  tasks: any = [];
  error: any;
  loading = this.loader.loading$;
  taskId: any;
  createBtn: boolean = true;
  editBtn: boolean = false;
  taskContainer: boolean = false;
  constructor(private loader: LoadingService, private route: ActivatedRoute, private formBuilder: FormBuilder, private projectService: ProjectService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.projectId = params.id
    })
    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe((res: any) => {
        this.projectInfo = res.task[0]
      })
    }
    this.taskFormFields()
    this.getTask()
  }

  taskFormFields() {
    this.taskForm = this.formBuilder.group({
      employee_name: ['', Validators.required],
      task_name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      taskComplete: [false],
      projectId: ['', Validators.required],
    });
  }

  getTask() {
    this.taskService.getTask(this.projectId).subscribe((task: any) => {
      this.tasks = task.task
    })
  }

  createTask() {
    if (this.projectId) this.taskForm.get("projectId")?.patchValue(this.projectId)
    if (this.taskForm.invalid) {
      this.error = "All field are requird"
      setTimeout(() => {
        this.error = ''
      }, 3000);
      return
    }
    this.taskService.createTask(this.taskForm.value).subscribe((task: any) => {
      this.tasks.push(task.task);
      ($('#createTask') as any).modal('hide');
      this.taskForm.reset();
    })
  }

  taskInfo(info: any) {
    this.taskId = info
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId).subscribe((res: any) => {
      ($('#deleteTask') as any).modal('hide');
      this.tasks = this.tasks.filter((p: any) => p._id !== res.task._id)
    })
  }

  toggleButton(flag: any) {
    if (flag == "create") this.createBtn = true, this.editBtn = false, this.taskForm.reset(); this.taskContainer = false;
    if (flag == "edit") this.createBtn = false, this.editBtn = true, this.taskContainer = true;
  }

  patchTask(info: any) {
    this.taskId = info._id
    this.taskForm.patchValue({
      employee_name: info.employee_name,
      task_name: info.task_name,
      description: info.description,
      priority: info.priority,
      projectId: info.projectId,
    })
  }

  taskComplete(e: any) {
    this.taskForm.patchValue({ taskComplete: e.value })
  }

  editTask() {
    this.taskService.updateTask(this.taskForm.value, this.taskId).subscribe(res => {
      this.getTask();
      ($('#createTask') as any).modal('hide');
      this.taskForm.reset();
    })
  }
}
