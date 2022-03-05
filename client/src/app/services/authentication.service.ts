import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedin = false;

  constructor(private http: HttpClient) { }  

  isLoggedIn() {

    if (localStorage.getItem("user") == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      this.isLoggedin = true;
      return this.isLoggedin;
    }
  }

  login(email:string, password:string){
    return this.http.post('http://127.0.0.1:8000/api/login', { email: email, password: password });   
   }

   user(){
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    let token = '';
    token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    }); 

    return this.http.get('http://127.0.0.1:8000/api/user', {headers: headers}); 
   }

   logout(){
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    let token = '';
    token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    return this.http.post('http://127.0.0.1:8000/api/logout', null, {headers: headers});
   }

   forgot(email:string){
    const data = {
      email:email
    }
    return this.http.post('http://127.0.0.1:8000/api/forgot', data);
  }

  reset(token:string, password:string, password_confirmation:string){
    const data = {
      token:token,
      password:password,
      password_confirmation:password_confirmation
    }
    return this.http.post('http://127.0.0.1:8000/api/reset', data);
  }

}
