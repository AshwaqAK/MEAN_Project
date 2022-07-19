import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, SketchBrahma } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  // create project service
  createProject(data: any) {
    return this.http.post(BACKEND_URL + SketchBrahma.createProject, data);
  }

  // get project service
  getProject() {
    return this.http.get(BACKEND_URL + SketchBrahma.getProject);
  }

  // update project service
  updateProject(data: any, projectId: any) {
    return this.http.put(BACKEND_URL + SketchBrahma.updateProject, data, { params: { projectId: projectId } });
  }

  // delete project service
  deleteProject(data: any) {
    return this.http.delete(BACKEND_URL + SketchBrahma.deleteProject + `/${data}`)
  }

  // get project by id
  getProjectById(id: number) {
    return this.http.get(BACKEND_URL + SketchBrahma.getProjectById, { params: { id: id } })
  }
}
