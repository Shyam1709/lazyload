import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import {SharedModule } from '../shared-module/shared.module';
import { MovieListComponent } from '../shared-module/movies/movie-list/movie-list.component';
import { MovieComponent } from '../shared-module/movies/movie-list/movie/movie.component';

import { Routes, RouterModule } from '@angular/router';

import { FavouriteComponent } from './favourite/favourite.component';

const routes: Routes = [
    { path: 'movies', component: FavouriteComponent }
];

@NgModule({
  declarations: [FavouriteComponent,MovieListComponent,MovieComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})

export class FavouriteModule { }
