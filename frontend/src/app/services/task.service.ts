import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, SketchBrahma } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // create task service
  createTask(data: any) {
    return this.http.post(BACKEND_URL + SketchBrahma.createTask, data);
  }

  // get Task service
  getTask(projectId: any) {
    return this.http.get(BACKEND_URL + SketchBrahma.getTask, { params: { projectId: projectId } });
  }

  // update Task service
  updateTask(data: any, taskId: any) {
    return this.http.put(BACKEND_URL + SketchBrahma.updateTask, data, { params: { taskId: taskId } });
  }

  // delete Task service
  deleteTask(data: any) {
    return this.http.delete(BACKEND_URL + SketchBrahma.deleteTask + `/${data}`)
  }
}
