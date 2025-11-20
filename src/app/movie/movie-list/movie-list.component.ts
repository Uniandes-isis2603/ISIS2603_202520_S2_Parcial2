import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;
  error: string | null = null;

  constructor(private readonly movieService: MovieService, private readonly router: Router) {}

  ngOnInit() {
    this.error = null;
    this.movieService.listMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message ?? 'No se pudo cargar la lista de peliculas';
        this.loading = false;
      }
    });
    
  }

  onSelect(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }
}
