import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../_models/post';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stats } from '../_models/stats';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class PostService
{
  baseUrl = environment.apiUrl + "posts/";

  constructor (private http: HttpClient, private toastr: ToastrService, private accountService: AccountService) { }

  create(post: Post): Observable<Post>
  {
    let token;
    this.accountService.currentUser$.subscribe(user => token = user.token)
    return this.http.post<Post>(this.baseUrl, { post: post, token: token }).pipe(
      map((response: Post) =>
      {
        const post = response;
        if (post) {
          this.toastr.success("Created: " + post.jobTitle);
        }
        return post;
      }), catchError((err) =>
      {
        this.toastr.error('Error: ' + err.error);
        return EMPTY;
      })
    );
  }

  getPaginated(page: number, pageSize: number): Observable<Post[]>
  {
    return this.http.get<Post[]>(this.baseUrl, { headers: { page: page.toString(), pageSize: pageSize.toString() } }).pipe(
      map((response: Post[]) =>
      {
        const posts = response;
        return posts;
      }), catchError((err) =>
      {
        this.toastr.error('Error: ' + err.error);
        return EMPTY;
      })
    );
  }

  getPaginationInfo(page: number, pageSize: number): Observable<number>
  {
    return this.http.get<number>(this.baseUrl + "info", { headers: { page: page.toString(), pageSize: pageSize.toString() } }).pipe(
      map((response: number) =>
      {
        const { totalItems } = response as unknown as { totalItems: number };
        return totalItems;
      }), catchError((err) =>
      {
        this.toastr.error('Error: ' + err.error);
        return EMPTY;
      })
    );
  }

  getById(id: string): Observable<Post>
  {
    return this.http.get<Post>(this.baseUrl + id).pipe(
      map((response: Post) =>
      {
        const post = response;
        return post;
      }), catchError((err) =>
      {
        this.toastr.error('Error: ' + err.error);
        return EMPTY;
      })
    );
  }

  getStats(): Observable<Stats>
  {
    return this.http.get<Stats>(this.baseUrl + "stats").pipe(
      map((response: Stats) =>
      {
        const stats = response;
        return stats;
      }), catchError((err) =>
      {
        this.toastr.error('Error: ' + err.error);
        return EMPTY;
      })
    );
  }
}
