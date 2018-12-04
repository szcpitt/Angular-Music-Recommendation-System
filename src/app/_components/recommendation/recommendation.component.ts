import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//import { SpotifyService } from '../../_services/spotify.service';
import { UserService, AuthenticationService } from '@/_services';
import { User } from '@/_models';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  id: string;
  artist: Object;
  user: User;
  playList: Object;
  displayedColumns: string[] = ['song_name','artist_name','album_name'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    //private spotifyService: SpotifyService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.userService
      .getRecommendationList(this.user.id)
      .subscribe((res: any) => {
        this.playList = res;
      });
  }

  back(): void {
    this.location.back();
  }
}
