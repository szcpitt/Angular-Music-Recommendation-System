import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ArtistComponent } from './artist/artist.component';
import { TrackComponent } from './track/track.component';
import { AlbumComponent } from './album/album.component';
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
    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);