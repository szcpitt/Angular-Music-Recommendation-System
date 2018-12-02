import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';

import { AlertComponent } from './_components/alert';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './_components/home';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';
import { SearchComponent } from './_components/search/search.component';
import { ArtistComponent } from './_components/artist/artist.component';
import { TrackComponent } from './_components/track/track.component';
import { AlbumComponent } from './_components/album/album.component';
import { RecommendationComponent } from './_components/recommendation/recommendation.component';

import { SpotifyService } from './_services/spotify.service';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        MatTableModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        SearchComponent,
        ArtistComponent,
        TrackComponent,
        AlbumComponent,
        RecommendationComponent
    ],
    providers: [
        //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: SpotifyService, useClass: SpotifyService },
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }