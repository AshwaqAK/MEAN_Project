export const environment = {
  production: false,
  apiUrl: 'http://' + window.location.hostname + ':8080/api/',
};

export const SketchBrahma = {
  signUp: 'user/signUp',
  signIn: 'user/signIn',
  logOut: 'user/logOut',

  // project routes
  createProject: 'project/createProject',
  getProject: 'project/getProject',
  updateProject: 'project/updateProject',
  deleteProject: 'project/deleteProject',
  getProjectById: 'project/getProjectById',

  // task routes
  createTask: 'task/createTask',
  getTask: 'task/getProjectTask',
  updateTask: 'task/updateTask',
  deleteTask: 'task/deleteTask',
}
