import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from '../../_services/spotify.service';
import { AuthenticationService } from '@/_services';
import { UserService } from '../../_services/user.service';
import { User } from '@/_models';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  id: string;
  track: Object;
  user: User;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.spotifyService
      .getTrack(this.id)
      .subscribe((res: any) => {
        this.renderTrack(res);
      });
  }

  renderTrack(res: any): void {
    this.track = res;
  }

  back(): void {
    this.location.back();
  }

  like(artistName: string) : void {
    console.log(artistName);
    console.log(this.user.id);
    this.userService.postLike(this.user.id,artistName);
  } 
}
