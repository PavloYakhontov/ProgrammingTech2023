import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../_models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit
{
  post: Post;
  constructor (private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void
  {
    this.route.paramMap.subscribe(params =>
    {
      const postId = params.get('id');

      if (postId) {
        this.postService.getById(postId).subscribe(post =>
        {
          this.post = post;
        })
      }
    })
  }

}
