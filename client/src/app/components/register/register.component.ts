import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  genders: string[] = ['male', 'female'];
  errors:any = '';

  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      gender: [''],
      image: [null],
    });

    // if user logged in, can't access to register page
    if(this.auth.isLoggedIn()){
      this.router.navigate(['user']);
    }
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity()
    //console.log(this.form.get('image'))
  }
 
  submitForm() {
    var formData: any = new FormData();
    formData.append("name", this.form.get('name').value);
    formData.append("email", this.form.get('email').value);
    formData.append("password", this.form.get('password').value);
    formData.append("password_confirmation", this.form.get('password_confirmation').value);
    formData.append("gender", this.form.get('gender').value);
    formData.append("image", this.form.get('image').value);
    //console.log(formData.get('image'))
    //console.log(this.form.value)

    this.http.post('http://127.0.0.1:8000/api/register', formData).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.errors = error.error.errors;
        //console.log(error)
      }
  )}


}
