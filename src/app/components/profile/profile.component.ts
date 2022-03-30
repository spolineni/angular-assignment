import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any;
  constructor(private userService: UserService, private router: Router) { 
    this.userService.getUserProfile().subscribe(data => this.userData = data);
  }

  ngOnInit(): void {
  }

  /* clearing out the session storage variable when logout is clicked */

  logout() {
    sessionStorage.removeItem('loginStatus');
    this.router.navigate(['user-registration']);
  }

}
