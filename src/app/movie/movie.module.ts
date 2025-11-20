import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ActorModule } from '../actor/actor.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MovieListComponent, MovieDetailComponent],
  imports: [CommonModule, ActorModule, RouterModule],
  exports: [MovieListComponent, MovieDetailComponent],
})
export class MovieModule {}
