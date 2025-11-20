import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service'; 

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  selected: Boolean = false;
  selectedMovie: Movie | null = null;

constructor(private movieService: MovieService) {}

  ngOnInit() {
  this.movieService.getMovies().subscribe(movies => {
    this.movies = movies;
  });
}

  onSelect(movie: Movie) {
    this.selectedMovie = movie;
    this.selected = true;
  }
}
