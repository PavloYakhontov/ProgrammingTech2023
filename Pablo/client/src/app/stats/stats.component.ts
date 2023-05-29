import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { Stats } from '../_models/stats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit
{
  stats: Stats;
  constructor (private postsService: PostService)
  {
    this.postsService.getStats().subscribe(stats =>
    {
      this.stats = stats;
      console.log(stats);

    })
  }

  ngOnInit(): void
  {
  }

}
