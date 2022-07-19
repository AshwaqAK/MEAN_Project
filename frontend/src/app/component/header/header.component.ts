import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logOut().subscribe((res: any) => {
      localStorage.clear()
      this.router.navigate([''])
      console.log("sucess");

    })
  }

}
