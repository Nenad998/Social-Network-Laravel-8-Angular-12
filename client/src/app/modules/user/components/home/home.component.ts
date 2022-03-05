import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/components/common/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: PostService, private formBuilder: FormBuilder) { }

  posts:any[] = [];
  moment = moment;
  usersLike:any[] = []
  imagePath = 'http://127.0.0.1:8000/storage';
  likeForm: FormGroup;
  //isLiked: boolean;
  clicked:boolean = true;

  ngOnInit(): void {
     this.likeForm = this.formBuilder.group({
     post_id: ['']
    }); 
   
    this.showPostsOfUserID1();
  }


  showPostsOfUserID1(){
    this.service.postsUserID1().subscribe(
      (response:any) =>{
        //console.log(response.data)
        this.posts = response.data;
        //this.clicked = true;
      },
      error =>{
        //console.log(error)
      });
  }

  userPostLike(postID){
    this.service.postLikes(postID).subscribe(
      (response:any) =>{
        //console.log(response.data)
        this.usersLike = response.data;
      },
      error =>{
        //console.log(error)
      }
    )
  }

  like(postId: number){   
    this.likeForm.controls['post_id'].setValue(postId);
    //console.log(this.likeForm.value)

     this.service.like(this.likeForm.value).subscribe(
      response => {
        //console.log(response)
/* 
         if(response == 'already liked post'){
          this.clicked = false
        } */  
        this.clicked = false;

        this.showPostsOfUserID1();
      }, error =>{
        //console.log(error)
      }
    ) 
  }

  isLiked(postId: number){
    this.service.isLiked(postId).subscribe(
      (response:any) => {
        console.log(response)
        if(response.data === true){
          this.clicked = false;
          console.log('already liked post')
        } else{
          this.clicked = true;
          console.log('like success')
        }
        
      },
      error =>{
        console.log(error)
      }
    )
  }

  

  unlike(postId: number){
    this.service.unlike(postId).subscribe(
      response =>{
        //console.log(response)
        this.showPostsOfUserID1();
      },
      error =>{
        //console.log(error)
      }
    )
  }

} 
