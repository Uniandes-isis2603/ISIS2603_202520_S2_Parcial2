import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';       
import { MovieService } from '../movie.service';      
import { Movie } from '../Movie';     

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit, OnChanges {
  @Input() movie: any;
  safeTrailerUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute,
  private movieService: MovieService) { }

  ngOnInit(): void {
    this.updateTrailerUrl();
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.movieService.getMovieDetail(id).subscribe(movie => {
    this.movie = movie;
  });
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movie']) {
      this.updateTrailerUrl();
    }
  }

  private updateTrailerUrl(): void {
    if (this.movie?.trailer_url) {
      // Convertir URL de YouTube watch a embed si es necesario
      let embedUrl = this.movie.trailer_url;
      if (embedUrl.includes('watch?v=')) {
        embedUrl = embedUrl.replace('watch?v=', 'embed/');
      }
      this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      this.safeTrailerUrl = null;
    }
  }


getAutorMasVisto() {
  if (!this.movie) return null;
  if (!this.movie.actores || this.movie.actores.length === 0) return null;

  return this.movie.actores.reduce((max: { cantidad: string }, actual: { cantidad: string }) => {
    const maxCant = parseInt(max.cantidad, 10);
    const actCant = parseInt(actual.cantidad, 10);
    return actCant > maxCant ? actual : max;
  }, this.movie.actores[0]);
}

}
