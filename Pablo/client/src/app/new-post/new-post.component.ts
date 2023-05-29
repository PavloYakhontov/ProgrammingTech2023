import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { Router } from '@angular/router';
import { Post } from '../_models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit
{
  model: Post = {} as Post;
  id: string;
  constructor (private router: Router, private postService: PostService) { }

  ngOnInit(): void
  {
  }

  CreateNewPost()
  {
    this.model.description = document.getElementById('editor-1').getElementsByTagName('div').item(0).innerHTML;
    this.model.companyDescription = document.getElementById('editor-2').getElementsByTagName('div').item(0).innerHTML;

    this.postService.create(this.model).subscribe({
      next: post =>
      {
        this.id = post._id;
        this.router.navigateByUrl('/post-card/' + this.id);
      }
    });
  }

}
