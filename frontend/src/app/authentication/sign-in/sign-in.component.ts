import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  error: any;
  submitted: boolean = false;
  loading = this.loader.loading$;
  constructor(private loader: LoadingService, private userService: UserService, private formBuilder: FormBuilder, private router: Router,) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[A-Za-z]{2,3})+$/)
      ]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      keepMeLoggedIn: [false],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }
    this.userService.signIn(this.signInForm.value).subscribe((res: any) => {
      this.userService.setToken(res.token);
      if (!this.userService.checkLogin()) {
        this.router.navigate(['project'])
      }
    }, error => { this.error = error.error.error })
  }

}
