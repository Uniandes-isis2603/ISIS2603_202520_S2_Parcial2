import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  loading = false;
  error: string | null = null;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
    private readonly router: Router
  ) {}

  private sub: Subscription | null = null;
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadMovie(id);
      } else {
        this.movie = null;
      }
    });
  }

  private loadMovie(id: string): void {
    this.loading = true;
    this.error = null;
    this.movieService.getMovieById(id).subscribe({
      next: (r) => {
        this.movie = r;
        this.loading = false;
      },

      error: (err) => {
        this.error = err?.message ?? 'No se pudo cargar la pelicula';
        this.loading = false;
      }
    });
  }

   ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


   goBack(): void {
    if (globalThis?.history && globalThis.history.length > 1) {
      globalThis.history.back();
    } else {
      this.router.navigate(['/movie']);
    }
  }
}
