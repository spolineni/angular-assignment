import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  showLoader: boolean = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    bio: ['', Validators.required]
  });

  ngOnInit(): void {
    if(sessionStorage.getItem('loginStatus')) {
      sessionStorage.removeItem('loginStatus')
    }
  }

  /* adding a delay to show the progress bar loading */

  regiterUser() {
    //Not passing any form data as its a mock GET API.
    this.showLoader = true;
    this.userService.registerUser().subscribe((data) => {
      sessionStorage.setItem('loginStatus', JSON.stringify(data));
      this.router.navigate(['profile']);
    });
  }

}
