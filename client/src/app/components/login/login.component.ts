import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  imageSrc = 'assets/image/home_image.jpg';
  errors:any = '';
  badCreds:string;

  constructor(private auth: AuthenticationService, private router: Router) { }

  // if user logged in, can't access to login page
  ngOnInit(): void {
     if(this.auth.isLoggedIn()){
      this.router.navigate(['user']);
    } 
  }

  onSubmit(form: NgForm){

    const email = form.value.email;
    const password = form.value.password;

     this.auth.login(email, password).subscribe( (response:any) =>{
      
       if(response.message === 'Bad creds'){
        this.badCreds = response.message;
        this.router.navigate(['/login']); 
      } else{
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/user']);
      } 
    },
    (error) =>{
      this.errors = error.error.errors;
      //console.log(error);
    }); 
  }

}
