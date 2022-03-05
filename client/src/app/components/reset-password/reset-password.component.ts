import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token:any = '';
  message:any;
  error:any={
    password: ''
  }

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.token = param.token;
    });

    // if user logged in, can't access to reset-password page
    if(this.auth.isLoggedIn()){
      this.router.navigate(['user']);
    }
  } 

  
  onSubmit(form:NgForm){
    const password = form.value.password;
    const password_confirmation = form.value.password_confirmation;

    this.auth.reset(this.token, password, password_confirmation).subscribe(
      (response:any) => {
        this.message = response.message;
      },
      error => {
        this.error = error.error.errors;
        //console.log(error.error.errors);
      });
  }

}
