import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from '../../_services/spotify.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  id: string;
  artist: Object;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spotifyService: SpotifyService
  ) {
    route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.spotifyService
      .getArtist(this.id)
      .subscribe((res: any) => this.renderArtist(res));
  }

  renderArtist(res: any): void {
    this.artist = res;
  }

  back(): void {
    this.location.back();
  }

}
