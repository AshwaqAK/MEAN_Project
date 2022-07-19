import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectService } from 'src/app/services/project.service';
declare var $: any;
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectForm!: FormGroup;
  projects: any;
  error: any;
  loading = this.loader.loading$;
  projectId: any;
  createBtn: boolean = true;
  editBtn: boolean = false;
  constructor(private loader: LoadingService, private projectService: ProjectService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      project_name: ['', Validators.required],
      project_type: ['', Validators.required],
      lead: ['', Validators.required],
      teamSize: ['', Validators.required],
    });
    this.getProject()
  }

  getProject() {
    this.projectService.getProject().subscribe((project: any) => {
      this.projects = project.project
    })
  }

  toggleButton(flag: any) {
    if (flag == "create") this.createBtn = true, this.editBtn = false, this.projectForm.reset();
    if (flag == "edit") this.createBtn = false, this.editBtn = true;
  }

  createProject() {
    if (this.projectForm.invalid) {
      this.error = "All field are requird"
      setTimeout(() => {
        this.error = ''
      }, 3000);
      return
    }
    this.projectService.createProject(this.projectForm.value).subscribe((project: any) => {
      this.projects.push(project.project);
      ($('#createProject') as any).modal('hide');
      this.projectForm.reset();
    })
  }

  editProject() {
    this.projectService.updateProject(this.projectForm.value, this.projectId).subscribe((res: any) => {
      this.getProject()
    })
  }

  projectID(info: any) {
    this.projectId = info
  }

  patchProject(info: any) {
    this.projectId = info._id
    this.projectForm.patchValue({
      project_name: info.project_name,
      project_type: info.project_type,
      lead: info.lead,
      teamSize: info.teamSize,
    })
  }

  deleteProject() {
    this.projectService.deleteProject(this.projectId).subscribe((res: any) => {
      ($('#deleteProject') as any).modal('hide');
      this.projects = this.projects.filter((p: any) => p._id !== res.project._id)
    })
  }

} 
