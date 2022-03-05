import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  error:any={
    email: ''
  }
  message:any;

  constructor(private auth: AuthenticationService, private router: Router) { }

  // if user logged in, can't access to forgot-password page
  ngOnInit(): void {
     if(this.auth.isLoggedIn()){
     this.router.navigate(['user']);
   }  
 }

  onSubmit(form: NgForm){
    const email = form.value.email;
     this.auth.forgot(email).subscribe(
      (response:any) => {
        //console.log(response)
        this.message = response.message;
      },
      error => {
        this.error = error.error.errors;
        //console.log(error.error.errors)
      }); 
  }

}
