import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { Post } from '../_models/post';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  constructor (private postService: PostService)
  {
    this.postService.getPaginated(this.page, this.pageSize).subscribe({
      next: posts =>
      {
        this.posts = posts;
      }
    });

    this.postService.getPaginationInfo(this.page, this.pageSize).subscribe({
      next: total =>
      {
        this.totalItems = total;
      }
    })
  }
  public posts: Post[] = [] as Post[];
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 13;

  ngOnInit(): void
  {

  }

  pageChange($event)
  {
    this.page = $event;


    this.postService.getPaginated(this.page, this.pageSize).subscribe({
      next: posts =>
      {
        this.posts = posts;
      }
    });

    this.postService.getPaginationInfo(this.page, this.pageSize).subscribe({
      next: total =>
      {
        this.totalItems = total;
      }
    })
  }


}
