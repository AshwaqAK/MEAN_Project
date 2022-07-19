import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from 'src/app/utils/confirmed-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  error: any;
  submitted: boolean = false;
  loading = this.loader.loading$;
  constructor(private loader: LoadingService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[A-Za-z]{2,3})+$/)
      ]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      keepMeLoggedIn: [false],
    }, { validator: ConfirmedValidator('password', 'confirmPassword') });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.userService.singUp(this.signUpForm.value).subscribe((res: any) => {
      this.router.navigate(['sign-in'])
    }, error => { this.error = error.error.error })
  }

}
