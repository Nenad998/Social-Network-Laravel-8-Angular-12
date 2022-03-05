import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any = "";
  imagePath = 'http://127.0.0.1:8000/storage'

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    });

    this.currentUser();
  }

  logout(){
    this.auth.logout().subscribe(
      response =>{
        //console.log(response)
        localStorage.removeItem('user');
        this.router.navigate(['/login'])
      },
      error =>{
        //console.log(error)
      }
    )
  }

  currentUser() {
  this.auth.user().subscribe( response => {
    //console.log(response);
    this.user = response;
  }, error => {
    //console.log(error);
  })
}



  
}
