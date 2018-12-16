import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: './login-module/login.module#LoginModule'},
  { path: 'sea', loadChildren: './search-module/search.module#SearchModule'},
  { path: 'shared',loadChildren: './shared-module/shared.module#SharedModule'},
  { path: 'favourite',loadChildren:'./favourite-module/favourite.module#FavouriteModule'},
  { path: 'movies', loadChildren: './movie-module/movie.module#MovieModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
