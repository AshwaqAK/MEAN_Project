import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ProjectComponent } from './component/project/project.component';
import { TaskComponent } from './component/task/task.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "sign-in", pathMatch: "full" },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
