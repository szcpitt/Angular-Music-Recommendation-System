import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable()
export class SpotifyService {
  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) { }

  runQuery(url: string, params?: Array<string>): Observable<Object> {

    let queryUrl = `${SpotifyService.BASE_URL}${url}`;

    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    const apiKey = environment.spotifyApiKey;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`
      })
    };

    return this.http.get(queryUrl, httpOptions);
      //.pipe(map((result: any) => result.json()));
  }

  search(query: string, type: string): Observable<Object> {
    return this.runQuery('/search', [`q=${query}`, `type=${type}`]);
  }

  searchTrack(query: string): Observable<Object> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<Object> {
    return this.runQuery(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<Object> {
    return this.runQuery(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<Object> {
    return this.runQuery(`/albums/${id}`);
  }

}