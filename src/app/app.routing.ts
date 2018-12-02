import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './_components/search/search.component';
//import { HomeComponent } from './_components/home';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';
import { ArtistComponent } from './_components/artist/artist.component';
import { TrackComponent } from './_components/track/track.component';
import { AlbumComponent } from './_components/album/album.component';
import { RecommendationComponent } from './_components/recommendation/recommendation.component';

import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: SearchComponent },
    { path: 'artists/:id', component: ArtistComponent },
    { path: 'tracks/:id', component: TrackComponent },
    { path: 'albums/:id', component: AlbumComponent },
    { path: 'recommendation', component: RecommendationComponent },
    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);