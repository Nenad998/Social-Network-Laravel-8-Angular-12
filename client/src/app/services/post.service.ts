import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../components/common/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  postsUserID1(): Observable<any[]>{
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    let token = '';
    token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseUrl}/home`, {headers: headers});
  }

  postLikes(postId: number): Observable<any[]>{
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    let token = '';
    token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseUrl}/postLikes/${postId}`, {headers: headers});
  }

  like(postID: number): Observable<any>{
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    let token = '';
    token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.baseUrl}/like`, postID, {headers: headers});
  }

  isLiked(postID: number): Observable<any>{
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    let token = '';
    token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.baseUrl}/isLiked/${postID}`, {headers: headers});
  }

  unlike(postID: number): Observable<boolean>{
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    let token = '';
    token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<boolean>(`${this.baseUrl}/unlike/${postID}`, {headers: headers});
  }


}
